import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)

  try {
    const body = await req.json()
    const { email, name, items } = body

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Email no válido' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: 'Carrito vacío' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const normalizedEmail = email.trim().toLowerCase()
    const cartItems = items.map((i: { id?: string; name?: string; price?: number; quantity?: number }) => ({
      id: i.id ?? '',
      name: i.name ?? 'Producto',
      price: Number(i.price) || 0,
      quantity: Number(i.quantity) || 1,
    }))
    const total = cartItems.reduce((sum: number, i: { price: number; quantity: number }) => sum + i.price * i.quantity, 0)

    const { data: recent } = await supabase
      .from('AbandonedCart')
      .select('createdAt')
      .eq('email', normalizedEmail)
      .order('createdAt', { ascending: false })
      .limit(1)
      .single()

    if (recent) {
      const created = new Date(recent.createdAt).getTime()
      if (Date.now() - created < 30 * 60 * 1000) {
        return new Response(JSON.stringify({ ok: true }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
    }

    await supabase.from('AbandonedCart').insert({
      email: normalizedEmail,
      name: name && String(name).trim() ? String(name).trim() : null,
      items: cartItems,
      total,
    })

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
