import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-slate-50 font-sans">
      
      {/* Navbar no topo */}
      <Navbar />

      <main className="flex-grow flex items-center justify-center w-full">
        <Hero />
      </main>

      <Footer />
    </div>
  );
}