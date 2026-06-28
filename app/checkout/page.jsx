'use client'

import { useEffect, useRef, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import { Check, ArrowLeft, Shield } from 'lucide-react'
import Link from 'next/link'
import styles from './checkout.module.css'

function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const containerRef = useRef(null)
  const checkoutRef = useRef(null)
  const [status, setStatus] = useState('loading')

  const priceId = searchParams.get('priceId')
  const name = searchParams.get('name') || 'Abonnement'
  const price = searchParams.get('price') || '—'
  const features = searchParams.get('features')?.split(',') || []

  useEffect(() => {
    if (!priceId) {
      router.push('/#offres')
      return
    }

    let cancelled = false

    async function init() {
      const me = await fetch('/api/auth/me').then((r) => r.json())

      const res = await fetch('/api/create-embedded-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId,
          clientReferenceId: me.user?.id || null,
        }),
      })
      const data = await res.json()
      if (cancelled) return

      if (!data.clientSecret) {
        throw new Error(data.error || 'Pas de client_secret')
      }

      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
      if (cancelled) return

      const page = await stripe.createEmbeddedCheckoutPage({
        clientSecret: data.clientSecret,
      })
      if (cancelled) { page.destroy(); return }

      if (containerRef.current && containerRef.current.children.length === 0) {
        checkoutRef.current = page
        page.mount(containerRef.current)
        setStatus('ready')
      } else {
        page.destroy()
      }
    }

    init().catch((err) => {
      if (!cancelled) {
        console.error('Erreur checkout:', err)
        setStatus('error')
      }
    })

    return () => {
      cancelled = true
      if (checkoutRef.current) {
        checkoutRef.current.destroy()
        checkoutRef.current = null
      }
    }
  }, [priceId, router])

  if (!priceId) return null

  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        <div className={styles.recap}>
          <Link href="/#offres" className={styles.back}>
            <ArrowLeft size={16} /> Retour
          </Link>

          <div className={styles.recapCard}>
            <h2 className={styles.recapTitle}>Récapitulatif</h2>
            <h3 className={styles.planName}>{name}</h3>
            <div className={styles.priceRow}>
              <span className={styles.priceAmount}>{price} €</span>
              <span className={styles.pricePeriod}>/mois</span>
            </div>

            {features.length > 0 && (
              <ul className={styles.features}>
                {features.map((f) => (
                  <li key={f}>
                    <Check size={14} className={styles.check} /> {f}
                  </li>
                ))}
              </ul>
            )}

            <div className={styles.secured}>
              <Shield size={14} />
              Paiement sécurisé par Stripe
            </div>
          </div>
        </div>

        <div className={styles.form}>
          {status === 'loading' && (
            <div className={styles.loading}>
              <div className={styles.spinner} />
              <p>Préparation du paiement…</p>
            </div>
          )}
          {status === 'error' && (
            <div className={styles.error}>
              <p>Une erreur est survenue.</p>
              <Link href="/#offres" className={styles.retry}>Réessayer</Link>
            </div>
          )}
          <div ref={containerRef} className={status === 'ready' ? styles.visible : styles.hidden} />
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutContent />
    </Suspense>
  )
}
