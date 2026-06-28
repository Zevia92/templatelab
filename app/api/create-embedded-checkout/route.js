import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(request) {
  try {
    const { priceId, clientReferenceId } = await request.json()

    if (!priceId) {
      return Response.json({ error: 'priceId requis' }, { status: 400 })
    }

    const origin = request.headers.get('origin') || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      ui_mode: 'embedded',
      client_reference_id: clientReferenceId,
      return_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    })

    return Response.json({ clientSecret: session.client_secret })
  } catch (err) {
    console.error('create-embedded-checkout error:', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}
