'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LayoutTemplate, LogOut, User } from 'lucide-react'
import styles from './Navbar.module.css'

export default function Navbar() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((data) => {
        if (data.user) setUser(data.user)
        setLoaded(true)
      })
  }, [])

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    setUser(null)
    router.push('/')
    router.refresh()
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <LayoutTemplate size={24} />
          <span>TemplateLab</span>
        </Link>
        <div className={styles.links}>
          <Link href="/">Accueil</Link>
          <Link href="/catalogue">Catalogue</Link>
          <Link href="/#offres">Offres</Link>
          {loaded && user ? (
            <>
              <Link href="/dashboard" className={styles.userBtn}>
                <User size={16} />
                {user.name || user.email}
              </Link>
              <button onClick={handleLogout} className={`${styles.btn} ${styles.btnGhost}`}>
                <LogOut size={16} />
              </button>
            </>
          ) : loaded && !user ? (
            <>
              <Link href="/login" className={`${styles.btn} ${styles.btnGhost}`}>Connexion</Link>
              <Link href="/signup" className={`${styles.btn} ${styles.btnPrimary}`}>S'inscrire</Link>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  )
}
