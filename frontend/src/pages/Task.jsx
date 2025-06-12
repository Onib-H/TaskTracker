import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import TaskStage from "../components/TaskStage";
import { useSidebar } from "../context/sidebarContext";
import TaskCard from "../components/TaskCard";
import Filter from "../components/Filter";
import Legend from "../components/Legend";
import { useEffect, useState } from "react";

const Task = () => {
  const { collapsed, setCollapsed } = useSidebar();
  const [tasks, setTasks] = useState([]);

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
                    defaultValue="newest"
                  >
                    <option value="newest">Sort by: Newest First</option>
                    <option value="oldest">Sort by: Oldest First</option>
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
          <Legend />
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                priority={task.priority}
                category={task.category}
                createdAt={task.created_at}
                dueDate={task.due_date}
                description={task.description}
                title={task.title}
                status={task.status}
              />
            ))}
          </div>
        </div>
        {/* Board View */}
        <div></div>
        {/* List View */}
        <div></div>
      </div>
    </div>
  );
};

export default Task;
