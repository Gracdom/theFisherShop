import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import EntryPopup from '@/components/EntryPopup'
import CartEmailPopup from '@/components/CartEmailPopup'
import FloatingButtons from '@/components/FloatingButtons'
import { CartProvider } from '@/context/CartContext'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Escamar Pesca - Equipamiento de pesca profesional',
  description: 'Tu tienda online de confianza para todo tipo de equipo de pesca. Calidad profesional al mejor precio.',
  icons: {
    icon: '/favicon.webp',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.webp" type="image/webp" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-T4BQS24J');`}
        </Script>
      </head>
      <body className={inter.className}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T4BQS24J"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <CartProvider>
          <Header />
          <main className="min-h-screen pt-24">
            {children}
          </main>
          <Footer />
          <EntryPopup />
          <CartEmailPopup />
          <FloatingButtons />
        </CartProvider>
        <Script id="zoho-init" strategy="beforeInteractive">
          {`window.$zoho=window.$zoho||{};$zoho.salesiq=$zoho.salesiq||{ready:function(){}}`}
        </Script>
        <Script
          id="zsiqscript"
          src="https://salesiq.zohopublic.eu/widget?wc=siq45ca2ee213a30162bc0b1cd88d271ebca1e8b1b631be7969995062c80d04bfa95c8dcf3a8994897cd11ade72f04cc865"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
