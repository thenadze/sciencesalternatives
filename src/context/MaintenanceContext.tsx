
import React, { createContext, useContext, useState, useEffect } from 'react';

type MaintenanceContextType = {
  isInMaintenance: boolean;
  setIsInMaintenance: (value: boolean) => void;
  maintenanceMessage: string;
  setMaintenanceMessage: (message: string) => void;
};

const MaintenanceContext = createContext<MaintenanceContextType | undefined>(undefined);

export function MaintenanceProvider({ children }: { children: React.ReactNode }) {
  // Initialiser à true pour activer le mode maintenance par défaut
  const [isInMaintenance, setIsInMaintenance] = useState(true);
  const [maintenanceMessage, setMaintenanceMessage] = useState(
    "Site en cours de configuration. Notre site sera bientôt disponible à l'adresse portfolioEnergies.com. Merci de votre patience !"
  );

  // Vérifier l'état du mode maintenance dans le localStorage lors du chargement
  useEffect(() => {
    const storedMaintenanceState = localStorage.getItem('maintenanceMode');
    const storedMessage = localStorage.getItem('maintenanceMessage');
    
    if (storedMaintenanceState !== null) {
      setIsInMaintenance(JSON.parse(storedMaintenanceState));
    }
    
    if (storedMessage) {
      setMaintenanceMessage(storedMessage);
    }
  }, []);

  // Sauvegarder l'état du mode maintenance dans le localStorage lorsqu'il change
  useEffect(() => {
    localStorage.setItem('maintenanceMode', JSON.stringify(isInMaintenance));
    localStorage.setItem('maintenanceMessage', maintenanceMessage);
  }, [isInMaintenance, maintenanceMessage]);

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
