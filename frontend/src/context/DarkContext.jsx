import { createContext, useState, useContext, useEffect } from "react";

const DarkContext = createContext();

export function DarkProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode === "true" ? true : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <DarkContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkContext.Provider>
  );
}

export function useDarkMode() {
  return useContext(DarkContext);
}
