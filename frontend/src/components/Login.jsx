import React, { useState } from 'react';
import API from '../services/api'; // Use your existing API instance

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the page from reloading
    setError('');

    // Do not let the user in if fields are blank
    if (!username || !password) {
      setError('Please enter a username and password.');
      return;
    }

    try {
      // This is the critical part: try to log in with the backend
      const response = await API.post('/api/login/', { username, password });
      
      // ONLY if the backend says the password is correct, call onLogin
      onLogin(response.data);
    } catch (err) {
      // If the backend returns an error (wrong password), show an error
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <form onSubmit={handleSubmit} className="bg-rowAlt p-8 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-gold">Agent Login</h2>
        <input 
          type="text" 
          placeholder="Username" 
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="mb-3 p-2 w-full rounded bg-background text-text border border-blue" 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="mb-3 p-2 w-full rounded bg-background text-text border border-blue" 
          required 
        />
        <button type="submit" className="bg-gold text-background font-bold w-full py-2 rounded mb-2">Login</button>
        {error && <div className="text-red-500 text-center">{error}</div>}
      </form>
    </div>
  );
}