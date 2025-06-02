import { useSidebar } from "../context/sidebarContext";
const Card = ({ color, icon, label, number, details }) => {
  const { collapsed, setCollapsed } = useSidebar();
  return (
    <div
      className={`${color} ${
        collapsed ? "w-[380px]" : "w-[360px]"
      } h-[100px] text-white flex justify-between items-center p-5 rounded`}
    >
      <div className="rounded-full bg-white px-5 py-4">
        {icon && (
          <i
            className={`${icon} text-2xl ${color} text-transparent bg-clip-text`}
          ></i>
        )}
      </div>
      <div className="w-1/2">
        <h1 className="text-lg tracking-tight font-bold">{label}</h1>
        <div>
          <h2 className="text-xl inline">{number}</h2>
          <span className="text-sm "> {details}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
