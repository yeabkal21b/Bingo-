import React, { useEffect, useState } from 'react';
// CORRECTED: Import the default API object
import API from '../services/api';

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // CORRECTED: Use the API object to make the GET request
    API.get('/api/transactions/')
      .then(res => {
        setTransactions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch transactions:", err);
        setError("Could not load transaction history.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-background text-text p-8 rounded-md">
      {/* RESTORED: Your original title with Amharic script */}
      <h2 className="text-2xl mb-4 font-bold text-gold">የክሬዲት ታሪክ (Transaction History)</h2>
      
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && !error && (
        <table className="min-w-full table-auto text-sm bg-background">
          <thead>
            <tr>
              {/* RESTORED: Your original table headers with Amharic script */}
              <th className="px-4 py-2">ቀን/ሰዓት<br/>Date & Time</th>
              <th className="px-4 py-2">አይነት<br/>Type</th>
              <th className="px-4 py-2">መጠን<br/>Amount</th>
              <th className="px-4 py-2">ቀሪ ሂሳብ<br/>Balance</th>
              <th className="px-4 py-2">ማብራሪያ<br/>Notes</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, i) => (
              <tr key={i} className={i % 2 === 0 ? '' : 'bg-rowAlt'}>
                <td className="px-2 py-2">{new Date(t.timestamp).toLocaleString()}</td>
                <td className="px-2 py-2">
                  {t.transaction_type === "ADMIN_CREDIT" ? "Admin Credit" : t.transaction_type === "GAME_LAUNCH_COST" ? "Game Launch Cost" : t.transaction_type}
                </td>
                {/* RESTORED: Your original amount and balance formatting */}
                <td className={`px-2 py-2 ${t.amount >= 0 ? 'text-green' : 'text-red-500'}`}>{t.amount >= 0 ? '+' : ''}{t.amount} ብር</td>
                <td className="px-2 py-2">{t.balance_after_transaction} ብር</td>
                <td className="px-2 py-2">{t.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}