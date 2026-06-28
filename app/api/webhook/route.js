import Stripe from 'stripe'
import { createAdminClient } from '@/lib/supabase-admin.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  let event

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret)
  } catch (err) {
    console.error('webhook signature error:', err.message)
    return Response.json({ error: err.message }, { status: 400 })
  }

  const supabase = createAdminClient()

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object
      const userId = session.client_reference_id
      const subId = session.subscription
      const customerId = session.customer

      if (!subId || !userId) break

      const subscription = await stripe.subscriptions.retrieve(subId)

      const planMap = {}
      for (const item of subscription.items.data) {
        const priceId = item.price.id
        if (priceId.includes('TmwzI')) planMap[priceId] = 'starter'
        else if (priceId.includes('Tmx3Y')) planMap[priceId] = 'pro'
        else if (priceId.includes('Tmx5y')) planMap[priceId] = 'unlimited'
      }

      const plan = planMap[subscription.items.data[0]?.price?.id] || 'starter'

      await supabase.from('subscriptions').upsert({
        user_id: userId,
        stripe_customer_id: customerId,
        stripe_subscription_id: subId,
        plan,
        status: subscription.status,
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      }, {
        onConflict: 'stripe_subscription_id',
      })

      break
    }

    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      const sub = event.data.object

      await supabase
        .from('subscriptions')
        .update({
          status: sub.status,
          current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
        })
        .eq('stripe_subscription_id', sub.id)

      break
    }

    default:
      console.log('unhandled event:', event.type)
  }

  return Response.json({ received: true })
}
