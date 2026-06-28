'use client'

import { useState, useMemo } from 'react'
import TemplateCard from './TemplateCard.jsx'
import templates, { categories } from '@/lib/templates.js'
import styles from './TemplateGrid.module.css'

export default function TemplateGrid() {
  const [active, setActive] = useState('Tout')

  const filtered = useMemo(() => {
    if (active === 'Tout') return templates
    return templates.filter((t) => t.category === active)
  }, [active])

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Catalogue de templates</h2>
        <p className={styles.subtitle}>
          {'Tout le contenu disponible dans votre abonnement.'}
        </p>
      </div>

      <div className={styles.filters}>
        <button
          className={`${styles.filter} ${active === 'Tout' ? styles.filterActive : ''}`}
          onClick={() => setActive('Tout')}
        >
          Tout
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`${styles.filter} ${active === cat ? styles.filterActive : ''}`}
            onClick={() => setActive(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {filtered.map((t) => (
          <TemplateCard key={t.id} template={t} />
        ))}
      </div>

      <p className={styles.count}>{filtered.length} template{filtered.length > 1 ? 's' : ''}</p>
    </section>
  )
}
