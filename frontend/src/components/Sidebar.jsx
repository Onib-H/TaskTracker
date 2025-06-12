import { useLocation, useNavigate } from "react-router-dom";
import sidebarItems from "../constant/sidebarItems";
import { useSidebar } from "../context/sidebarContext";
import { useAuth } from "../context/AuthContext"; // <-- Add this

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { collapsed, setCollapsed } = useSidebar();
  const { role } = useAuth(); // <-- Get role

  const handleToggle = () => setCollapsed(!collapsed);

  // Filter items based on role
  const filteredSidebarItems = sidebarItems.filter(({ path }) => {
    if (path === "/trash" || path === "/team") {
      return role === "admin";
    }
    return true;
  });

  return (
    <aside
      className={`hidden md:flex sticky top-0 left-0 overflow-y-auto  min-h-screen p-5  flex-col justify-between shadow-md transition-all duration-300 dark:bg-gray-800 bg-gray-50
       ${collapsed ? "w-[90px]" : "w-[300px]"}`}
    >
      <div>
        <div
          className={`pb-7 flex items-center ${
            collapsed ? "justify-center" : "justify-between "
          } `}
        >
          <h1
            className={`text-2xl font-bold transition-all duration-300 cursor-pointer dark:text-white text-gray-900
             ${collapsed ? "hidden " : "block"}`}
            onClick={() => navigate("/dashboard")}
          >
            &lt;Task
            <span className={`dark:text-blue-600 text-indigo-800`}>Trackr</span>
            /&gt;
          </h1>
          <i
            className={`dark:text-gray-300 text-gray-600 fa fa-bars text-xl cursor-pointer text-center`}
            onClick={handleToggle}
          ></i>
        </div>
        <nav>
          <ul className="py-5 ">
            {filteredSidebarItems.map(({ label, icon, path }, index) => {
              const isActive = location.pathname === path;

              return (
                <li
                  key={index}
                  onClick={() => navigate(path)}
                  className={`my-3 text-lg cursor-pointer transition-all duration-300 
                 ${
                   collapsed
                     ? "border-r-0 rounded-full px-2 py-3 text-center"
                     : "border-r-4 rounded-r-4xl  rounded-xl p-3 items-center flex space-x-3"
                 }
                  ${
                    isActive
                      ? "bg-indigo-500 text-white border-indigo-800"
                      : "border-transparent hover:bg-indigo-300 hover:text-indigo-800 hover:border-indigo-600"
                  }
                  dark:text-white text-gray-900`}
                >
                  <i className={icon}></i>
                  <span
                    className={`transition-all duration-300 ${
                      collapsed ? "hidden " : "inline"
                    }`}
                  >
                    {label}
                  </span>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div>
        <h1
          className={`flex items-center space-x-3 p-3 text-lg rounded-xl rounded-r-4xl cursor-pointer border-r-4 dark:text-white text-gray-900
            ${
              location.pathname === "/settings"
                ? "bg-indigo-300 text-indigo-900 border-indigo-900"
                : "border-transparent hover:bg-indigo-200 hover:text-indigo-800 hover:border-indigo-800"
            }`}
          onClick={() => navigate("/settings")}
        >
          <i className="fa-solid fa-cog"></i>
          <span
            className={`transition-all duration-300 ${
              collapsed ? "hidden" : "inline"
            }`}
          >
            Settings
          </span>
        </h1>
      </div>
    </aside>
  );
};

export default Sidebar;
