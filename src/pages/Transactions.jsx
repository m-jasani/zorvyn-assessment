import React, { useState } from "react";
import { Trash2, Edit3, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { mockTransactions } from "../data/Mockdata";
import useStore from "../store/usestore";

const TransactionTable = () => {
  const {
    userRole,
    searchQuery,
    theme,
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  } = useStore();
  const [typeFilter, setTypeFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const itemsPerPage = 5;

  // Form State
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
    type: "expense",
    date: new Date().toISOString().split("T")[0],
  });

  const handleOpenModal = (txn = null) => {
    if (txn) {
      setEditingTransaction(txn);
      setFormData(txn);
    } else {
      setEditingTransaction(null);
      setFormData({
        description: "",
        amount: "",
        category: "",
        type: "expense",
        date: new Date().toISOString().split("T")[0],
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTransaction) {
      updateTransaction(editingTransaction.id, formData);
    } else {
      addTransaction({
        ...formData,
        id: Date.now(),
        amount: Number(formData.amount),
      });
    }
    setIsModalOpen(false);
  };

  // const filteredData = mockTransactions.filter((txn) => {
  //   const matchesType = typeFilter === 'All' || txn.type.toLowerCase() === typeFilter.toLowerCase();

  //   const term = searchQuery.toLowerCase();
  //   const matchesSearch =
  //     txn.description.toLowerCase().includes(term) ||
  //     txn.category.toLowerCase().includes(term) ||
  //     txn.amount.toString().includes(term);

  //   return matchesType && matchesSearch;
  // });

  const filteredData = transactions.filter((txn) => {
    const matchesType =
      typeFilter === "All" ||
      txn.type.toLowerCase() === typeFilter.toLowerCase();

    const term = searchQuery.toLowerCase();
    const matchesSearch =
      txn.description.toLowerCase().includes(term) ||
      txn.category.toLowerCase().includes(term) ||
      txn.amount.toString().includes(term);

    return matchesType && matchesSearch;
  });
  const sortedData = [...filteredData].sort((a, b) => {
    return sortOrder === "recent"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date);
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleClearFilters = () => {
    setTypeFilter("All");
    setSortOrder("recent");
    setCurrentPage(1);
  };

  return (
    <>
      <div
        className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}
      >
        Transactions Content
      </div>
      <div
        className={`text-sm text-slate-500 mb-6 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}
      >
        Overview of your financial health
      </div>

      <div className="w-full relative">
        {/* Filter & Sort Bar */}
        <div
          className={`flex flex-wrap items-center justify-between mb-6 gap-4 p-4 rounded-2xl border transition-colors duration-300 ${
            theme === "dark"
              ? "bg-slate-900 border-slate-800"
              : "bg-slate-50 border-slate-300"
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Filter By:
            </span>
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className={`rounded-full px-4 py-2 text-sm font-semibold shadow-sm outline-none cursor-pointer transition-colors ${
                theme === "dark"
                  ? "bg-slate-800 text-white"
                  : "bg-white text-slate-900"
              }`}
            >
              <option value="All">All Types</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Sort:
              </span>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className={`rounded-full px-6 py-2 text-sm font-semibold outline-none cursor-pointer transition-colors ${
                  theme === "dark"
                    ? "bg-blue-600 text-white"
                    : "bg-black text-white"
                }`}
              >
                <option value="recent">Recent First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
            <button
              onClick={handleClearFilters}
              className="text-rose-500 text-sm font-bold hover:text-rose-400 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div
          className={`rounded-3xl border shadow-sm overflow-hidden transition-colors duration-300 ${
            theme === "dark"
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-slate-100"
          }`}
        >
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr
                  className={`border-b transition-colors ${
                    theme === "dark"
                      ? "border-slate-800 bg-slate-800/30"
                      : "border-slate-50 bg-slate-50/50"
                  }`}
                >
                  <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Date
                  </th>
                  <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Entity / Category
                  </th>
                  <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
                    Type
                  </th>
                  <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">
                    Amount
                  </th>
                  {userRole === "admin" && (
                    <th className="p-6 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody
                className={`divide-y transition-colors ${
                  theme === "dark" ? "divide-slate-800" : "divide-slate-50"
                }`}
              >
                {currentItems.map((txn) => (
                  <tr
                    key={txn.id}
                    className={`transition-colors group ${
                      theme === "dark"
                        ? "hover:bg-slate-800/50"
                        : "hover:bg-slate-50/50"
                    }`}
                  >
                    <td
                      className={`p-6 text-sm font-bold whitespace-nowrap ${
                        theme === "dark" ? "text-slate-300" : "text-slate-900"
                      }`}
                    >
                      {txn.date}
                    </td>
                    <td className="p-6">
                      <p
                        className={`text-sm font-bold whitespace-nowrap ${
                          theme === "dark" ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {txn.description}
                      </p>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded mt-1 inline-block ${
                          theme === "dark"
                            ? "bg-slate-800 text-slate-400"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {txn.category}
                      </span>
                    </td>
                    <td
                      className={`p-6 text-center font-bold text-[10px] uppercase tracking-wider ${
                        txn.type === "income"
                          ? theme === "dark"
                            ? "text-emerald-400"
                            : "text-amber-600"
                          : "text-rose-500"
                      }`}
                    >
                      {txn.type}
                    </td>
                    <td
                      className={`p-6 text-right font-bold text-lg whitespace-nowrap ${
                        theme === "dark" ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {txn.type === "income" ? "+" : "-"}$
                      {txn.amount.toLocaleString()}
                    </td>

                    {userRole === "admin" && (
                      <td className="p-6 text-right">
                        <div className="flex justify-end gap-2 transition-opacity duration-200">
                          <button
                            onClick={() => handleOpenModal(txn)}
                            className={`p-2 rounded-lg border border-transparent transition-all ${
                              theme === "dark"
                                ? "text-slate-400 hover:text-white hover:bg-slate-800 hover:border-slate-700"
                                : "text-slate-400 hover:text-slate-900 hover:bg-white hover:border-slate-100 shadow-none hover:shadow-sm"
                            }`}
                          >
                            <Edit3 size={18} />
                          </button>
                          <button
                            onClick={() => deleteTransaction(txn.id)}
                            className={`p-2 rounded-lg border border-transparent transition-all ${
                              theme === "dark"
                                ? "text-slate-400 hover:text-rose-400 hover:bg-slate-800 hover:border-slate-700"
                                : "text-slate-400 hover:text-rose-500 hover:bg-white hover:border-slate-100 shadow-none hover:shadow-sm"
                            }`}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div
            className={`p-6 flex flex-col sm:flex-row justify-between items-center border-t gap-4 transition-colors ${
              theme === "dark"
                ? "bg-slate-900/50 border-slate-800"
                : "bg-slate-50/50 border-slate-100"
            }`}
          >
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center sm:text-left">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, sortedData.length)} of{" "}
              {sortedData.length} entries
            </span>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className={`p-2 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-colors ${
                  theme === "dark"
                    ? "hover:bg-slate-800 text-white"
                    : "hover:bg-slate-200 text-slate-600"
                }`}
              >
                <ChevronLeft size={18} />
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${
                    currentPage === i + 1
                      ? theme === "dark"
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-black text-white shadow-md"
                      : theme === "dark"
                        ? "bg-slate-800 text-slate-400 hover:text-white"
                        : "bg-white text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className={`p-2 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-colors ${
                  theme === "dark"
                    ? "hover:bg-slate-800 text-white"
                    : "hover:bg-slate-200 text-slate-600"
                }`}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Floating Add Button */}
        {userRole === "admin" && (
          <button
            onClick={() => handleOpenModal()}
            className="fixed bottom-8 right-8 w-14 h-14 bg-rose-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-rose-700 hover:scale-110 transition-all duration-300 z-50 active:scale-95"
            title="Add Transaction"
          >
            <Plus size={28} />
          </button>
        )}

        {/* Modal for Add/Edit */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div
              className={`w-full max-w-md rounded-3xl p-8 ${theme === "dark" ? "bg-slate-900 border border-slate-800" : "bg-white shadow-2xl"}`}
            >
              <div className="flex justify-between items-center mb-6">
                <h3
                  className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}
                >
                  {editingTransaction ? "Edit Transaction" : "Add Transaction"}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-rose-500"
                >
                  X
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Description"
                  required
                  className={`w-full p-3 rounded-xl border ${theme === "dark" ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-50 border-slate-100"}`}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Amount"
                  required
                  className={`w-full p-3 rounded-xl border ${theme === "dark" ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-50 border-slate-100"}`}
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                />
                <select
                  className={`w-full p-3 rounded-xl border ${theme === "dark" ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-50 border-slate-100"}`}
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
                <input
                  type="text"
                  placeholder="Category (e.g. Housing, Food)"
                  required
                  className={`w-full p-3 rounded-xl border ${theme === "dark" ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-50 border-slate-100"}`}
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                />
                <button
                  type="submit"
                  className="w-full py-4 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 transition-colors"
                >
                  {editingTransaction ? "Save Changes" : "Confirm Transaction"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TransactionTable;
