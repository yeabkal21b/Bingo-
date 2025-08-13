import React, { useState } from 'react';
import TransactionHistory from './components/TransactionHistory';
import BoardActivationCenter from './components/BoardActivationCenter';
import GameRunner from './components/GameRunner';

export default function App() {
  const [view, setView] = useState('transactions');

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 bg-rowAlt p-4 flex flex-col">
        <div className="text-xl text-gold font-bold mb-6">Yaba bigo<br/><span className="text-sm">ያባ ቢጎ</span></div>
        <nav className="flex flex-col gap-4">
          <button onClick={() => setView('transactions')} className={`text-left px-2 py-1 rounded ${view === 'transactions' ? 'bg-blue text-white' : 'text-blue'}`}>Transaction History</button>
          <button onClick={() => setView('boards')} className={`text-left px-2 py-1 rounded ${view === 'boards' ? 'bg-blue text-white' : 'text-blue'}`}>Board Activation Center</button>
          <button onClick={() => setView('game')} className={`text-left px-2 py-1 rounded ${view === 'game' ? 'bg-blue text-white' : 'text-blue'}`}>Game Runner</button>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {view === 'transactions' && <TransactionHistory />}
        {view === 'boards' && <BoardActivationCenter boards={Array.from({length: 100}, (_,i)=>({id: i+1}))} />}
        {view === 'game' && <GameRunner calledNumbers={[7, 12, 34, 56]} />}
      </main>
    </div>
  );
}