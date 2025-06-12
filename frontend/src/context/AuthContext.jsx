import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // full user info
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bootstrapped, setBootstrapped] = useState(false);

  const fetchAuth = () => {
    setLoading(true);
    fetch("/api/check-auth", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Not authenticated");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data.user);
        setRole(data.role);
      })
      .catch(() => {
        setUser(null);
        setRole(null);
      })
      .finally(() => {
        setLoading(false);
        setBootstrapped(true);
      });
  };

  useEffect(() => {
    fetchAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, role, loading, fetchAuth, bootstrapped }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
