import PricingCard from './PricingCard.jsx'
import { PRICES } from '@/lib/prices.js'
import styles from './PricingSection.module.css'

const plans = [
  {
    name: 'Starter',
    price: 7.99,
    description: 'Pour démarrer avec l\'essentiel',
    features: [
      '50 templates premium',
      'Mises à jour mensuelles',
      'Formats Notion & Figma',
      'Support par email',
    ],
    cta: 'Choisir Starter',
    priceId: PRICES.starter,
  },
  {
    name: 'Pro',
    price: 14.99,
    description: 'Pour les créateurs réguliers',
    features: [
      'Accès illimité à tout le catalogue',
      'Mises à jour hebdomadaires',
      'Tous les formats (Notion, Figma, Web)',
      'Support prioritaire',
      'Nouveautés en avant-première',
    ],
    cta: 'Choisir Pro',
    priceId: PRICES.pro,
    badge: 'Populaire',
    highlighted: true,
  },
  {
    name: 'Unlimited',
    price: 21.99,
    description: 'Pour les pros et équipes',
    features: [
      'Tout ce qui est inclus dans Pro',
      'Templates exclusifs Unlimited',
      'Accès anticipé aux nouveautés',
      'Support VIP sous 2h',
      'Templates sur mesure (2/mois)',
    ],
    cta: 'Choisir Unlimited',
    priceId: PRICES.unlimited,
  },
]

export default function PricingSection() {
  return (
    <section id="offres" className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Un abonnement, des milliers de templates</h2>
        <p className={styles.subtitle}>
          Pas d'engagement. Annulez à tout moment. Tous les prix sont en euros, mensuels.
        </p>
      </div>
      <div className={styles.grid}>
        {plans.map((plan) => (
          <PricingCard key={plan.name} {...plan} />
        ))}
      </div>
    </section>
  )
}
