import { LayoutTemplate } from 'lucide-react'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <div className={styles.logo}>
            <LayoutTemplate size={20} />
            <span>TemplateLab</span>
          </div>
          <p className={styles.tagline}>
            Des templates premium en illimité pour les créateurs.
          </p>
        </div>
        <div className={styles.links}>
          <div className={styles.col}>
            <h4>Produit</h4>
            <a href="#offres">Offres</a>
            <a href="#features">Fonctionnalités</a>
            <a href="#">Catalogue</a>
          </div>
          <div className={styles.col}>
            <h4>Légal</h4>
            <a href="#">CGV</a>
            <a href="#">Confidentialité</a>
            <a href="#">Mentions légales</a>
          </div>
          <div className={styles.col}>
            <h4>Assistance</h4>
            <a href="#">Contact</a>
            <a href="#">FAQ</a>
            <a href="#">Documentation</a>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} TemplateLab. Tous droits réservés.</p>
      </div>
    </footer>
  )
}
