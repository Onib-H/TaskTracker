import Card from "../components/Card";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useSidebar } from "../context/sidebarContext";
const Dashboard = () => {
  const { collapsed, setCollapsed } = useSidebar();

  return (
    <div className="flex justify-start ">
      <div>
        <Sidebar />
      </div>
      <div className="w-screen">
        <Header />
        <div className={`w-full px-0 py-7 `}>
          <div className="flex justify-around">
            <Card
              color="bg-green-500"
              icon="fa fa-clipboard-list"
              label="Total Task"
              number="0"
              details="Tasks"
            />
            <Card
              color="bg-blue-500"
              icon="fa fa-check-circle"
              label="Completed Task"
              number="0"
              details="completed"
            />
            <Card
              color="bg-red-500"
              icon="fa fa-spinner"
              label="In-Progress Task"
              number="0"
              details="in-progress"
            />
            <Card
              color="bg-yellow-400"
              icon="fa fa-list"
              label="To-Do List"
              number="0"
              details="todo"
            />
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
