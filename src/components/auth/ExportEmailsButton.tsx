
import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";

export const ExportEmailsButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { session } = useAuth();

  const handleExport = async () => {
    if (!session) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour exporter les emails",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("export-emails", {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;

      if (data.success && data.data) {
        // Conversion du base64 en blob
        const byteCharacters = atob(data.data);
        const byteNumbers = new Array(byteCharacters.length);
        
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        
        // Création d'un lien de téléchargement
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `emails_export_${new Date().toISOString().split('T')[0]}.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        
        toast({
          title: "Export réussi",
          description: `${data.count} emails ont été exportés depuis "${data.source}"`,
        });
      } else {
        throw new Error("Format de réponse incorrect");
      }
    } catch (error: any) {
      console.error("Erreur lors de l'export:", error);
      toast({
        title: "Erreur d'exportation",
        description: error.message || "Une erreur est survenue lors de l'exportation des emails",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="flex items-center gap-2 border-gray-700 bg-mystic-800/40 hover:bg-mystic-700/50 text-gray-300"
      onClick={handleExport}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      Exporter les emails
    </Button>
  );
};
