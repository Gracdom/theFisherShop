export default function Hero() {
  return (
    <section className="relative min-h-[500px] lg:min-h-[650px] flex items-center justify-center overflow-hidden -mt-24 pt-24"
      style={{
        backgroundImage: 'url("/images/banner.webp")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
      
      {/* Overlay muy sutil */}
      <div className="absolute inset-0 bg-black/10"></div>
      
      <div className="relative z-10 text-center px-4 max-w-5xl">
        {/* Título principal en blanco */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold mb-8 uppercase text-white"
          style={{
            textShadow: '4px 4px 8px rgba(0,0,0,0.8)',
            fontWeight: 900,
            letterSpacing: '0.02em',
            lineHeight: '1.1'
          }}>
          Hasta 15% de ahorro
        </h1>
        
        {/* Subtítulo con fondo azul */}
        <div className="inline-block bg-secondary px-12 py-4 mb-10 shadow-2xl">
          <p className="text-white text-xl md:text-2xl font-semibold tracking-wide">
            En carretes y cañas seleccionados
          </p>
        </div>
        
        {/* Banner promocional azul con forma especial */}
        <div className="flex justify-center">
          <div className="relative inline-block">
            <div className="bg-primary text-white px-12 py-4 font-bold text-lg tracking-widest shadow-2xl uppercase"
              style={{
                clipPath: 'polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)',
              }}>
              CÓDIGO: PESCA15
            </div>
          </div>
        </div>
      </div>
      
      {/* Botón de chat flotante */}
      <button className="fixed bottom-8 right-8 w-16 h-16 bg-primary/90 backdrop-blur rounded-full flex items-center justify-center shadow-2xl hover:bg-secondary transition z-50 border-2 border-secondary">
        <i className="fas fa-comments text-white text-2xl"></i>
      </button>
    </section>
  )
}
