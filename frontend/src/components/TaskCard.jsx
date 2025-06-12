import React from "react";

const priorityColors = {
  high: "bg-red-500 text-white",
  medium: "bg-yellow-400 text-black",
  low: "bg-green-500 text-white",
};

const statusColors = {
  Available: "bg-cyan-200 dark:bg-cyan-600 text-black dark:text-white",
  "In Progress": "bg-amber-200 dark:bg-amber-600 text-black dark:text-white",
  "In Review": "bg-orange-200 dark:bg-orange-600 text-black dark:text-white",
  Revision: "bg-red-200 dark:bg-red-600 text-black dark:text-white",
  Completed: "bg-green-200 dark:bg-green-600 text-black dark:text-white",
};

const truncateText = (text, maxLength = 150) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const TaskCard = ({
  priority = "medium",
  title,
  createdAt,
  dueDate,
  description,
  category,
  status,
}) => {
  return (
    <div className="w-full max-w-md h-[350px] bg-white/90 dark:bg-gray-900 dark:text-white rounded-lg shadow-lg p-6 flex flex-col justify-between transition-all duration-300">
      {/* Header: Priority and menu */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-bars text-gray-600 dark:text-gray-300"></i>
          <span
            className={`uppercase text-sm font-semibold px-4 py-1 rounded-full ${
              priorityColors[priority.toLowerCase()] || priorityColors.medium
            }`}
          >
            {priority} priority
          </span>
        </div>
        <i className="fas fa-ellipsis text-gray-600 dark:text-gray-300 cursor-pointer"></i>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold mb-3 truncate">{title}</h2>

      {/* Status and CreatedAt grouped */}
      <div className="flex items-center gap-4 mb-4">
        <span
          className={`uppercase text-sm font-semibold px-3 py-1 rounded-full ${
            statusColors[status] || "bg-gray-300 text-black"
          }`}
        >
          {status}
        </span>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Created on: {createdAt}
        </p>
      </div>

      <p
        className="flex-1 text-gray-700 dark:text-gray-300 mb-6 text-ellipsis  "
        title={description}
      >
        {truncateText(description)}
      </p>

      {/* Footer: Due date and category button */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
          <i className="fa-regular fa-calendar-days"></i>
          <span>{dueDate}</span>
        </div>

        <button className="bg-indigo-600 text-white text-sm px-4 py-2 rounded hover:bg-indigo-700 transition-colors">
          {category}
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
