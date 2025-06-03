import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Task from "./pages/Task";
import Completed from "./pages/Completed";
import InProgress from "./pages/InProgress";
import ToDo from "./pages/ToDo";
import Team from "./pages/Team";
import { Trash } from "./pages/Trash";
import Settings from "./pages/Settings";
import { SidebarProvider } from "./context/sidebarContext";
import Otp from "./pages/Otp";
function App() {
  // const [msg, setMsg] = useState("");

  // useEffect(() => {
  //   fetch("/api/")
  //     .then((res) => res.json())
  //     .then((data) => setMsg(data.message));
  // }, []);

  return (
    <SidebarProvider>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/task" element={<Task />} />
          <Route path="/completed" element={<Completed />} />
          <Route path="/inprogress" element={<InProgress />} />
          <Route path="/todo" element={<ToDo />} />
          <Route path="/team" element={<Team />} />
          <Route path="/trash" element={<Trash />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </SidebarProvider>
  );
}

export default App;
