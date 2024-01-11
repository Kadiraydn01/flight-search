import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [appData, setAppData] = useState({
    selectedCity: null,
  });

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
