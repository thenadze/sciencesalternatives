
import { Link } from "react-router-dom";
import { Heart, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface BlogSidebarProps {
  categories: string[];
}

export function BlogSidebar({ categories }: BlogSidebarProps) {
  return (
    <div className="sticky top-24 space-y-8">
      <div className="bg-mystic-900/40 backdrop-blur-sm rounded-lg p-6 border border-mystic-800/30">
        <h3 className="text-xl font-cinzel mb-4">Catégories</h3>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li key={index}>
              <Link
                to={`/blog/category/${category.toLowerCase()}`}
                className="flex items-center text-gray-400 hover:text-energy-400 transition-colors py-1"
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-mystic-900/40 backdrop-blur-sm rounded-lg p-6 border border-mystic-800/30">
        <h3 className="text-xl font-cinzel mb-4">Newsletter</h3>
        <p className="text-gray-400 mb-4">
          Inscrivez-vous pour recevoir nos derniers articles et conseils en bien-être énergétique.
        </p>
        <div className="space-y-3">
          <Input
            type="email"
            placeholder="Votre email"
            className="bg-mystic-800/40 border-mystic-700/50"
          />
          <Button className="w-full bg-energy-400 hover:bg-energy-500 text-mystic-950">
            S'inscrire
          </Button>
        </div>
      </div>
      <div className="bg-gradient-to-br from-mystic-900 to-mystic-800 rounded-lg p-6 border border-mystic-700/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-energy-400 to-soft-600"></div>
        <div className="relative z-10">
          <div className="flex justify-center mb-4">
            <Heart className="h-12 w-12 text-energy-400" />
          </div>
          <h3 className="text-xl font-cinzel mb-3 text-center">Besoin d'un soin personnalisé ?</h3>
          <p className="text-gray-400 mb-4 text-center">
            Prenez rendez-vous pour une consultation et découvrez nos soins énergétiques.
          </p>
          <Button asChild className="w-full bg-energy-400 hover:bg-energy-500 text-mystic-950">
            <Link to="/rendez-vous">
              Prendre rendez-vous
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
