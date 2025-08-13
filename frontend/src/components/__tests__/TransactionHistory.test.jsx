import React from 'react';
import { render, screen } from '@testing-library/react';
import TransactionHistory from '../TransactionHistory';

test('renders transaction history table headers', () => {
  render(<TransactionHistory />);
  expect(screen.getByText(/Transaction History/i)).toBeInTheDocument();
  expect(screen.getByText(/Amount/i)).toBeInTheDocument();
});