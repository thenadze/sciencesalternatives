
import { Star } from "lucide-react";
import { ScrollObserver } from "@/components/ui/scroll-observer";

interface TestimonialCardProps {
  text: string;
  name: string;
  stars: number;
}

export function TestimonialCard({ text, name, stars }: TestimonialCardProps) {
  return (
    <ScrollObserver>
      <div className="bg-mystic-900/40 backdrop-blur-sm rounded-lg p-8 border border-mystic-800/30 transition-all duration-500 hover:transform hover:scale-105 hover:border-energy-400/50 hover:shadow-[0_0_15px_rgba(243,190,89,0.3)] hover:bg-mystic-800/50">
        <div className="flex text-energy-400 mb-4">
          {[...Array(stars)].map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-energy-400" />
          ))}
        </div>
        <p className="text-gray-300 italic mb-6">"{text}"</p>
        <p className="text-energy-400 font-medium">{name}</p>
      </div>
    </ScrollObserver>
  );
}
