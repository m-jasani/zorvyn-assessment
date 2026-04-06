import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Insights from './pages/Insights';

// Placeholder components for your pages
// const Dashboard = () => <div className="text-2xl font-bold">Dashboard Content</div>;
// const Transactions = () => <div className="text-2xl font-bold">Transactions Content</div>;
// const Insights = () => <div className="text-2xl font-bold">Insights Content</div>;
const Settings = () => <div className="text-2xl font-bold">Settings Content</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Layout Wrapper */}
        <Route path="/" element={<Layout />}>
          
          {/* Default page (redirect to dashboard) */}
          <Route index element={<Navigate to="/dashboard" replace />} />
          
          {/* Dashboard Pages */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="insights" element={<Insights />} />
          <Route path="settings" element={<Settings />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;