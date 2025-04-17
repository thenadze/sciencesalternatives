
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  linkId: string;
}

export function ServiceCard({ icon: Icon, title, description, linkId }: ServiceCardProps) {
  return (
    <div className="bg-mystic-900/80 backdrop-blur-sm rounded-lg p-8 border border-mystic-800/50 hover:border-energy-400/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-[0_0_15px_rgba(243,190,89,0.3)] hover:bg-mystic-800/50">
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-energy-400 to-energy-500 flex items-center justify-center mb-6 energy-pulse">
        <Icon className="h-7 w-7 text-mystic-950" />
      </div>
      <h3 className="text-xl font-cinzel mb-3 text-white group-hover:text-energy-300">{title}</h3>
      <p className="text-gray-400 mb-4">
        {description}
      </p>
      <Link to={`/services#${linkId}`} className="text-energy-400 inline-flex items-center group hover:text-energy-300 transition-colors">
        En savoir plus <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
