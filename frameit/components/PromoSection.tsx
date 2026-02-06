import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PromoSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">
              10% de descuento en tu primera compra!
            </h2>
            <p className="text-lg text-gray-600">
              Únete a nuestra comunidad y disfruta de ofertas exclusivas. 
              Crea tu cuenta hoy y recibe un descuento especial en tu primer pedido.
            </p>
            <Button asChild size="lg" className="bg-gray-900 text-white hover:bg-gray-800">
              <Link href="/registro">Aplicar descuento</Link>
            </Button>
          </div>

          {/* Image */}
          <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069')",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
