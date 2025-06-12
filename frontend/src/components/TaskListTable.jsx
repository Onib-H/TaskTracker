import React from "react";

const priorityColors = {
  high: "bg-red-400 dark:bg-red-500 text-white",
  medium: "bg-yellow-200 dark:bg-yellow-400 text-black",
  low: "bg-green-400 dark:bg-green-500 text-white",
};

const statusColors = {
  Available: "bg-cyan-200 dark:bg-cyan-600 text-black dark:text-white",
  "In Progress": "bg-amber-200 dark:bg-amber-600 text-black dark:text-white",
  "In Review": "bg-orange-200 dark:bg-orange-600 text-black dark:text-white",
  Revision: "bg-red-200 dark:bg-red-600 text-black dark:text-white",
  Completed: "bg-green-200 dark:bg-green-600 text-black dark:text-white",
};

const truncateText = (text, maxLength = 80) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const TaskListTable = ({ tasks }) => {
  return (
    <div className="overflow-x-auto shadow rounded-lg">
      <table className="min-w-full bg-white dark:bg-gray-900">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-left">
            <th className="p-4">Title</th>
            <th className="p-4">Description</th>
            <th className="p-4">Priority</th>
            <th className="p-4">Status</th>
            <th className="p-4">Created At</th>
            <th className="p-4">Due Date</th>
            <th className="p-4">Category</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr
              key={task.id}
              className="border-b border-gray-200 dark:border-gray-700"
            >
              <td className="p-4 font-semibold dark:text-white">
                {task.title}
              </td>
              <td className="p-4 text-gray-600 dark:text-gray-400">
                {truncateText(task.description)}
              </td>
              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    priorityColors[task.priority?.toLowerCase()] ||
                    priorityColors.medium
                  }`}
                >
                  {task.priority}
                </span>
              </td>
              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    statusColors[task.status] || "bg-gray-300 text-black"
                  }`}
                >
                  {task.status}
                </span>
              </td>
              <td className="p-4 text-sm text-gray-500 dark:text-gray-400">
                {task.created_at}
              </td>
              <td className="p-4 text-sm text-gray-500 dark:text-gray-400">
                {task.due_date}
              </td>
              <td className="p-4">
                <button className="bg-indigo-600 text-white text-sm px-4 py-1 rounded hover:bg-indigo-700 transition-colors">
                  {task.category}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskListTable;
