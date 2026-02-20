export default function PrivacidadPage() {
  return (
    <>
      <section className="relative py-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-white text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
            <i className="fas fa-shield-alt text-secondary"></i>
            <span className="text-sm font-semibold">Protección de datos</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Política de Privacidad</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Cómo protegemos y utilizamos tu información personal.
          </p>
        </div>
      </section>

      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <p className="text-gray-500 text-sm mb-10">
            Última actualización: febrero 2025
          </p>

          <div className="space-y-10 text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">1. Responsable del tratamiento</h2>
              <p>
                The Fisher Shop (en adelante, &quot;nosotros&quot; o &quot;la tienda&quot;) es el responsable del tratamiento de tus datos personales. Puedes contactarnos en info@thefishershop.com o en +34 910 202 911.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">2. Datos que recogemos</h2>
              <p className="mb-3">Podemos recoger y tratar los siguientes datos:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Datos de identificación:</strong> nombre, apellidos, dirección de email y teléfono</li>
                <li><strong>Datos de facturación y envío:</strong> dirección postal, código postal, ciudad y país</li>
                <li><strong>Datos de pago:</strong> procesados por pasarelas externas (no almacenamos datos de tarjeta)</li>
                <li><strong>Datos técnicos:</strong> dirección IP, tipo de navegador, páginas visitadas (cookies)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">3. Finalidad del tratamiento</h2>
              <p>Utilizamos tus datos para:</p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li>Gestionar y procesar tus pedidos</li>
                <li>Enviarte confirmaciones y actualizaciones de envío</li>
                <li>Atender consultas y reclamaciones</li>
                <li>Enviar comunicaciones comerciales (si has dado tu consentimiento)</li>
                <li>Cumplir obligaciones legales y fiscales</li>
                <li>Mejorar nuestros servicios y la experiencia en la web</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">4. Base legal</h2>
              <p>
                El tratamiento se basa en: la ejecución del contrato de compraventa, tu consentimiento (newsletter, cookies), y el cumplimiento de obligaciones legales aplicables (facturación, contabilidad).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">5. Conservación</h2>
              <p>
                Conservamos tus datos mientras mantengas relación comercial con nosotros y durante los plazos legales aplicables (fiscalidad, contabilidad, reclamaciones). Los datos de facturación se conservan conforme a la normativa tributaria española.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">6. Destinatarios y cesiones</h2>
              <p>
                Podemos compartir datos con: empresas de transporte para el envío, proveedores de pago (Stripe, PayPal, etc.), y en la medida exigida por ley. No vendemos ni cedemos tus datos a terceros con fines comerciales.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">7. Tus derechos</h2>
              <p className="mb-3">Puedes ejercer en cualquier momento:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Acceso:</strong> conocer qué datos tenemos sobre ti</li>
                <li><strong>Rectificación:</strong> corregir datos inexactos</li>
                <li><strong>Supresión:</strong> solicitar la eliminación de tus datos</li>
                <li><strong>Limitación:</strong> restringir el tratamiento en ciertos casos</li>
                <li><strong>Portabilidad:</strong> recibir tus datos en formato estructurado</li>
                <li><strong>Oposición:</strong> oponerte al tratamiento en determinadas circunstancias</li>
              </ul>
              <p className="mt-4">
                Para ejercer tus derechos, escríbenos a info@thefishershop.com. También tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">8. Cookies</h2>
              <p>
                Utilizamos cookies propias y de terceros para el funcionamiento del sitio, análisis de uso y publicidad. Puedes gestionar tus preferencias en la configuración de tu navegador. Consulta nuestra política de cookies para más detalle.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">9. Seguridad</h2>
              <p>
                Aplicamos medidas técnicas y organizativas para proteger tus datos frente a accesos no autorizados, pérdida o alteración. La web utiliza cifrado SSL y las transacciones de pago se realizan a través de pasarelas certificadas.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">10. Cambios</h2>
              <p>
                Nos reservamos el derecho de modificar esta política. Los cambios se publicarán en esta página con la nueva fecha de actualización. Te recomendamos revisarla periódicamente.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
