import React from "react";

const TaskCard = ({
  priority,
  title,
  createdAt,
  dueDate,
  description,
  category,
  subTask,
}) => {
  return (
    <div className="w-full h-[300px] bg-white/90 px-5 py-3 dark:bg-black/50 dark:text-white transition-all duration-300">
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center">
          {/* fa-solid fa-bars */}
          {/* fa-solid fa-equals */}
          {/* fa-solid fa-minus */}
          {/*  */}
          <i class="fa-solid fa-bars pr-2"></i>
          <h1 className="uppercase">{priority} priority</h1>
        </div>
        <i className="fas fa-ellipsis"></i>
      </div>
      <div>
        <h1>{title}</h1>
      </div>
      <div>
        <h1>{createdAt}</h1>
      </div>
      <div>
        <div>
          <i></i>
          <i></i>
          <i></i>
        </div>
        <div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div>
        <h1>{description}</h1>
      </div>
      <div>
        {dueDate} <button>{category}</button>
      </div>
      <div>
        <button>
          <i></i>
          <span>{subTask}</span>
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
