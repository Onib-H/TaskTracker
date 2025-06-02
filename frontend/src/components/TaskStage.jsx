import { useSidebar } from "../context/sidebarContext";

const TaskStage = ({ color, label }) => {
  const { collapsed, setCollapsed } = useSidebar();

  return (
    <div
      className={`bg-white/90 flex justify-between items-center px-4 p-2  w-[500px]`}
    >
      <div className="flex justify-start items-center">
        <div className={` ${color}  rounded-full p-2 mr-2`}></div>
        <h1>{label}</h1>
      </div>
      <div>
        <i className="fa fa-plus cursor-pointer"></i>
      </div>
    </div>
  );
};

export default TaskStage;
