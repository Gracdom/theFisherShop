import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14.0.0'
import { corsHeaders } from '../_shared/cors.ts'

const SHIPPING_COST = 6.0
const IVA_RATE = 0.21

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')
  const appUrl = Deno.env.get('APP_URL') || 'http://localhost:3000'
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

  if (!stripeKey) {
    return new Response(JSON.stringify({ error: 'Stripe no configurado' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  try {
    const { items, customerInfo } = await req.json()
    const subtotal = items.reduce(
      (sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity,
      0
    )
    const iva = subtotal * IVA_RATE
    const total = subtotal + iva + SHIPPING_COST

    const lineItems = items.map((item: { name: string; price: number; quantity: number }) => ({
      price_data: {
        currency: 'eur',
        product_data: { name: item.name, description: `Producto de pesca - ${item.name}` },
        unit_amount: Math.round(item.price * (1 + IVA_RATE) * 100),
      },
      quantity: item.quantity,
    }))
    lineItems.push({
      price_data: {
        currency: 'eur',
        product_data: {
          name: 'Envío',
          description: 'Envío estándar a España peninsular (24-48h)',
        },
        unit_amount: Math.round(SHIPPING_COST * 100),
      },
      quantity: 1,
    })

    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    const email = String(customerInfo.email).trim().toLowerCase()

    let { data: customer } = await supabase.from('Customer').select('id').eq('email', email).single()
    if (!customer) {
      const { data: newCustomer, error: createErr } = await supabase
        .from('Customer')
        .insert({
          email,
          name: customerInfo.name,
          phone: customerInfo.phone || null,
          address: customerInfo.address || null,
          city: customerInfo.city || null,
          postalCode: customerInfo.postalCode || null,
        })
        .select('id')
        .single()
      if (createErr) throw createErr
      customer = newCustomer
    }

    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    const emailEnc = encodeURIComponent(customerInfo.email)
    const phoneEnc = encodeURIComponent((customerInfo.phone || '').trim())
    const successUrl = `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}&transaction_id=${orderNumber}&value=${total.toFixed(2)}&currency=EUR&email=${emailEnc}&phone=${phoneEnc}`

    const stripe = new Stripe(stripeKey, { apiVersion: '2024-11-20.acacia' })
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: `${appUrl}/checkout`,
      customer_email: customerInfo.email,
      payment_intent_data: {
        description: 'The Fisher Shop - Compra',
      },
      metadata: {
        customerName: customerInfo.name,
        address: customerInfo.address,
        city: customerInfo.city,
        postalCode: customerInfo.postalCode,
        phone: customerInfo.phone || '',
        orderNumber,
        customerId: customer!.id,
      },
      shipping_address_collection: { allowed_countries: ['ES', 'PT', 'FR', 'IT', 'US', 'GB'] },
    })

    const orderId = crypto.randomUUID()

    const { data: order, error: orderErr } = await supabase
      .from('Order')
      .insert({
        id: orderId,
        orderNumber,
        customerId: customer!.id,
        total,
        stripeSessionId: session.id,
        paymentStatus: 'pending',
        status: 'PENDING',
        shippingAddress: customerInfo.address,
        shippingCity: customerInfo.city,
        shippingZip: customerInfo.postalCode,
      })
      .select('id')
      .single()
    if (orderErr) throw orderErr

    const orderItems = items.map((item: { id: string; quantity: number; price: number }) => ({
      orderId: orderId,
      productId: item.id,
      quantity: item.quantity,
      price: item.price,
    }))
    const { error: itemsErr } = await supabase.from('OrderItem').insert(orderItems)
    if (itemsErr) throw itemsErr

    return new Response(JSON.stringify({ sessionId: session.id, orderNumber }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err: any) {
    const errorMsg = err?.message || JSON.stringify(err, null, 2)

    console.error('Error REAL procesando checkout:', errorMsg)
    if (typeof err === 'object') {
      console.error('Detalles crudos del error:', err)
    }

    return new Response(JSON.stringify({ error: errorMsg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
