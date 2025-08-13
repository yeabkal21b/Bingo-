import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/',
  withCredentials: true,
});

export const fetchTransactions = () => API.get('/api/transactions/');