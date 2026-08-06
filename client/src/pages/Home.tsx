/**
 * OLIVAEN — Home Page
 * "Terroir Documentaire" editorial minimalism
 * Deep Olive / Warm Cream / Gold Ochre palette
 * Playfair Display (headlines) + Source Sans 3 (body) + JetBrains Mono (meta)
 */
import { useAuth } from "@/_core/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Origin from "@/components/Origin";
import Process from "@/components/Process";
import Transparency from "@/components/Transparency";
import FoundingHarvest from "@/components/FoundingHarvest";
import EmailCapture from "@/components/EmailCapture";
import Footer from "@/components/Footer";

export default function Home() {
  // Auth state available if needed for protected features
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Hero />
        <Origin />
        <Process />
        <Transparency />
        <FoundingHarvest />
        <EmailCapture />
      </main>
      <Footer />
    </div>
  );
}
