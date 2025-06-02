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
    { name: "Available/Not Started", colorClass: "bg-cyan-100" },
    { name: "In Progress", colorClass: "bg-amber-100" },
    { name: "In Review", colorClass: "bg-orange-100" },
    { name: "Revision", colorClass: "bg-red-100" },
    { name: "Completed", colorClass: "bg-green-100" },
  ];

  const legendItems = statuses || defaultStatuses;

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg w-full mx-auto my-6 font-inter">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-left">
        Legend
      </h3>
      <div className="flex justify-start">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`w-5 h-5 rounded-sm mr-3 flex-shrink-0 ${item.colorClass}`}
            ></div>
            <span className="text-base md:text-lg text-gray-700">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Legend;
