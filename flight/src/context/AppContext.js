import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [appData, setAppData] = useState({
    selectedCity: null,
  });

  useEffect(() => {
    const storedData = localStorage.getItem("appData");
    if (storedData) {
      setAppData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("appData", JSON.stringify(appData));
  }, [appData]);

  const setContextData = (data) => {
    setAppData((prevData) => ({ ...prevData, ...data }));
  };

  return (
    <AppContext.Provider value={{ appData, setContextData }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
