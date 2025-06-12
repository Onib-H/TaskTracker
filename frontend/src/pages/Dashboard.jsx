import { useEffect, useState } from "react";
import Card from "../components/Card";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useSidebar } from "../context/sidebarContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const statusColors = {
  Available: "text-yellow-400",
  Ongoing: "text-red-500",
  "In Review": "text-purple-500",
  Revision: "text-orange-400",
  Completed: "text-blue-500",
  Total: "text-green-500",
};

const statusIcons = {
  Available: "fas fa-list",
  Ongoing: "fas fa-spinner",
  "In Review": "fas fa-eye",
  Revision: "fas fa-edit",
  Completed: "fas fa-check-circle",
  Total: "fas fa-clipboard-list",
};

const Dashboard = () => {
  const { collapsed, setCollapsed } = useSidebar();

  // Store counts for all statuses
  const [taskCounts, setTaskCounts] = useState({});
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
    }
  }, [user, navigate, loading]);

  useEffect(() => {
    const fetchTotalTask = async () => {
      try {
        const res = await fetch("/api/total-tasks");
        const data = await res.json();
        setTaskCounts(data);
      } catch (err) {
        console.error(err);
      }
    };

    if (user) {
      // only fetch tasks if user is authenticated
      fetchTotalTask();
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>; // show loading while checking session
  }

  const taskCountsArray = Object.entries(taskCounts);

  return (
    <div className="flex justify-start">
      <Sidebar />
      <div className="w-full flex-1">
        <Header />
        <div className="w-full mt-5 px-4">
          <div className="flex w-full">
            {taskCountsArray.slice(0, 4).map(([status, count], index) => (
              <div key={status} className="flex-1 relative">
                <Card
                  color={statusColors[status]}
                  icon={statusIcons[status]}
                  label={`${status} Task${status === "Total" ? "s" : ""}`}
                  number={count}
                  details={status.toLowerCase()}
                />
                {index < 3 && (
                  <div className="absolute right-0 top-0 h-full w-px bg-gray-200 dark:bg-gray-700"></div>
                )}
              </div>
            ))}
          </div>

          {/* Horizontal Divider */}
          {taskCountsArray.length > 4 && (
            <div className="w-full h-px bg-gray-200 dark:bg-gray-700"></div>
          )}

          {/* Second Row - 2 columns */}
          {taskCountsArray.length > 4 && (
            <div className="flex w-full">
              {taskCountsArray.slice(4, 6).map(([status, count], index) => (
                <div key={status} className="flex-1 relative">
                  <Card
                    color={statusColors[status]}
                    icon={statusIcons[status]}
                    label={`${status} Task${status === "Total" ? "s" : ""}`}
                    number={count}
                    details={status.toLowerCase()}
                  />
                  {index < 1 && (
                    <div className="absolute right-0 top-0 h-full w-px bg-gray-200 dark:bg-gray-700"></div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
