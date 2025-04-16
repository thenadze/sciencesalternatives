
import { Sun, Heart, Droplet } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";

type ServiceCardProps = {
  value: string;
  id: string;
  title: string;
  duration: string;
  price: string;
  icon: "reiki" | "magnetisme" | "combined";
  selected: boolean;
};

export const ServiceSelectionCard = ({
  value,
  id,
  title,
  duration,
  price,
  icon,
  selected,
}: ServiceCardProps) => {
  const getIcon = () => {
    switch (icon) {
      case "reiki":
        return <Sun className="h-6 w-6 text-energy-400" />;
      case "magnetisme":
        return <Heart className="h-6 w-6 text-energy-400" />;
      case "combined":
        return <Droplet className="h-6 w-6 text-energy-400" />;
    }
  };

  return (
    <div className={`bg-mystic-800/40 backdrop-blur-sm rounded-lg p-4 border ${selected ? "border-energy-400" : "border-mystic-700/30"} cursor-pointer transition-colors duration-300 hover:border-energy-400/50`}>
      <RadioGroupItem value={value} id={id} className="sr-only" />
      <Label 
        htmlFor={id} 
        className="cursor-pointer flex flex-col items-center text-center h-full"
      >
        <span className="w-12 h-12 rounded-full bg-mystic-950 border border-energy-400/30 flex items-center justify-center mb-3">
          {getIcon()}
        </span>
        <span className="font-cinzel text-lg mb-1">{title}</span>
        <span className="text-sm text-gray-400 mb-2">{duration}</span>
        <span className="text-energy-400 font-cinzel">{price}</span>
      </Label>
    </div>
  );
};
