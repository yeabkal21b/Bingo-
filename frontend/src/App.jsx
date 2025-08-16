import React, { useState } from 'react';
import TransactionHistory from './components/TransactionHistory';
import BoardActivationCenter from './components/BoardActivationCenter';
import GameRunner from './components/GameRunner';
// We no longer need the Login component or the API for the initial load
import SidebarProfile from './components/SidebarProfile';

export default function App() {
  // --- START OF "DEMO MODE" CONFIGURATION ---
  // We will pretend the user is always logged in.
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // We will create a FAKE user object.
  const [currentUser, setCurrentUser] = useState({
    username: 'testuser', // This is the fake username that will be displayed
    is_agent: true,       // We pretend they are an agent so all buttons appear
  });

  // We will start on the Board Activation page by default.
  const [view, setView] = useState('boards');
  // --- END OF "DEMO MODE" CONFIGURATION ---

  // The logout button will just show an alert in this mode.
  const handleLogout = () => {
    alert("Logout is disabled in Demo Mode.");
  };

  // There is no loading or login check. We go straight to the dashboard.
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 bg-rowAlt p-4 flex flex-col">
        <SidebarProfile username={currentUser?.username} />
        <nav className="flex flex-col gap-4">
          {/* All buttons will now be visible because we faked 'is_agent: true' */}
          <button onClick={() => setView('transactions')} className={`text-left px-2 py-1 rounded ${view === 'transactions' ? 'bg-blue text-white' : 'text-blue'}`}>Transaction History</button>
          <button onClick={() => setView('boards')} className={`text-left px-2 py-1 rounded ${view === 'boards' ? 'bg-blue text-white' : 'text-blue'}`}>Board Activation Center</button>
          <button onClick={() => setView('game')} className={`text-left px-2 py-1 rounded ${view === 'game' ? 'bg-blue text-white' : 'text-blue'}`}>Game Runner</button>
        </nav>
        <div className="mt-auto">
          <button onClick={handleLogout} className="bg-gray-600 text-white font-bold w-full py-2 rounded">
            Logout (Disabled)
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8">
        {/* NOTE: The Transaction History page will appear, but it will show an error 
            because there is no REAL logged-in user to fetch data for. 
            The other pages will work. */}
        {view === 'transactions' && <TransactionHistory />}
        {view === 'boards' && <BoardActivationCenter boards={Array.from({ length: 100 }, (_, i) => ({ id: i + 1 }))} />}
        {view === 'game' && <GameRunner calledNumbers={[7, 12, 34, 56]} />}
      </main>
    </div>
  );
}