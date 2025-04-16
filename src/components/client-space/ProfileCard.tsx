
import { User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type ProfileCardProps = {
  firstName?: string;
  lastName?: string;
  email?: string;
  onLogout: () => void;
};

export const ProfileCard = ({ firstName, lastName, email, onLogout }: ProfileCardProps) => {
  return (
    <div className="bg-mystic-900/40 backdrop-blur-sm rounded-lg p-6 border border-mystic-800/30 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-12 h-12 rounded-full bg-energy-400/20 border border-energy-400/30 flex items-center justify-center mr-4">
            <User className="h-6 w-6 text-energy-400" />
          </div>
          <div>
            <h2 className="text-xl font-cinzel">
              {firstName && lastName ? `${firstName} ${lastName}` : email}
            </h2>
            <p className="text-gray-400">{email}</p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                Profil
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Votre profil</DialogTitle>
                <DialogDescription>
                  Consultez et modifiez vos informations personnelles
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="text-center text-gray-400 mb-4">
                  Cette fonctionnalité sera bientôt disponible.
                </p>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button 
            variant="outline" 
            className="flex items-center border-destructive text-destructive hover:bg-destructive/10"
            onClick={onLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </Button>
        </div>
      </div>
    </div>
  );
};
