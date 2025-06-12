import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoutes({ children }) {
  const { authenticated } = useAuth();
  const navigate = useNavigate();
  if (authenticated === null) return null;
  return authenticated ? children : navigate("/");
}
