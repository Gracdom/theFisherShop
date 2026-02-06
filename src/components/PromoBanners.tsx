export default function PromoBanners() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Banner 1 */}
          <div className="relative rounded-2xl overflow-hidden min-h-[280px] flex items-center"
            style={{
              backgroundImage: 'linear-gradient(rgba(0,61,91,0.7), rgba(0,90,130,0.7)), url("/images/banner-pescado.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}>
            <div className="relative z-10 text-white p-8">
              <span className="inline-block bg-white px-4 py-1 rounded-full text-xs mb-3 font-bold text-primary uppercase">
                Oferta flash
              </span>
              <h3 className="text-4xl font-bold mb-2">
                Grandes ahorros <span className="block text-2xl">en pesca</span>
              </h3>
              <button className="bg-primary text-white px-8 py-2.5 rounded-full font-semibold hover:bg-secondary transition text-sm uppercase mt-4">
                Ver ofertas
              </button>
            </div>
          </div>

          {/* Banner 2 */}
          <div className="relative rounded-2xl overflow-hidden min-h-[280px] flex items-center"
            style={{
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("/images/banner-senuelo.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}>
            <div className="relative z-10 text-white p-8">
              <span className="text-2xl font-light mb-2 block">
                <span className="text-white font-bold text-3xl">29,00 €</span> solo
              </span>
              <h3 className="text-4xl font-bold mb-1">
                Carrete
              </h3>
              <p className="text-xl mb-5 font-light">
                spinning extremo
              </p>
              <button className="bg-primary text-white px-8 py-2.5 rounded-full font-semibold hover:bg-secondary transition text-sm uppercase">
                Comprar
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
