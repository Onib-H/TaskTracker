import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const InProgress = () => {
  return (
    <div className="flex justify-start">
      <div>
        <Sidebar />
      </div>
      <div className="w-screen">
        <Header />
      </div>
    </div>
  );
};

export default InProgress;
