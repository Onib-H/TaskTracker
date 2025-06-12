import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    fetch("/api/check-auth", {
      method: "GET",
      credentials: "include",
    }).then((res) => {
      if (res.ok) setAuthenticated(true);
      else setAuthenticated(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
