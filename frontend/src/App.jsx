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
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoutes from "./components/ProtectedRoutes";
function App() {
  // const [msg, setMsg] = useState("");

  // useEffect(() => {
  //   fetch("/api/")
  //     .then((res) => res.json())
  //     .then((data) => setMsg(data.message));
  // }, []);

  return (
    <AuthProvider>
      <SidebarProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/otp" element={<Otp />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/task"
            element={
              <ProtectedRoutes>
                <Task />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/completed"
            element={
              <ProtectedRoutes>
                <Completed />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/inprogress"
            element={
              <ProtectedRoutes>
                <InProgress />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/todo"
            element={
              <ProtectedRoutes>
                <ToDo />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/team"
            element={
              <ProtectedRoutes>
                <Team />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/trash"
            element={
              <ProtectedRoutes>
                <Trash />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoutes>
                <Settings />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </SidebarProvider>
    </AuthProvider>
  );
}

export default App;
