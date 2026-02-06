import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    id: 1,
    name: "Marcos de Madera",
    description: "Marcos modernos y grandes",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=1974",
    href: "/categorias/madera",
  },
  {
    id: 2,
    name: "Marcos Rústicos",
    description: "Marcos rústicos y pequeños",
    image: "https://images.unsplash.com/photo-1578301978018-3005759f48f7?q=80&w=1974",
    href: "/categorias/rusticos",
  },
  {
    id: 3,
    name: "Marcos Minimalistas",
    description: "Marcos para collage",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=2070",
    href: "/categorias/minimalistas",
  },
  {
    id: 4,
    name: "Marcos de Metal",
    description: "Diseños contemporáneos",
    image: "https://images.unsplash.com/photo-1594736797933-d0cbc0c0d0b0?q=80&w=1974",
    href: "/categorias/metal",
  },
  {
    id: 5,
    name: "Marcos Vintage",
    description: "Estilo clásico y elegante",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1945",
    href: "/categorias/vintage",
  },
  {
    id: 6,
    name: "Marcos Personalizados",
    description: "Crea tu diseño único",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=2070",
    href: "/categorias/personalizados",
  },
];

export default function CategoryGrid() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Qué te gustaría enmarcar?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explora nuestra amplia selección de marcos para encontrar el perfecto para tus momentos especiales.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category) => (
            <Card key={category.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-64 md:h-80">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-gray-600 mb-4 text-sm">{category.description}</p>
                <Button asChild variant="outline" className="w-full">
                  <Link href={category.href}>Ver colección</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
