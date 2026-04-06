/**
 * Mock Transaction Data for Zorvy Finance Dashboard
 * Structure: id, date, category, amount, type, description, status
 */

export const mockTransactions = [
  // --- MARCH INCOME ---
  {
    id: 'TXN-001',
    date: '2026-03-01',
    category: 'Salary',
    amount: 5200.00,
    type: 'income',
    description: 'Monthly Salary - PixelFlow',
    status: 'completed'
  },
  {
    id: 'TXN-002',
    date: '2026-03-15',
    category: 'Freelance',
    amount: 850.00,
    type: 'income',
    description: 'UI Design Project - Client A',
    status: 'completed'
  },
  {
    id: 'TXN-003',
    date: '2026-03-28',
    category: 'Dividends',
    amount: 125.50,
    type: 'income',
    description: 'Stock Market Dividends',
    status: 'completed'
  },
  
  // --- MARCH EXPENSES ---
  {
    id: 'TXN-101',
    date: '2026-03-02',
    category: 'Rent',
    amount: 1200.00,
    type: 'expense',
    description: 'Monthly Office Rent',
    status: 'completed'
  },
  {
    id: 'TXN-102',
    date: '2026-03-05',
    category: 'Food',
    amount: 45.50,
    type: 'expense',
    description: 'Team Lunch - Uber Eats',
    status: 'completed'
  },
  {
    id: 'TXN-103',
    date: '2026-03-08',
    category: 'Utilities',
    amount: 120.00,
    type: 'expense',
    description: 'Electricity Bill',
    status: 'completed'
  },
  {
    id: 'TXN-104',
    date: '2026-03-10',
    category: 'Software',
    amount: 29.00,
    type: 'expense',
    description: 'Vercel Pro Subscription',
    status: 'completed'
  },
  {
    id: 'TXN-105',
    date: '2026-03-12',
    category: 'Shopping',
    amount: 210.99,
    type: 'expense',
    description: 'New Mechanical Keyboard',
    status: 'completed'
  },
  {
    id: 'TXN-106',
    date: '2026-03-18',
    category: 'Food',
    amount: 12.00,
    type: 'expense',
    description: 'Coffee - Starbucks',
    status: 'completed'
  },
  {
    id: 'TXN-107',
    date: '2026-03-20',
    category: 'Transport',
    amount: 35.00,
    type: 'expense',
    description: 'Gas Station',
    status: 'completed'
  },
  {
    id: 'TXN-108',
    date: '2026-03-22',
    category: 'Entertainment',
    amount: 15.99,
    type: 'expense',
    description: 'Netflix Subscription',
    status: 'pending'
  },
  {
    id: 'TXN-109',
    date: '2026-03-25',
    category: 'Health',
    amount: 80.00,
    type: 'expense',
    description: 'Gym Membership',
    status: 'completed'
  }
];

// Professional helper to get unique categories for your filter dropdown
export const categories = ['All', ...new Set(mockTransactions.map(t => t.category))];