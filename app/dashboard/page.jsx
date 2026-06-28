'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import templates from '@/lib/templates.js'
import styles from './dashboard.module.css'

export default function DashboardPage() {
  const router = useRouter()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((res) => {
        if (!res.user) {
          router.push('/login')
          return
        }
        setData(res)
        setLoading(false)
      })
  }, [router])

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <p>Chargement…</p>
        </div>
      </div>
    )
  }

  const sub = data.subscription

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Mon compte</h1>
        <p className={styles.email}>{data.user.email}</p>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Abonnement</h2>
          {sub ? (
            <>
              <span className={styles.active}>● Actif</span>
              <p className={styles.planName}>
                {sub.plan === 'starter' && 'TemplateLab Starter'}
                {sub.plan === 'pro' && 'TemplateLab Pro'}
                {sub.plan === 'unlimited' && 'TemplateLab Unlimited'}
              </p>
              <p className={styles.planMeta}>
                {sub.current_period_end
                  ? `Renouvellement le ${new Date(sub.current_period_end).toLocaleDateString('fr-FR')}`
                  : 'Abonnement actif'}
              </p>
            </>
          ) : (
            <div className={styles.noSub}>
              <p>Vous n'avez pas encore d'abonnement actif.</p>
              <Link href="/#offres" className={styles.btn}>Voir les offres</Link>
            </div>
          )}
        </div>

        {sub && (
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Templates récents</h2>
            <div className={styles.grid}>
              {templates.slice(0, 6).map((t) => (
                <div key={t.id} className={styles.templateCard}>
                  <div>
                    <p className={styles.templateName}>{t.name}</p>
                    <p className={styles.templateFormat}>{t.format}</p>
                  </div>
                  <button className={styles.downloadBtn}>↓</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
