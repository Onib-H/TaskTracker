import { useSidebar } from "../context/sidebarContext";

const Card = ({ color, icon, label, number, details }) => {
  const { collapsed } = useSidebar();

  return (
    <div className="w-full h-40 bg-gray-50 dark:bg-gray-900 text-black dark:text-white flex flex-col justify-center items-center p-6">
      <div className="rounded-full bg-gray-50 dark:bg-gray-800 p-3 mb-4">
        <i className={`${icon} text-2xl ${color}`}></i>
      </div>
      <h2 className={`text-2xl font-bold mb-2 ${color}`}>{number}</h2>
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide text-center">
        {label}
      </h3>
    </div>
  );
};

export default Card;
