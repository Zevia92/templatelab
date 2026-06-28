'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, ShieldCheck, ArrowUp } from 'lucide-react'
import styles from './PricingCard.module.css'

const TIERS = ['starter', 'pro', 'unlimited']

export default function PricingCard({ name, price, description, features, cta, priceId, badge, highlighted, currentPlan }) {
  const router = useRouter()
  const [checking, setChecking] = useState(false)

  const slug = name.toLowerCase()
  const currentTier = currentPlan ? TIERS.indexOf(currentPlan) : -1
  const thisTier = TIERS.indexOf(slug)

  let relation = 'none'
  if (currentPlan && thisTier === currentTier) relation = 'same'
  else if (currentPlan && thisTier < currentTier) relation = 'below'
  else if (currentPlan && thisTier > currentTier) relation = 'above'

  if (relation === 'same') {
    return (
      <div className={`${styles.card} ${styles.currentCard}`}>
        <span className={styles.currentBadge}>Votre offre actuelle</span>
        <div className={styles.header}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.desc}>{description}</p>
        </div>
        <div className={styles.price}>
          <span className={styles.amount}>{price.toFixed(2).replace('.', ',')}</span>
          <span className={styles.currency}>€<span>/mois</span></span>
        </div>
        <ul className={styles.features}>
          {features.map((f) => (
            <li key={f}>
              <Check size={16} className={styles.check} />
              {f}
            </li>
          ))}
        </ul>
        <button disabled className={`${styles.btn} ${styles.btnCurrent}`}>
          <ShieldCheck size={16} /> Abonné
        </button>
      </div>
    )
  }

  if (relation === 'below') {
    return (
      <div className={`${styles.card} ${styles.disabledCard}`}>
        {badge && <span className={styles.badge}>{badge}</span>}
        <div className={styles.header}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.desc}>{description}</p>
        </div>
        <div className={styles.price}>
          <span className={styles.amount}>{price.toFixed(2).replace('.', ',')}</span>
          <span className={styles.currency}>€<span>/mois</span></span>
        </div>
        <ul className={styles.features}>
          {features.map((f) => (
            <li key={f}>
              <Check size={16} className={styles.check} />
              {f}
            </li>
          ))}
        </ul>
        <button disabled className={`${styles.btn} ${styles.btnDisabled}`}>
          Offre inférieure
        </button>
      </div>
    )
  }

  async function handleClick() {
    setChecking(true)

    try {
      const res = await fetch('/api/auth/me')
      const data = await res.json()

      if (!data.user) {
        router.push(`/signup?plan=${slug}`)
        return
      }

      const params = new URLSearchParams({
        priceId,
        name,
        price: price.toFixed(2).replace('.', ','),
        features: features.join(','),
      })
      router.push(`/checkout?${params.toString()}`)
    } catch {
      router.push(`/signup?plan=${slug}`)
    }
  }

  const buttonLabel = relation === 'above' ? `Passer à ${name} ` : cta

  return (
    <div className={`${styles.card} ${highlighted ? styles.highlighted : ''}`}>
      {badge && <span className={styles.badge}>{badge}</span>}
      <div className={styles.header}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.desc}>{description}</p>
      </div>
      <div className={styles.price}>
        <span className={styles.amount}>{price.toFixed(2).replace('.', ',')}</span>
        <span className={styles.currency}>€<span>/mois</span></span>
      </div>
      <ul className={styles.features}>
        {features.map((f) => (
          <li key={f}>
            <Check size={16} className={styles.check} />
            {f}
          </li>
        ))}
      </ul>
      <button onClick={handleClick} disabled={checking} className={`${styles.btn} ${highlighted ? styles.btnPrimary : ''}`}>
        {checking ? '...' : buttonLabel}{relation === 'above' && <ArrowUp size={16} />}
      </button>
    </div>
  )
}
