
import React, { createContext, useContext, useState, useEffect } from 'react';

type MaintenanceContextType = {
  isInMaintenance: boolean;
  setIsInMaintenance: (value: boolean) => void;
  maintenanceMessage: string;
  setMaintenanceMessage: (message: string) => void;
};

const MaintenanceContext = createContext<MaintenanceContextType | undefined>(undefined);

export function MaintenanceProvider({ children }: { children: React.ReactNode }) {
  // Set maintenance mode to false by default
  const [isInMaintenance, setIsInMaintenance] = useState(false);
  const [maintenanceMessage, setMaintenanceMessage] = useState('');

  // Remove localStorage checks since we're disabling maintenance mode
  return (
    <MaintenanceContext.Provider
      value={{
        isInMaintenance,
        setIsInMaintenance,
        maintenanceMessage,
        setMaintenanceMessage,
      }}
    >
      {children}
    </MaintenanceContext.Provider>
  );
}

export function useMaintenanceMode() {
  const context = useContext(MaintenanceContext);
  if (context === undefined) {
    throw new Error("useMaintenanceMode doit être utilisé dans un MaintenanceProvider");
  }
  return context;
}
