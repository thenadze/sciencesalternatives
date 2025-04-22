
import React from 'react';
import { useMaintenanceMode } from "@/context/MaintenanceContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

export function MaintenanceBanner() {
  const { isInMaintenance, maintenanceMessage } = useMaintenanceMode();
  const { toast } = useToast();

  // Afficher une notification toast au chargement si en mode maintenance
  useEffect(() => {
    if (isInMaintenance) {
      toast({
        title: "Mode maintenance actif",
        description: "Le site est actuellement en mode maintenance",
        duration: 5000,
      });
    }
  }, [isInMaintenance, toast]);

  if (!isInMaintenance) return null;

  return (
    <Alert variant="destructive" className="fixed top-0 left-0 right-0 z-50 rounded-none">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription className="font-medium">{maintenanceMessage}</AlertDescription>
    </Alert>
  );
}
