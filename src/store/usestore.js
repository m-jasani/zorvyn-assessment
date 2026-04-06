import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockTransactions } from '../data/Mockdata';

const useStore = create(
  persist(
    (set) => ({
      userRole: 'admin',
      searchQuery: '',
      theme: 'dark',
      transactions: mockTransactions || [],

      setUserRole: (role) => set({ userRole: role }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),

      addTransaction: (newTxn) =>
        set((state) => ({
          transactions: [newTxn, ...state.transactions],
        })),

      updateTransaction: (id, updatedTxn) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updatedTxn } : t
          ),
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),
    }),
    {
      name: 'bitbank-store', // localStorage key
      partialise: (state) => ({
        // Only persist transactions and theme — not transient UI state
        transactions: state.transactions,
        theme: state.theme,
        userRole: state.userRole,
      }),
    }
  )
);

export default useStore;
