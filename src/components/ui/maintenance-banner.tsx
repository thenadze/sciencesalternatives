
import { useMaintenanceMode } from "@/context/MaintenanceContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export function MaintenanceBanner() {
  const { isInMaintenance, maintenanceMessage } = useMaintenanceMode();

  if (!isInMaintenance) return null;

  return (
    <Alert variant="destructive" className="fixed top-0 left-0 right-0 z-50 rounded-none">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>{maintenanceMessage}</AlertDescription>
    </Alert>
  );
}
