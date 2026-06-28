import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(request) {
  try {
    const { priceId } = await request.json()

    if (!priceId) {
      return Response.json({ error: 'priceId requis' }, { status: 400 })
    }

    const origin = request.headers.get('origin') || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#offres`,
    })

    return Response.json({ url: session.url })
  } catch (err) {
    console.error('create-checkout error:', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}
