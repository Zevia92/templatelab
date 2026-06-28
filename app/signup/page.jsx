'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { LayoutTemplate, Loader } from 'lucide-react'
import styles from './auth.module.css'

function SignupForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Erreur lors de l\'inscription')
      }

      const plan = searchParams.get('plan')
      if (plan) {
        router.push(`/checkout?plan=${plan}`)
      } else {
        router.push('/dashboard')
      }
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <Link href="/" className={styles.logo}>
          <LayoutTemplate size={24} />
          <span>TemplateLab</span>
        </Link>
        <h1 className={styles.title}>Créer un compte</h1>
        <p className={styles.subtitle}>Pour accéder à vos templates et gérer votre abonnement.</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="name">Nom</label>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Votre nom" />
          </div>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="vous@exemple.fr" />
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Mot de passe</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} placeholder="Minimum 6 caractères" />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.btn} disabled={loading}>
            {loading ? <Loader size={18} className={styles.spinner} /> : 'Créer mon compte'}
          </button>
        </form>

        <p className={styles.switch}>
          Déjà un compte ? <Link href="/login">Se connecter</Link>
        </p>
      </div>
    </div>
  )
}

export default function SignupPage() {
  return (
    <Suspense fallback={null}>
      <SignupForm />
    </Suspense>
  )
}
