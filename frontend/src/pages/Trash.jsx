import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export const Trash = () => {
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
