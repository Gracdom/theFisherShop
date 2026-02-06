import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Rebeca M.",
    location: "Madrid",
    rating: 5,
    title: "Excelente calidad",
    text: "Los marcos que compré son perfectos. La calidad es excepcional y el proceso de compra fue muy sencillo. Definitivamente volveré a comprar.",
  },
  {
    id: 2,
    name: "Carlos P.",
    location: "Barcelona",
    rating: 5,
    title: "Rápido y eficiente",
    text: "Me encantó la rapidez del envío y la atención al cliente. Los marcos llegaron perfectamente empaquetados y son exactamente como se mostraban en la web.",
  },
  {
    id: 3,
    name: "Ana L.",
    location: "Valencia",
    rating: 5,
    title: "Diseño perfecto",
    text: "Encontré exactamente lo que buscaba. Los marcos minimalistas son hermosos y se ven perfectos en mi sala. Muy recomendado.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
          La opinión de nuestros clientes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <h3 className="font-semibold text-lg mb-2">{testimonial.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{testimonial.text}</p>
                <div className="flex justify-between items-center">
                  <p className="font-medium text-sm">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.location}</p>
                </div>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900 mt-2 inline-block">
                  Leer más →
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
