import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import styles from './success.module.css'

export default function SuccessPage() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <CheckCircle size={48} className={styles.icon} />
        <h1 className={styles.title}>Abonnement activé !</h1>
        <p className={styles.text}>
          Merci pour votre souscription. Vous avez désormais accès à tous vos templates premium.
        </p>
        <Link href="/" className={styles.btn}>
          Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}
