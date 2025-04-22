
import React, { createContext, useContext, useState, useEffect } from 'react';

type MaintenanceContextType = {
  isInMaintenance: boolean;
  setIsInMaintenance: (value: boolean) => void;
  maintenanceMessage: string;
  setMaintenanceMessage: (message: string) => void;
};

const MaintenanceContext = createContext<MaintenanceContextType | undefined>(undefined);

export function MaintenanceProvider({ children }: { children: React.ReactNode }) {
  // Laisser le mode maintenance désactivé par défaut
  const [isInMaintenance, setIsInMaintenance] = useState(false);
  const [maintenanceMessage, setMaintenanceMessage] = useState(
    "Site en cours de configuration. Notre site sera bientôt disponible. Merci de votre patience !"
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
