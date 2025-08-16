import React, { useState, useEffect } from 'react';
import TransactionHistory from './components/TransactionHistory';
import BoardActivationCenter from './components/BoardActivationCenter';
import GameRunner from './components/GameRunner';
import API from './services/api';
import SidebarProfile from './components/SidebarProfile';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [view, setView] = useState('game');

  // This hook will now run once and automatically log the user in.
  useEffect(() => {
    const autoLogin = async () => {
      try {
        // Call the new, insecure auto-login endpoint
        const response = await API.post('/api/auto-login-debug/');
        setIsAuthenticated(true);
        setCurrentUser(response.data);
        if (response.data.is_agent) {
          setView('transactions');
        }
      } catch (error) {
        // This will happen if the backend can't find the 'testuser'
        console.error("Auto-login failed:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    autoLogin();
  }, []); // The empty array ensures this runs only once.

  const handleLogout = async () => {
    try {
      await API.post('/api/logout/');
    } finally {
      setIsAuthenticated(false);
      setCurrentUser(null);
      // Optional: reload the page to trigger auto-login again
      window.location.reload();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-gold">
        Loading...
      </div>
    );
  }

  // If auto-login failed for some reason
  if (!isAuthenticated) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background text-red-500">
            Could not automatically log in. Please ensure the user 'testuser' exists and is an agent.
        </div>
    );
  }

  // The main application dashboard
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 bg-rowAlt p-4 flex flex-col">
        <SidebarProfile username={currentUser?.username} />
        <nav className="flex flex-col gap-4">
          {currentUser?.is_agent && (
            <button onClick={() => setView('transactions')} className={`text-left px-2 py-1 rounded ${view === 'transactions' ? 'bg-blue text-white' : 'text-blue'}`}>Transaction History</button>
          )}
          <button onClick={() => setView('boards')} className={`text-left px-2 py-1 rounded ${view === 'boards' ? 'bg-blue text-white' : 'text-blue'}`}>Board Activation Center</button>
          <button onClick={() => setView('game')} className={`text-left px-2 py-1 rounded ${view === 'game' ? 'bg-blue text-white' : 'text-blue'}`}>Game Runner</button>
        </nav>
        <div className="mt-auto">
          <button onClick={handleLogout} className="bg-red-600 text-white font-bold w-full py-2 rounded hover:bg-red-700">
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8">
        {view === 'transactions' && currentUser?.is_agent && <TransactionHistory />}
        {view === 'boards' && <BoardActivationCenter boards={Array.from({ length: 100 }, (_, i) => ({ id: i + 1 }))} />}
        {view === 'game' && <GameRunner calledNumbers={[7, 12, 34, 56]} />}
      </main>
    </div>
  );
}