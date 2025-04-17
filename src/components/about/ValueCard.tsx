
import { ScrollObserver } from "@/components/ui/scroll-observer";
import { LucideIcon } from "lucide-react";

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const ValueCard = ({ icon, title, description }: ValueCardProps) => {
  return (
    <ScrollObserver>
      <div className="bg-mystic-900/40 backdrop-blur-sm rounded-lg p-6 border border-mystic-800/30 hover:border-energy-400/30 transition-colors duration-300">
        <div className="w-12 h-12 rounded-full bg-mystic-950 flex items-center justify-center mb-4 border border-energy-400/30">
          {icon}
        </div>
        <h3 className="text-xl font-cinzel mb-3 text-white">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </ScrollObserver>
  );
};
