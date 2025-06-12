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
import NotFound from "./pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <SidebarProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/otp" element={<Otp />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes allowedRoles={["user", "admin"]}>
                <Dashboard />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/task"
            element={
              <ProtectedRoutes allowedRoles={["user", "admin"]}>
                <Task />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/completed"
            element={
              <ProtectedRoutes allowedRoles={["user", "admin"]}>
                <Completed />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/inprogress"
            element={
              <ProtectedRoutes allowedRoles={["user", "admin"]}>
                <InProgress />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/todo"
            element={
              <ProtectedRoutes allowedRoles={["user", "admin"]}>
                <ToDo />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/team"
            element={
              <ProtectedRoutes allowedRoles={["admin"]}>
                <Team />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/trash"
            element={
              <ProtectedRoutes allowedRoles={["admin"]}>
                <Trash />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoutes allowedRoles={["user", "admin"]}>
                <Settings />
              </ProtectedRoutes>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SidebarProvider>
    </AuthProvider>
  );
}

export default App;
