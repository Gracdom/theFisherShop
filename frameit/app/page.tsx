import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import PromoSection from "@/components/PromoSection";
import Testimonials from "@/components/Testimonials";
import StoriesSection from "@/components/StoriesSection";
import Features from "@/components/Features";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      
      {/* Sección de Introducción */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Aquí te contamos en resumen
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              FrameIt nació con la misión de hacer que enmarcar tus momentos especiales 
              sea tan fácil como elegir una foto. Ofrecemos una amplia selección de marcos 
              de alta calidad, desde diseños minimalistas hasta opciones rústicas y vintage. 
              Cada marco está cuidadosamente seleccionado para garantizar que encuentres 
              el perfecto para cada ocasión.
            </p>
          </div>
        </div>
      </section>

      <CategoryGrid />
      <PromoSection />
      <Testimonials />
      <StoriesSection />
      <Features />
      
      <Footer />
    </main>
  );
}
