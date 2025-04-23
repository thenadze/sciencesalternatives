
import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { MaintenanceBanner } from "@/components/ui/maintenance-banner";
import { MaintenanceProvider } from "@/context/MaintenanceContext";
import { IntroAnimation } from "@/components/ui/intro-animation";

export function Layout() {
  return (
    <MaintenanceProvider>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-mystic-950 to-mystic-900">
        <IntroAnimation />
        <MaintenanceBanner />
        <ScrollProgress />
        <Navbar />
        <main id="accueil" className="flex-grow pt-24 pb-16">
          <Outlet />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    </MaintenanceProvider>
  );
}
