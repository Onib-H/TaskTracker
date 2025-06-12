// Legend.jsx
import React from "react";

const Legend = ({ statuses }) => {
  const defaultStatuses = [
    {
      name: "Available",
      colorClass: "bg-cyan-200 dark:bg-cyan-600",
    },
    { name: "Ongoing", colorClass: "bg-amber-200 dark:bg-amber-600" },
    { name: "In Review", colorClass: "bg-orange-200 dark:bg-orange-600" },
    { name: "Revision", colorClass: "bg-red-200 dark:bg-red-600" },
    { name: "Completed", colorClass: "bg-green-200 dark:bg-green-600" },
  ];

  const legendItems = statuses || defaultStatuses;

  return (
    <div className="p-4 bg-white dark:bg-black/50 dark:text-white rounded-lg shadow-lg w-full mx-auto my-6 font-inter transition-all duration-300">
      <div className="flex items-center gap-12">
        {/* Legend title on the left */}
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white flex-shrink-0">
          Legend
        </h3>

        {/* Legend items spaced out to the right */}
        <div className="flex gap-10 flex-wrap">
          {legendItems.map((item, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-5 h-5 rounded-sm mr-2 flex-shrink-0 ${item.colorClass} transition-all duration-300`}
              ></div>
              <span className="text-base md:text-lg text-gray-700 dark:text-white whitespace-nowrap">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Legend;
