import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setRole(null);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAuth();
  }, []);

  const logout = () => {
    fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    }).finally(() => {
      setUser(null);
      setRole(null);
    });
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, fetchAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
