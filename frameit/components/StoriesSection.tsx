import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function StoriesSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">
              Historias Reales, <span className="font-sans font-normal">Momentos Frame</span>
            </h2>
            <p className="text-lg text-gray-600">
              Descubre cómo nuestros clientes están transformando sus espacios con nuestros marcos. 
              Cada historia es única, cada momento merece ser enmarcado.
            </p>
            <Button asChild variant="outline" size="lg">
              <Link href="/historias">Ver más historias</Link>
            </Button>
          </div>

          {/* Image Collage */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative h-48 md:h-64 rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=2070"
                alt="Marco en pared"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="relative h-48 md:h-64 rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1578301978018-3005759f48f7?q=80&w=1974"
                alt="Marco en mesa"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="relative h-48 md:h-64 rounded-lg overflow-hidden col-span-2">
              <Image
                src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=1974"
                alt="Composición de marcos"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
