import { ArrowRight, Sparkles } from 'lucide-react'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.bg} />
      <div className={styles.content}>
        <div className={styles.badge}>
          <Sparkles size={14} />
          Templates premium — abonnement mensuel
        </div>
        <h1 className={styles.title}>
          Créez plus vite avec<br />
          <span className={styles.gradient}>des templates premium</span>
        </h1>
        <p className={styles.subtitle}>
          Accédez à une bibliothèque illimitée de templates soigneusement conçus
          pour Notion, Figma, le web et plus. Mis à jour chaque semaine.
        </p>
        <div className={styles.actions}>
          <a href="#offres" className={styles.btnPrimary}>
            Voir les offres
            <ArrowRight size={18} />
          </a>
          <a href="#features" className={styles.btnSecondary}>
            En savoir plus
          </a>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>2 400+</span>
            <span className={styles.statLabel}>templates</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>12 000+</span>
            <span className={styles.statLabel}>créateurs</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>4.9★</span>
            <span className={styles.statLabel}>avis clients</span>
          </div>
        </div>
      </div>
    </section>
  )
}
