import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // <-- add this

const Header = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true";
  });

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { role } = useAuth(); // <-- get role

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

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        window.location.href = "/";
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header
      className={`dark:bg-gray-900 bg-white sticky top-0 left-0 h-[75px] shadow-xs w-full flex justify-between items-center px-5 transition-all duration-300`}
    >
      <div className="relative">
        <div
          className={`flex items-center justify-center 
      bg-gradient-to-r from-indigo-500 to-indigo-700 
      text-white rounded-full px-5 py-2 
      text-sm font-semibold uppercase 
      shadow-md tracking-wide`}
        >
          {role === "admin" ? "Admin" : "User"}
        </div>
      </div>

      <div className="flex items-center space-x-7 relative">
        <i
          className={`fa fa-${
            darkMode ? "sun" : "moon"
          } dark:text-orange-400 text-black/90 text-2xl cursor-pointer transition-all`}
          onClick={() => setDarkMode(!darkMode)}
        ></i>
        <i className="fa fa-bell text-2xl cursor-pointer transition-all duration-300 dark:text-gray-300 text-gray-600"></i>

        <div className="relative">
          <div
            className="bg-indigo-800 rounded-full w-[50px] h-[50px] flex items-center justify-center text-white font-bold cursor-pointer"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            OB
          </div>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-md z-50">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
