
import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-mystic-950 border-t border-mystic-800/50 pt-12 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-energy-400 text-xl font-cinzel mb-4">Harmonie Énergétique</h3>
            <p className="text-gray-400 mb-4">
              Des soins énergétiques adaptés à vos besoins pour rétablir l'harmonie entre le corps et l'esprit.
            </p>
            <div className="flex space-x-4 text-gray-400">
              <a href="https://facebook.com" className="hover:text-energy-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" className="hover:text-energy-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="mailto:contact@harmonie-energetique.fr" className="hover:text-energy-400 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-energy-400 text-xl font-cinzel mb-4">Liens utiles</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-gray-400 hover:text-energy-400 transition-colors">
                  Nos services
                </Link>
              </li>
              <li>
                <Link to="/rendez-vous" className="text-gray-400 hover:text-energy-400 transition-colors">
                  Prendre rendez-vous
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-energy-400 transition-colors">
                  Blog & conseils
                </Link>
              </li>
              <li>
                <Link to="/mentions-legales" className="text-gray-400 hover:text-energy-400 transition-colors">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-energy-400 text-xl font-cinzel mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-gray-400">
                <MapPin className="w-5 h-5 text-energy-400 mt-0.5" />
                <span>123 Rue de l'Harmonie<br />75001 Paris, France</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone className="w-5 h-5 text-energy-400" />
                <span>+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail className="w-5 h-5 text-energy-400" />
                <a href="mailto:contact@harmonie-energetique.fr" className="hover:text-energy-400 transition-colors">
                  contact@harmonie-energetique.fr
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-mystic-800/30 mt-10 pt-6 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Harmonie Énergétique. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
