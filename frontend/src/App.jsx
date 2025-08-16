import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import BoardActivationCenter from './components/BoardActivationCenter';
import GameRunner from './components/GameRunner';
import TransactionHistory from './components/TransactionHistory';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-[#1E1E1E] text-white font-sans">
        {/* Sidebar Navigation */}
        <nav className="w-64 bg-gray-900 p-4 flex flex-col flex-shrink-0">
          <div className="mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-2xl">
                T
              </div>
              <div>
                <p className="font-semibold">testuser</p>
                <p className="text-sm text-gray-400">ያባ ቢንጎ</p> {/* Yaba Bingo in Amharic */}
              </div>
            </div>
          </div>
          <ul className="flex flex-col space-y-2">
            <li>
              <NavLink to="/transactions" className={({ isActive }) => `block px-4 py-2 rounded-md ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
                የግብይት ታሪክ {/* Transaction History */}
              </NavLink>
            </li>
            <li>
              <NavLink to="/activate" className={({ isActive }) => `block px-4 py-2 rounded-md ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
                የቦርድ ማግበርያ ማዕከል {/* Board Activation Center */}
              </NavLink>
            </li>
            <li>
              <NavLink to="/game" className={({ isActive }) => `block px-4 py-2 rounded-md ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`}>
                የጨዋታ አስሮጥ {/* Game Runner */}
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/transactions" replace />} />
            <Route path="/transactions" element={<TransactionHistory />} />
            <Route path="/activate" element={<BoardActivationCenter />} />
            <Route path="/game" element={<GameRunner />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;