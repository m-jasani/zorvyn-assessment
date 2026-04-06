# BitBank — Finance Dashboard

A clean, interactive personal finance dashboard built with React, Zustand, and Tailwind CSS.

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone <your-repo-url>

# Install dependencies
npm install

# Start the development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗂 Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Layout.jsx      # App shell with sidebar + navbar
│   ├── Navbar.jsx      # Top navigation bar
│   ├── Sidebar.jsx     # Collapsible navigation sidebar
│   ├── Linechart.js    # Area chart — balance over time
│   ├── Piechart.jsx    # Donut chart — spending by category
│   ├── Summarycards.jsx# Income / Expenses / Balance cards
│   └── ObservationCard.jsx
├── pages/
│   ├── Dashboard.jsx   # Overview page
│   ├── Transactions.jsx# Transaction table with CRUD
│   └── Insights.jsx    # Financial insights & trends
├── store/
│   └── usestore.js     # Zustand global state
└── data/
    └── Mockdata.js     # Static seed transaction data
```

---

## ✨ Features

### Dashboard
- Summary cards showing **Total Balance**, **Monthly Income**, and **Monthly Expenses** — all derived live from the transaction store
- **Balance Trend** area chart — running balance plotted over time
- **Spending Breakdown** donut chart — expenses grouped by category

### Transactions
- Paginated transaction table (5 per page)
- **Filter** by type (Income / Expense)
- **Sort** by date (Recent / Oldest)
- **Search** globally from the navbar — filters across all views simultaneously
- Empty state messaging when no results match
- **Admin** can Add, Edit, and Delete transactions via floating button + modal
- **Viewer** sees read-only data

### Insights
- Balance trend chart derived from real transaction data (not hardcoded)
- Dynamically computed **top spending category** with percentage
- Upcoming payments panel
- Observation cards: Spending alerts, dividend update, subscription audit

### Role-Based UI
Roles are toggled via the Admin / Viewer button in the navbar:
- **Admin**: Full CRUD — can add, edit, delete transactions
- **Viewer**: Read-only mode — action buttons hidden

### Dark / Light Mode
Toggle between dark and light themes from the navbar. Theme preference is persisted in localStorage.

---

## 🛠 Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 |
| State | Zustand with `persist` middleware |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Routing | React Router v6 |
| Icons | Lucide React |

---

## 💾 Data Persistence

Zustand's `persist` middleware is used to save transactions, theme, and role to `localStorage` under the key `bitbank-store`. Data survives page refreshes. To reset, clear localStorage in DevTools.

---

## 📱 Responsiveness

- Sidebar collapses off-screen on mobile and is toggled via a hamburger menu
- Transaction table scrolls horizontally on small screens
- Summary cards and chart grid stack vertically on mobile
- Admin/Viewer toggle hidden on very small screens (role defaults to last set value via persisted store)

---

## 🧩 Design Decisions

- **Zustand over Context**: Simpler boilerplate, built-in devtools support, and the `persist` plugin makes localStorage integration trivial
- **Mock data as initial state**: `mockTransactions` seeds the Zustand store on first load; subsequent loads use persisted state — so adds/deletes survive refresh
- **Global search**: The search query in the navbar filters across the transaction table, line chart, pie chart, and summary cards simultaneously, giving a coherent cross-view filter experience
- **Role simulation on frontend only**: No backend — roles toggle in the navbar and gate UI elements (add/edit/delete buttons). This meets the assignment's RBAC simulation requirement

---

## 🎁 Optional Enhancements Implemented

- ✅ Dark mode with persistence
- ✅ LocalStorage persistence via Zustand persist
- ✅ Smooth animations and hover transitions
- ✅ Empty state handling across all views
- ✅ Mobile-responsive layout with hamburger sidebar
