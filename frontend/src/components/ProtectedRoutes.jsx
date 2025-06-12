import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ children, allowedRoles }) {
  const { role } = useAuth();

  if (role === null) {
    return <div>Loading...</div>;
  }

  if (!role) {
    return <Navigate to="/" />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}
