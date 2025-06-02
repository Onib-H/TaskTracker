// Filter.js
import React, { useState } from "react";

const Filter = () => {
  const [filters, setFilters] = useState({
    priority: "",
    title: "",
    date: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    console.log("Searching with filters:", filters);
  };

  return (
    <div className="flex flex-col gap-4 p-3 bg-white/90 sm:flex-row sm:flex-wrap sm:items-center">
      <input
        type="text"
        name="title"
        value={filters.title}
        onChange={handleChange}
        placeholder="Search Title"
        className="border rounded p-2 flex-1 min-w-[150px]"
      />
      <select
        name="priority"
        value={filters.priority}
        onChange={handleChange}
        className="border rounded p-2 flex-1 min-w-[120px]"
      >
        <option value="">All Priorities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <input
        type="date"
        name="date"
        value={filters.date}
        onChange={handleChange}
        className="border rounded p-2 flex-1 min-w-[150px]"
      />

      <select
        name="category"
        value={filters.category}
        onChange={handleChange}
        className="border rounded p-2 flex-1 min-w-[120px]"
      >
        <option value="">All Categories</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Other">Other</option>
      </select>

      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition-colors"
      >
        Search
      </button>
    </div>
  );
};

export default Filter;
