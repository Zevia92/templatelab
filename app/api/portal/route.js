import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(request) {
  try {
    const { sessionId } = await request.json()

    if (!sessionId) {
      return Response.json({ error: 'sessionId requis' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId)

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: session.customer,
      return_url: request.headers.get('origin') || 'http://localhost:3000',
    })

    return Response.json({ url: portalSession.url })
  } catch (err) {
    console.error('portal error:', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}
