import React, { useState } from 'react';
import axios from 'axios';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('/api/login/', { username, password }, { withCredentials: true });
      onLogin();
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <form onSubmit={handleSubmit} className="bg-rowAlt p-8 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-gold">Agent Login</h2>
        <input type="text" placeholder="Username" value={username}
          onChange={e => setUsername(e.target.value)}
          className="mb-3 p-2 w-full rounded bg-background text-text border border-blue" />
        <input type="password" placeholder="Password" value={password}
          onChange={e => setPassword(e.target.value)}
          className="mb-3 p-2 w-full rounded bg-background text-text border border-blue" />
        <button type="submit" className="bg-gold text-background font-bold w-full py-2 rounded mb-2">Login</button>
        {error && <div className="text-red-500">{error}</div>}
      </form>
    </div>
  );
}