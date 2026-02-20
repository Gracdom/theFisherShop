'use client'

import { useState } from 'react'

const faqCategories = [
  {
    title: 'Pedidos y envíos',
    icon: 'fas fa-box',
    faqs: [
      {
        q: '¿Cuál es el plazo de entrega?',
        a: 'Los pedidos se preparan y envían en 24-48 horas laborables. La entrega suele tardar 2-5 días laborables en la península y 3-7 días en Canarias, Baleares y Ceuta.',
      },
      {
        q: '¿Los envíos son gratuitos?',
        a: 'Sí, el envío estándar es gratuito en todos los pedidos a partir de 50€. Para pedidos inferiores, el coste es de 4,95€. Envío express disponible por 7,95€.',
      },
      {
        q: '¿Puedo hacer seguimiento de mi pedido?',
        a: 'Sí. Una vez enviado, recibirás un email con el número de seguimiento para que puedas rastrear tu pedido en tiempo real.',
      },
      {
        q: '¿Envían a Canarias y Baleares?',
        a: 'Sí, enviamos a toda España incluidas Canarias, Baleares, Ceuta y Melilla. Los plazos pueden ser algo más largos según la zona.',
      },
    ],
  },
  {
    title: 'Devoluciones y garantías',
    icon: 'fas fa-undo-alt',
    faqs: [
      {
        q: '¿Puedo devolver un producto?',
        a: 'Tienes 14 días desde la recepción para devolver productos sin usar y en su embalaje original. Contacta con nosotros por email o WhatsApp para iniciar el proceso de devolución.',
      },
      {
        q: '¿Cómo solicito una devolución?',
        a: 'Escribe a info@thefishershop.com o por WhatsApp indicando el número de pedido y el producto a devolver. Te enviaremos la etiqueta de devolución prepagada.',
      },
      {
        q: '¿Cuándo recibo el reembolso?',
        a: 'Una vez recibamos el producto y verifiquemos su estado, procesamos el reembolso en 3-5 días laborables. El tiempo de acreditación en tu cuenta depende de tu banco.',
      },
      {
        q: '¿Los productos tienen garantía?',
        a: 'Sí. Todos nuestros productos incluyen la garantía del fabricante, normalmente 1-2 años. Las cañas y carretes de gama alta pueden tener garantías extendidas.',
      },
    ],
  },
  {
    title: 'Pagos y seguridad',
    icon: 'fas fa-credit-card',
    faqs: [
      {
        q: '¿Qué métodos de pago aceptáis?',
        a: 'Aceptamos tarjeta de crédito/débito (Visa, Mastercard), PayPal y transferencia bancaria. Todos los pagos se procesan de forma segura a través de pasarelas certificadas.',
      },
      {
        q: '¿Es seguro comprar en la web?',
        a: 'Sí. Utilizamos cifrado SSL en toda la web y nuestras pasarelas de pago cumplen el estándar PCI-DSS. No almacenamos datos de tarjeta en nuestros servidores.',
      },
      {
        q: '¿Puedo pagar a plazos?',
        a: 'Sí, ofrecemos pago en 3 o 4 plazos sin intereses para compras superiores a 100€ a través de nuestro proveedor de financiación.',
      },
    ],
  },
  {
    title: 'Productos y asesoramiento',
    icon: 'fas fa-fish',
    faqs: [
      {
        q: '¿Pueden asesorarme en la compra?',
        a: '¡Por supuesto! Nuestro equipo está formado por pescadores experimentados. Escríbenos por WhatsApp o email y te ayudamos a elegir el equipo ideal para tu tipo de pesca.',
      },
      {
        q: '¿Tienen tienda física?',
        a: 'Actualmente operamos solo online para ofrecerte los mejores precios y un catálogo más amplio. Estamos en Madrid y puedes recoger tu pedido si lo solicitas.',
      },
      {
        q: '¿Recibiré factura de mi compra?',
        a: 'Sí. Recibirás la factura por email junto con la confirmación del pedido. También está disponible en tu área de cuenta.',
      },
    ],
  },
]

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>('0-0')

  const toggle = (categoryIdx: number, faqIdx: number) => {
    const id = `${categoryIdx}-${faqIdx}`
    setOpenId(openId === id ? null : id)
  }

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[320px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/images/faq.webp")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/40" />
        <div className="relative z-10 container mx-auto px-4 text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <i className="fas fa-question-circle text-secondary"></i>
            <span className="text-sm font-semibold">¿Necesitas ayuda?</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Preguntas frecuentes</h1>
          <p className="text-lg text-white/90 max-w-xl">
            Resolvemos las dudas más habituales de nuestros clientes. Si no encuentras la respuesta, contáctanos.
          </p>
        </div>
      </section>

      {/* Acordeones por categoría */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          {faqCategories.map((category, catIdx) => (
            <div key={catIdx} className="mb-12 last:mb-0">
              <h2 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-6">
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <i className={`fas ${category.icon} text-primary`}></i>
                </span>
                {category.title}
              </h2>
              <div className="space-y-3">
                {category.faqs.map((faq, faqIdx) => {
                  const id = `${catIdx}-${faqIdx}`
                  const isOpen = openId === id
                  return (
                    <div
                      key={faqIdx}
                      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <button
                        onClick={() => toggle(catIdx, faqIdx)}
                        className="w-full px-6 py-4 text-left flex justify-between items-center gap-4 hover:bg-gray-50/50 transition"
                      >
                        <span className="font-semibold text-gray-900">{faq.q}</span>
                        <span
                          className={`flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        >
                          <i className="fas fa-chevron-down text-primary text-sm"></i>
                        </span>
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="px-6 pb-4 pt-0">
                          <p className="text-gray-600 leading-relaxed pl-0">{faq.a}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA contacto */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/10">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">¿No encuentras tu respuesta?</h2>
            <p className="text-gray-600 mb-6">
              Nuestro equipo está disponible para ayudarte. Escríbenos por WhatsApp o email.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/34910202911"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                <i className="fab fa-whatsapp text-lg"></i>
                WhatsApp
              </a>
              <a
                href="/contacto"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                <i className="fas fa-envelope"></i>
                Formulario de contacto
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
