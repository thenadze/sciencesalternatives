
import React, { createContext, useContext, useState } from 'react';

type MaintenanceContextType = {
  isInMaintenance: boolean;
  setIsInMaintenance: (value: boolean) => void;
  maintenanceMessage: string;
  setMaintenanceMessage: (message: string) => void;
};

const MaintenanceContext = createContext<MaintenanceContextType | undefined>(undefined);

export function MaintenanceProvider({ children }: { children: React.ReactNode }) {
  const [isInMaintenance, setIsInMaintenance] = useState(false);
  const [maintenanceMessage, setMaintenanceMessage] = useState(
    "Site en maintenance. Nous serons bientôt de retour !"
  );

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
