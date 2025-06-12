import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import TaskStage from "../components/TaskStage";
import { useSidebar } from "../context/sidebarContext";
import TaskCard from "../components/TaskCard";
import Filter from "../components/Filter";
import { useEffect, useState } from "react";
import TaskListTable from "../components/TaskListTable";

const Task = () => {
  const { collapsed, setCollapsed } = useSidebar();
  const [tasks, setTasks] = useState([]);
  const [sortOption, setSortOption] = useState("oldest");
  const [view, setView] = useState("board");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/get-tasks"); // adjust URL if needed
        const data = await response.json();
        setTasks(data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const sortedTasks = [...tasks].sort((a, b) => {
    switch (sortOption) {
      case "oldest":
        return new Date(a.created_at) - new Date(b.created_at);
      case "newest":
        return new Date(b.created_at) - new Date(a.created_at);
      case "alphabetical-asc":
        return a.title.localeCompare(b.title);
      case "alphabetical-desc":
        return b.title.localeCompare(a.title);
      case "dueDate-asc":
        return new Date(a.due_date) - new Date(b.due_date);
      case "dueDate-desc":
        return new Date(b.due_date) - new Date(a.due_date);
      default:
        return 0;
    }
  });

  return (
    <div className="flex justify-start">
      <div>
        <Sidebar />
      </div>
      <div className="w-screen">
        <Header />
        <div className={`w-full px-5 py-7 `}>
          <div className="flex flex-col mb-5">
            <div className="flex justify-between items-center mb-4">
              <h1
                className={`text-2xl dark:text-white text-gray-900 transition-all duration-300
              `}
              >
                Task
              </h1>
              <div className="flex justify-start gap-8">
                <div className="flex justify-center items-center">
                  <select
                    className="bg-white/90 dark:bg-black/50 dark:text-white pr-5 py-2 pl-4  border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 transition-all duration-300"
                    defaultValue="board"
                    value={view}
                    onChange={(e) => setView(e.target.value)}
                  >
                    <option value="board">
                      <i className="fa fa-table pr-2"></i> Board View
                    </option>
                    <option value="list">
                      <i className="fa fa-list pr-2"></i> List View
                    </option>
                    <option value="calendar">
                      <i className="fa fa-calendar pr-2"></i> Calendar View
                    </option>
                  </select>
                </div>
                <div className="flex justify-center items-center">
                  <select
                    className="bg-white/90 dark:bg-black/50 dark:text-white pr-5 py-2 pl-4 border-gray-300 focus:outline-none focus:ring focus:ring-blue-200 transition-all duration-300"
                    defaultValue="oldest"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="oldest">Sort by: Oldest First</option>
                    <option value="newest">Sort by: Newest First</option>
                    <option value="alphabetical-asc">
                      Sort by: A-Z (Alphabetical)
                    </option>
                    <option value="alphabetical-desc">
                      Sort by: Z-A (Reverse Alphabetical)
                    </option>
                    <option value="dueDate-asc">
                      Sort by: Due Date (Earliest First)
                    </option>
                    <option value="dueDate-desc">
                      Sort by: Due Date (Latest First)
                    </option>
                  </select>
                </div>
                <button className="text-white bg-indigo-600  py-2 px-4 rounded-lg cursor-pointer">
                  <i className="fa fa-plus pr-2"></i>
                  <span className="text-lg ">Create Task</span>
                </button>
              </div>
            </div>

            <Filter />
          </div>
          {view === "board" && <TaskCard tasks={sortedTasks} />}

          {view === "list" && <TaskListTable tasks={sortedTasks} />}
          {view === "calendar" && (
            <div className="flex flex-col justify-center items-center h-[550px] bg-white/80 dark:bg-gray-900 rounded-lg shadow-lg p-10">
              <div className="flex justify-center items-center mb-6">
                <i className="fa-regular fa-calendar-days text-indigo-600 text-8xl"></i>
              </div>
              <h2 className="text-3xl font-semibold dark:text-white text-gray-800 mb-4">
                Calendar View
              </h2>
              <p className="text-lg text-gray-500 dark:text-gray-400 text-center max-w-md">
                The calendar feature is under development. Soon you’ll be able
                to visualize your tasks by due date and easily manage your
                schedule here.
              </p>
              <button className="mt-8 bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-indigo-700 transition">
                Coming Soon
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Task;
