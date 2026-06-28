import { Palette, RefreshCw, Infinity, Smartphone, XCircle, Sparkles } from 'lucide-react'
import styles from './Features.module.css'

const items = [
  {
    icon: <Palette size={24} />,
    title: 'Design soigné',
    desc: 'Chaque template est conçu par des designers professionnels. Pas de remplissage, que du contenu utile.',
  },
  {
    icon: <RefreshCw size={24} />,
    title: 'Mis à jour chaque semaine',
    desc: 'Du contenu frais toutes les semaines. Vous avez toujours accès aux dernières tendances et formats.',
  },
  {
    icon: <Infinity size={24} />,
    title: 'Accès illimité',
    desc: 'Téléchargez autant de templates que vous voulez. Pas de limite, pas de coût caché.',
  },
  {
    icon: <Smartphone size={24} />,
    title: 'Multi-formats',
    desc: 'Notion, Figma, Web, Canva, Google Docs — tout ce dont vous avez besoin au même endroit.',
  },
  {
    icon: <XCircle size={24} />,
    title: 'Sans engagement',
    desc: 'Annulez à tout moment en un clic. Pas de contrat, pas de frais de résiliation.',
  },
  {
    icon: <Sparkles size={24} />,
    title: 'Nouveautés exclusives',
    desc: 'Les abonnés Pro et Unlimited ont accès aux templates en avant-première.',
  },
]

export default function Features() {
  return (
    <section id="features" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>Tout ce dont vous avez besoin pour créer</h2>
          <p className={styles.subtitle}>
            Une bibliothèque complète de templates, conçue pour les créateurs, les entrepreneurs et les équipes.
          </p>
        </div>
        <div className={styles.grid}>
          {items.map((item) => (
            <div key={item.title} className={styles.card}>
              <div className={styles.icon}>{item.icon}</div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
