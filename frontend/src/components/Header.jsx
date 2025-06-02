import { useState, useEffect } from "react";
const Header = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true" ? true : false;
  });

  useEffect(() => {
    document.documentElement.classList.add("disable-transition");
    requestAnimationFrame(() => {
      document.documentElement.classList.remove("disable-transition");
    });
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  return (
    <header
      className={`dark:bg-gray-900  bg-white sticky top-0 left-0 h-[75px] shadow-xs w-full flex justify-between items-center px-5 transition-all duration-300`}
    >
      <div className="relative">
        <i
          className={`dark:text-gray-300  fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 transition-all duration-300`}
        ></i>
        <input
          type="text"
          placeholder="Search..."
          className={`dark:bg-gray-700 dark:text-white bg-gray-200 rounded-full py-2 pl-10 pr-4 w-[400px] focus:outline-none transition-all duration-300`}
        />
      </div>
      <div className="flex items-center space-x-7">
        <i
          className={`fa fa-${
            darkMode ? "sun" : "moon"
          } dark:text-orange-400  text-black/90 text-2xl cursor-pointer transition-all `}
          onClick={() => setDarkMode(!darkMode)}
        ></i>
        <i
          className={`fa fa-bell text-2xl  cursor-pointer transition-all duration-300 dark:text-gray-300 text-gray-600`}
        ></i>
        <div className="bg-indigo-800 rounded-full w-[50px] h-[50px] flex items-center justify-center text-white font-bold cursor-pointer">
          OB
        </div>
      </div>
    </header>
  );
};

export default Header;
