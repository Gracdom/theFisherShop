'use client'

import { useState } from 'react'

type FormData = { name: string; email: string; subject: string; message: string }

const contactInfo = [
  {
    icon: 'fab fa-whatsapp',
    title: 'WhatsApp',
    value: '+34 910 202 911',
    href: 'https://wa.me/34910202911',
    description: 'Respuesta en minutos',
  },
  {
    icon: 'fas fa-envelope',
    title: 'Email',
    value: 'info@thefishershop.com',
    href: 'mailto:info@thefishershop.com',
    description: 'Te respondemos en 24h',
  },
  {
    icon: 'fas fa-clock',
    title: 'Horario',
    value: 'Lun - Vie: 9:00 - 20:00',
    href: null,
    description: 'Sáb: 10:00 - 14:00',
  },
]

export default function ContactoPage() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error al enviar')
      setSent(true)
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar el mensaje')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[320px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/images/contacto%20(1).webp")' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/40" />
        <div className="relative z-10 container mx-auto px-4 text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <i className="fas fa-headset text-secondary"></i>
            <span className="text-sm font-semibold">Atención al cliente</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Contacto</h1>
          <p className="text-lg text-white/90 max-w-xl">
            ¿Tienes dudas sobre nuestros productos o pedidos? Estamos aquí para ayudarte.
          </p>
        </div>
      </section>

      {/* Tarjetas de contacto */}
      <section className="py-12 -mt-16 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {contactInfo.map((item, i) => (
              <a
                key={i}
                href={item.href || '#'}
                className={`group flex items-start gap-5 p-6 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300 ${!item.href ? 'pointer-events-none' : ''}`}
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors flex-shrink-0">
                  <i className={`${item.icon} text-primary text-xl group-hover:text-white transition-colors`}></i>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-0.5">{item.title}</h3>
                  <p className="text-primary font-semibold text-lg">{item.value}</p>
                  <p className="text-gray-500 text-sm mt-1">{item.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Formulario e info */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Envíanos un mensaje</h2>
              <p className="text-gray-600 mb-8">
                Rellena el formulario y te responderemos lo antes posible. Si prefieres una respuesta inmediata, escríbenos por WhatsApp.
              </p>
              {sent ? (
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                    <i className="fas fa-check text-green-600 text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">¡Mensaje enviado!</h3>
                  <p className="text-gray-600">Te responderemos en breve. Revisa tu correo.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 space-y-5">
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                      {error}
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre *</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Asunto</label>
                    <input
                      type="text"
                      placeholder="Ej: Consulta sobre pedido #123"
                      value={form.subject}
                      onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Mensaje *</label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Describe tu consulta..."
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary transition resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-secondary text-white py-3.5 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar mensaje
                        <i className="fas fa-paper-plane text-sm"></i>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
            <div>
              <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-gray-200">
                <img
                  src="/images/contacto%20(2).webp"
                  alt="Pesca en aguas tranquilas"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-8 p-6 bg-primary/5 rounded-2xl border border-primary/10">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <i className="fas fa-info-circle text-primary"></i>
                  ¿Prefieres hablar por teléfono?
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Nuestro equipo está disponible para asesorarte en la compra de tu equipo de pesca.
                </p>
                <a
                  href="https://wa.me/34910202911"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-2.5 rounded-full font-semibold transition"
                >
                  <i className="fab fa-whatsapp text-lg"></i>
                  Chatear por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
