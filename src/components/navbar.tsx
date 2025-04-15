
import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { EnergyButton } from "@/components/ui/energy-button";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  
  const navItems = [
    { name: "Accueil", href: "/" },
    { name: "À propos", href: "/a-propos" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  // Function to handle smooth scrolling for anchor links
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Check if it's an anchor link on the current page
    if (href.startsWith('#') || (location.pathname === '/' && href === '/')) {
      e.preventDefault();
      
      // If it's the home link on the home page, scroll to top
      if (href === '/' && location.pathname === '/') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }
      
      // For true anchor links, extract the ID and scroll to it
      const targetId = href.startsWith('#') ? href.substring(1) : '';
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
        
        // Close the mobile menu if open
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
        }
      }
    }
  };

  const isActive = (path: string) => {
    if (path.startsWith('#')) {
      // For anchor links, check if that section is current in viewport
      const targetId = path.substring(1);
      return location.hash === path;
    }
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-mystic-950/80 backdrop-blur-md border-b border-mystic-800/50">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl font-cinzel text-white flex items-center gap-2"
          onClick={(e) => handleAnchorClick(e, '/')}
        >
          <span className="w-2 h-2 rounded-full bg-energy-400 shadow-[0_0_10px_rgba(243,190,89,0.7)]"></span>
          <span className="bg-gradient-to-r from-energy-300 to-energy-400 bg-clip-text text-transparent">
            Harmonie Énergétique
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={(e) => handleAnchorClick(e, item.href)}
                className={cn(
                  "px-3 py-2 text-sm font-medium relative",
                  "before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-energy-400 before:transition-all before:duration-300",
                  "hover:before:w-full hover:text-energy-400 transition-colors duration-300",
                  isActive(item.href)
                    ? "text-energy-400 before:w-full"
                    : "text-gray-300"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <EnergyButton asChild>
            <Link to="/rendez-vous" onClick={(e) => handleAnchorClick(e, '/rendez-vous')}>
              Prendre rendez-vous
            </Link>
          </EnergyButton>

          <Button variant="ghost" size="icon" className="rounded-full">
            <span className="sr-only">Mon compte</span>
            <Link to="/espace-personnel">
              <User className="h-5 w-5 text-energy-300" />
            </Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-energy-300" />
          ) : (
            <Menu className="h-6 w-6 text-energy-300" />
          )}
        </Button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-mystic-950/95 backdrop-blur-md">
          <div className="container mx-auto px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "block px-3 py-3 text-base font-medium border-l-2",
                  isActive(item.href)
                    ? "border-energy-400 text-energy-400"
                    : "border-transparent text-gray-300 hover:border-energy-300 hover:text-energy-300"
                )}
                onClick={(e) => {
                  handleAnchorClick(e, item.href);
                  setMobileMenuOpen(false);
                }}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2 pb-3">
              <EnergyButton asChild className="w-full">
                <Link 
                  to="/rendez-vous" 
                  onClick={(e) => {
                    handleAnchorClick(e, '/rendez-vous');
                    setMobileMenuOpen(false);
                  }}
                >
                  Prendre rendez-vous
                </Link>
              </EnergyButton>
            </div>
            <div className="pt-2 pb-3">
              <Button variant="secondary" asChild className="w-full">
                <Link 
                  to="/espace-personnel" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Mon espace personnel
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
