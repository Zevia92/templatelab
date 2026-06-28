'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check } from 'lucide-react'
import styles from './PricingCard.module.css'

export default function PricingCard({ name, price, description, features, cta, priceId, badge, highlighted }) {
  const router = useRouter()
  const [checking, setChecking] = useState(false)

  async function handleClick() {
    setChecking(true)

    try {
      const res = await fetch('/api/auth/me')
      const data = await res.json()

      if (!data.user) {
        router.push(`/signup?plan=${name.toLowerCase()}`)
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
      router.push(`/signup?plan=${name.toLowerCase()}`)
    }
  }

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
        {checking ? '...' : cta}
      </button>
    </div>
  )
}
