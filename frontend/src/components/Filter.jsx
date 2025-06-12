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
    <div className="flex flex-col gap-4 p-3  bg-white/90 dark:bg-black/50 dark:text-white sm:flex-row sm:flex-wrap sm:items-center transition-all duration-300">
      <input
        type="text"
        name="title"
        value={filters.title}
        onChange={handleChange}
        placeholder="Search Title...."
        className="border rounded p-2 flex-1 min-w-[150px] placeholder:text-gray-800 dark:placeholder-white"
      />
      <select
        name="priority"
        value={filters.priority}
        onChange={handleChange}
        className="border rounded p-2 flex-1 min-w-[120px] bg-white/90 dark:bg-black/50 dark:text-white"
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
        className="border rounded p-2 flex-1 min-w-[120px] bg-white/90 dark:bg-black/50 dark:text-white"
      >
        <option value="">All Categories</option>
        <option value="Development">Development</option>
        <option value="Design">Design</option>
        <option value="Marketing">Marketing</option>
        <option value="QA">QA</option>
        <option value="Documentation">Documentation</option>
        <option value="Research">Research</option>
        <option value="Project Management">Project Management</option>
        <option value="DevOps">DevOps</option>
        <option value="Customer Support">Customer Support</option>
        <option value="Bugfix">Bugfix</option>
        <option value="Meetings">Meetings</option>
        <option value="Maintenance">Maintenance</option>
        <option value="Performance">Performance</option>
        <option value="Testing">Testing</option>
        <option value="Legal">Legal</option>
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
