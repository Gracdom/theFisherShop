export default function InformacionEnvioPage() {
  return (
    <>
      <section className="relative py-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-white text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <i className="fas fa-shipping-fast text-secondary"></i>
            <span className="text-sm font-semibold">Entregas</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Información de envío</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Plazos, costes y zonas de entrega para tu pedido.
          </p>
        </div>
      </section>

      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-10 text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Coste del envío</h2>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-4">
                <ul className="space-y-2">
                  <li className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                    <span>Pedidos a partir de <strong>50€</strong></span>
                    <span className="font-bold text-primary">Envío gratis</span>
                  </li>
                  <li className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                    <span>Pedidos inferiores a 50€</span>
                    <span className="font-bold text-gray-900">4,95 €</span>
                  </li>
                  <li className="flex justify-between items-center py-2">
                    <span>Envío express (24-48h)</span>
                    <span className="font-bold text-gray-900">7,95 €</span>
                  </li>
                </ul>
              </div>
              <p>
                El coste se aplica al realizar el pedido. Los precios mostrados en la web incluyen IVA.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Plazos de preparación y entrega</h2>
              <p className="mb-4">
                Preparamos y enviamos tu pedido en <strong>24-48 horas laborables</strong> tras la confirmación del pago. Los plazos de entrega indicados son orientativos y dependen del transportista y la zona:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Península:</strong> 2-5 días laborables</li>
                <li><strong>Baleares, Ceuta y Melilla:</strong> 3-7 días laborables</li>
                <li><strong>Canarias:</strong> 5-10 días laborables</li>
                <li><strong>Envío express:</strong> 24-48h en península (según disponibilidad)</li>
              </ul>
              <p className="mt-4 text-gray-500 text-sm">
                No realizamos envíos los fines de semana ni festivos. Los días no laborables no se computan en el plazo.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Zonas de envío</h2>
              <p>
                Enviamos a todo el territorio español: península, Baleares, Canarias, Ceuta y Melilla. Para envíos internacionales, contacta con nosotros en info@thefishershop.com para consultar disponibilidad y costes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Seguimiento del pedido</h2>
              <p>
                Una vez enviado, recibirás un email con el número de seguimiento y un enlace para rastrear tu paquete en tiempo real. Si no lo recibes, revisa la carpeta de spam o contáctanos por WhatsApp o email.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Transportistas</h2>
              <p>
                Trabajamos con transportistas de confianza (Correos, Seur, MRW, DHL u otros según la zona y el peso). El embalaje está reforzado para que tu equipo de pesca llegue en perfectas condiciones. En caso de incidencia durante el transporte, ponte en contacto con nosotros y gestionaremos el seguimiento con la empresa de mensajería.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Recepción del pedido</h2>
              <p>
                Verifica el estado del paquete en el momento de la recepción. Si detectas daños en el embalaje exterior, anótalo en el albarán antes de firmar. Para reclamaciones por daños o incidencias, contacta con nosotros en las primeras 24 horas tras la entrega.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">Dirección de envío</h2>
              <p>
                Asegúrate de facilitar una dirección completa y correcta. Si el pedido no puede entregarse por datos incorrectos o ausencia del destinatario, los gastos de un segundo intento de envío correrán a tu cargo. En paquetes devueltos a almacén sin entregar, nos reservamos el derecho de cargar los costes de reenvío o anulación.
              </p>
            </section>

            <section className="pt-4">
              <p className="text-gray-500 text-sm">
                ¿Tienes dudas? Escríbenos a info@thefishershop.com o contacta por WhatsApp al +34 910 202 911.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
