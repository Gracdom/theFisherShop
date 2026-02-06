import { Shield, Truck, Headphones, Award } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Calidad garantizada",
    description: "Todos nuestros marcos están fabricados con materiales de primera calidad y pasan por un riguroso control de calidad.",
    color: "text-green-600",
  },
  {
    icon: Truck,
    title: "Envío rápido",
    description: "Recibe tus pedidos en tiempo récord. Envío gratuito en pedidos superiores a 50€.",
    color: "text-blue-600",
  },
  {
    icon: Headphones,
    title: "Atención al cliente",
    description: "Nuestro equipo está disponible para ayudarte en cada paso del proceso. Soporte 24/7.",
    color: "text-orange-600",
  },
  {
    icon: Award,
    title: "Acabados premium",
    description: "Cada marco es cuidadosamente terminado a mano para garantizar la máxima calidad y durabilidad.",
    color: "text-blue-600",
  },
];

export default function Features() {
  return (
    <section className="py-16 md:py-24 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
          ¿Por qué seleccionar FrameIt?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className={`${feature.color} p-4 rounded-full bg-white`}>
                    <Icon className="h-8 w-8" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
