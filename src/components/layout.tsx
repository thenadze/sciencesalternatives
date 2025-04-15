
import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { ScrollProgress } from "@/components/ui/scroll-progress";

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-mystic-950 to-mystic-900">
      <ScrollProgress />
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
