import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const ToDo = () => {
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

export default ToDo;
