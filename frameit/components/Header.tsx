"use client";

import Link from "next/link";
import { Search, ShoppingBag, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-serif font-bold">FRAMEIT</div>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/shop" className="text-sm font-medium hover:text-gray-300 transition-colors">
              Tienda
            </Link>
            <Link href="/categorias" className="text-sm font-medium hover:text-gray-300 transition-colors">
              Categorías
            </Link>
            <Link href="/sobre-nosotros" className="text-sm font-medium hover:text-gray-300 transition-colors">
              Sobre Nosotros
            </Link>
            <Link href="/contacto" className="text-sm font-medium hover:text-gray-300 transition-colors">
              Contacto
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
              <Search className="h-5 w-5" />
              <span className="sr-only">Buscar</span>
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800 relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Carrito</span>
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-white text-gray-900 text-xs flex items-center justify-center">
                0
              </span>
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
              <User className="h-5 w-5" />
              <span className="sr-only">Usuario</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
