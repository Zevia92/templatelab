import Stripe from 'stripe'
import { createAdminClient } from '@/lib/supabase-admin.js'
import { PRICES } from '@/lib/prices.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET
const yggflixWebhookUrl = process.env.YGGFLLX_WEBHOOK_URL
const yggflixApiSecret = process.env.YGGFLLX_API_SECRET

async function forwardToYggflix(eventType, subscription, clientRefId) {
  if (!yggflixWebhookUrl || !yggflixApiSecret) return
  const res = await fetch(yggflixWebhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': yggflixApiSecret,
    },
    body: JSON.stringify({ 'event-type': eventType, subscription, client_reference_id: clientRefId }),
  })
  if (!res.ok) console.error('YggFlix webhook forward failed:', res.status, await res.text())
}

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
      try {
        const session = event.data.object
        const userId = session.client_reference_id
        const subId = session.subscription
        const customerId = session.customer

        if (!subId) break

        // Vérifier si l'utilisateur existe dans Supabase (TemplateLab)
        let existingUser = null
        try {
          const { data } = await supabase
            .from('users')
            .select('id')
            .eq('id', userId)
            .maybeSingle()
          existingUser = data
        } catch {}

        const subscription = await stripe.subscriptions.retrieve(subId)

        if (!existingUser) {
          // Client YggFlix → désactiver emails Stripe + forwarder
          if (customerId) {
            await stripe.customers.update(customerId, {
              invoice_settings: { email_settings: { enabled: false } },
            }).catch(() => {})
          }
          await forwardToYggflix(event.type, subscription, session.client_reference_id)
          break
        }

        // Client TemplateLab → écrire dans Supabase
        const planMap = {}
        const priceToPlan = Object.entries(PRICES).reduce((acc, [plan, id]) => {
          if (id) acc[id] = plan
          return acc
        }, {})
        for (const item of subscription.items.data) {
          const priceId = item.price.id
          if (priceToPlan[priceId]) planMap[priceId] = priceToPlan[priceId]
        }

        const plan = planMap[subscription.items.data[0]?.price?.id] || 'starter'

        const periodEnd = subscription.current_period_end
          ? new Date(subscription.current_period_end * 1000).toISOString()
          : null

        const { error } = await supabase.from('subscriptions').upsert({
          user_id: userId,
          stripe_customer_id: customerId,
          stripe_subscription_id: subId,
          plan,
          status: subscription.status,
          current_period_end: periodEnd,
        }, { onConflict: 'stripe_subscription_id' })

        if (error) throw error
      } catch (err) {
        console.error('checkout.session.completed error:', err)
        return Response.json({ error: err.message }, { status: 500 })
      }
      break
    }

    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      try {
        const sub = event.data.object

        // Vérifier si l'abonnement existe dans Supabase (TemplateLab)
        const { data: existingSub } = await supabase
          .from('subscriptions')
          .select('id')
          .eq('stripe_subscription_id', sub.id)
          .maybeSingle()

        if (!existingSub) {
          // Client YggFlix → forwarder
          await forwardToYggflix(event.type, sub, null)
          break
        }

        // Client TemplateLab → mettre à jour Supabase
        const periodEnd = sub.current_period_end
          ? new Date(sub.current_period_end * 1000).toISOString()
          : null
        const { error } = await supabase
          .from('subscriptions')
          .update({ status: sub.status, current_period_end: periodEnd })
          .eq('stripe_subscription_id', sub.id)

        if (error) throw error
      } catch (err) {
        console.error('subscription update error:', err)
        return Response.json({ error: err.message }, { status: 500 })
      }
      break
    }

    default:
      console.log('unhandled event:', event.type)
  }

  return Response.json({ received: true })
}
