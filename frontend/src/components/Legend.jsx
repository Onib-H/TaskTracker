// Legend.jsx
import React from "react";

/**
 * Legend Component for Calendar Statuses.
 * This component displays a visual key for different statuses,
 * mapping a status name to a corresponding color.
 *
 * @param {Object} props - The component props.
 * @param {Array<Object>} [props.statuses] - An array of status objects.
 * Each object should have a 'name' (string) and a 'colorClass' (string, e.g., 'bg-blue-100').
 * If not provided, a default set of statuses will be used.
 */
const Legend = ({ statuses }) => {
  const defaultStatuses = [
    {
      name: "Available/Not Started",
      colorClass: "bg-cyan-200 dark:bg-cyan-600",
    },
    { name: "In Progress", colorClass: "bg-amber-200 dark:bg-amber-600" },
    { name: "In Review", colorClass: "bg-orange-200 dark:bg-orange-600" },
    { name: "Revision", colorClass: "bg-red-200 dark:bg-red-600" },
    { name: "Completed", colorClass: "bg-green-200 dark:bg-green-600" },
  ];

  const legendItems = statuses || defaultStatuses;

  return (
    <div className="p-4 bg-white dark:bg-black/50 dark:text-white rounded-lg shadow-lg w-full mx-auto my-6 font-inter transition-all duration-300">
      <h3 className="text-4xl text-center font-semibold text-gray-800 dark:text-white transition-all duration-300 mb-10">
        Legend
      </h3>
      <div className="flex justify-evenly">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`w-5 h-5 rounded-sm mr-3 flex-shrink-0 ${item.colorClass} transition-all duration-300`}
            ></div>
            <span className="text-base md:text-lg text-gray-700 dark:text-white">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Legend;
