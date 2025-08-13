import React, { useEffect, useState } from 'react';
import { fetchTransactions } from '../services/api';

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions()
      .then(res => {
        setTransactions(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="bg-background text-text p-8 rounded-md">
      <h2 className="text-2xl mb-4 font-bold text-gold">የክሬዲት ታሪክ (Transaction History)</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full table-auto text-sm bg-background">
          <thead>
            <tr>
              <th className="px-4 py-2">ቀን/ሰዓት<br/>Date & Time</th>
              <th className="px-4 py-2">አይነት<br/>Type</th>
              <th className="px-4 py-2">መጠን<br/>Amount</th>
              <th className="px-4 py-2">የቀረ ቀሪ<br/>Balance</th>
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