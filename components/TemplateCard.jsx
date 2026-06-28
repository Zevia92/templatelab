import styles from './TemplateCard.module.css'

const icons = {
  Notion: '📋',
  Figma: '🎨',
  Web: '🌐',
  Canva: '🖼',
}

const previewStyles = {
  Notion: styles.previewNotion,
  Figma: styles.previewFigma,
  Web: styles.previewWeb,
  Canva: styles.previewCanva,
}

export default function TemplateCard({ template }) {
  return (
    <div className={styles.card}>
      <div className={`${styles.preview} ${previewStyles[template.category]}`}>
        {icons[template.category]}
        <span className={styles.badge}>{template.category}</span>
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>{template.name}</h3>
        <p className={styles.desc}>{template.description}</p>
        <div className={styles.footer}>
          <span className={styles.format}>{template.format}</span>
          <a href="/#offres" className={styles.btn}>
            Télécharger
          </a>
        </div>
      </div>
    </div>
  )
}
