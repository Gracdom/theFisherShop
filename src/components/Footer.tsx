import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 relative">
      {/* Wave decoration */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#f3f4f6"></path>
        </svg>
      </div>
      
      <div className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1 - About */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo.png"
                alt="Escamar Pesca - Equipamiento de pesca profesional"
                width={180}
                height={45}
                className="h-11 w-auto"
              />
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed text-sm">
              Tu tienda online de confianza para todo tipo de equipo de pesca.
              Calidad profesional al mejor precio.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-secondary transition"
              >
                <i className="fab fa-facebook text-sm"></i>
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-secondary transition"
              >
                <i className="fab fa-instagram text-sm"></i>
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-secondary transition"
              >
                <i className="fab fa-twitter text-sm"></i>
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-secondary transition"
              >
                <i className="fab fa-youtube text-sm"></i>
              </a>
            </div>
          </div>

          {/* Column 2 - Information */}
          <div>
            <h4 className="text-base font-bold mb-4">Información</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/sobre-nosotros" className="text-gray-400 hover:text-secondary transition">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link href="/tienda" className="text-gray-400 hover:text-secondary transition">
                  Tienda
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-gray-400 hover:text-secondary transition">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-secondary transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Customer Service */}
          <div>
            <h4 className="text-base font-bold mb-4">Atención al cliente</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/carrito" className="text-gray-400 hover:text-secondary transition">
                  Carrito
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="text-gray-400 hover:text-secondary transition">
                  Checkout
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="text-gray-400 hover:text-secondary transition">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-secondary transition">
                  Preguntas frecuentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h4 className="text-base font-bold mb-4">Contacto</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-start gap-2">
                <i className="fas fa-map-marker-alt text-secondary mt-1 text-xs"></i>
                <span>Calle del Puerto 123, Madrid 28001</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-phone text-secondary mt-1 text-xs"></i>
                <span>(+34) 912 345 678</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-envelope text-secondary mt-1 text-xs"></i>
                <span>info@escamarpesca.com</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fas fa-clock text-secondary mt-1 text-xs"></i>
                <span>Lun-Vie: 9:00 - 18:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} Escamar Pesca. Todos los derechos reservados.
          </p>
          <div className="flex gap-4 text-2xl text-gray-600">
            <i className="fab fa-cc-visa hover:text-secondary transition"></i>
            <i className="fab fa-cc-mastercard hover:text-secondary transition"></i>
            <i className="fab fa-cc-paypal hover:text-secondary transition"></i>
            <i className="fab fa-cc-amex hover:text-secondary transition"></i>
          </div>
        </div>
      </div>
    </footer>
  )
}
