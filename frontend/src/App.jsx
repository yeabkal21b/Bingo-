import React, { useState, useEffect } from 'react';
import TransactionHistory from './components/TransactionHistory';
import BoardActivationCenter from './components/BoardActivationCenter';
import GameRunner from './components/GameRunner';
import Login from './components/Login';
import API from './services/api';
import SidebarProfile from './components/SidebarProfile'; // Example: For displaying user info

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [view, setView] = useState('transactions');

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await API.get('/api/user/');
        setIsAuthenticated(true);
        setCurrentUser(response.data); // Store user data
      } catch (error) {
        setIsAuthenticated(false);
        setCurrentUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setCurrentUser(userData);
  };

  const handleLogout = async () => {
    try {
      await API.post('/api/logout/');
      setIsAuthenticated(false);
      setCurrentUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally handle logout error in the UI
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-gold">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 bg-rowAlt p-4 flex flex-col">
        <SidebarProfile username={currentUser?.username} />
        <nav className="flex flex-col gap-4">
          <button onClick={() => setView('transactions')} className={`text-left px-2 py-1 rounded ${view === 'transactions' ? 'bg-blue text-white' : 'text-blue'}`}>Transaction History</button>
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
        {view === 'transactions' && <TransactionHistory />}
        {view === 'boards' && <BoardActivationCenter boards={Array.from({ length: 100 }, (_, i) => ({ id: i + 1 }))} />}
        {view === 'game' && <GameRunner calledNumbers={[7, 12, 34, 56]} />}
      </main>
    </div>
  );
}