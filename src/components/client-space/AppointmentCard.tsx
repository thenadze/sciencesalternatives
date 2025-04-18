
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar, Clock, CalendarIcon, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type Appointment = {
  id: string;
  service: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  message?: string; // Ajout du champ message
};

type AppointmentCardProps = { 
  appointment: Appointment; 
  isPast?: boolean;
  onCancelAppointment?: (id: string) => void;
};

export const AppointmentCard = ({ 
  appointment, 
  isPast = false,
  onCancelAppointment
}: AppointmentCardProps) => {
  const getServiceIcon = (service: string) => {
    return <Calendar className="h-5 w-5 text-energy-400" />;
  };

  const getServiceName = (service: string) => {
    switch(service) {
      case 'reiki': return "Reiki";
      case 'magnetisme': return "Magnétisme";
      case 'combined': return "Soins combinés";
      default: return service;
    }
  };

  return (
    <div className={`p-6 flex flex-col md:flex-row md:items-center md:justify-between ${isPast ? 'opacity-75' : ''}`}>
      <div className="flex items-start mb-4 md:mb-0">
        <div className="w-10 h-10 rounded-full bg-mystic-950 border border-energy-400/30 flex items-center justify-center mr-4 mt-1">
          {getServiceIcon(appointment.service)}
        </div>
        <div>
          <div className="flex items-center">
            <h4 className="text-lg font-cinzel text-energy-400">
              {getServiceName(appointment.service)}
            </h4>
            {appointment.status === 'cancelled' && (
              <span className="ml-2 text-xs uppercase bg-destructive/20 text-destructive px-2 py-0.5 rounded">
                Annulé
              </span>
            )}
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-1 md:space-y-0 text-gray-400 text-sm mt-1">
            <div className="flex items-center">
              <CalendarIcon className="h-4 w-4 mr-1" />
              <span>
                {format(new Date(appointment.appointment_date), "EEEE d MMMM yyyy", { locale: fr })}
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{appointment.appointment_time}</span>
            </div>
          </div>
          
          {/* Nouvelle section pour afficher un indicateur de message */}
          {appointment.message && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="mt-2 text-gray-400 hover:text-energy-400">
                  <MessageCircle className="h-4 w-4 mr-2" /> 
                  Informations complémentaires
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Informations complémentaires</DialogTitle>
                </DialogHeader>
                <div className="p-4 bg-mystic-900/40 rounded-md">
                  <p className="text-white">{appointment.message}</p>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
      
      {!isPast && onCancelAppointment && (
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            size="sm"
            className="border-destructive text-destructive hover:bg-destructive/10"
            onClick={() => onCancelAppointment(appointment.id)}
          >
            Annuler
          </Button>
        </div>
      )}
    </div>
  );
};
