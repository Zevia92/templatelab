const categories = ['Notion', 'Figma', 'Web', 'Canva']

const templates = [
  // ── Notion ──
  { id: 'notion-01', name: 'Dashboard Pro', category: 'Notion', format: 'Notion', description: 'Dashboard complet pour piloter vos projets, tâches et objectifs.' },
  { id: 'notion-02', name: 'Habit Tracker', category: 'Notion', format: 'Notion', description: 'Suivez vos habitudes quotidiennes avec des graphiques automatiques.' },
  { id: 'notion-03', name: 'CRM Simplifié', category: 'Notion', format: 'Notion', description: 'Base CRM pour gérer vos prospects, clients et relances.' },
  { id: 'notion-04', name: 'Base de Connaissances', category: 'Notion', format: 'Notion', description: 'Wiki d\'équipe pour centraliser docs, process et ressources.' },
  { id: 'notion-05', name: 'Gestion de Projet', category: 'Notion', format: 'Notion', description: 'Kanban, calendrier et timeline pour vos projets.' },
  { id: 'notion-06', name: 'Content Calendar', category: 'Notion', format: 'Notion', description: 'Planifiez vos publications réseaux sociaux et blog.' },
  { id: 'notion-07', name: 'Suivi Financier', category: 'Notion', format: 'Notion', description: 'Budget, dépenses, revenus et rapports automatiques.' },
  { id: 'notion-08', name: 'Travel Planner', category: 'Notion', format: 'Notion', description: 'Planifiez vos voyages : itinéraire, budget, liste.' },

  // ── Figma ──
  { id: 'figma-01', name: 'UI Kit Mobile', category: 'Figma', format: 'Figma', description: 'Kit complet d\'interface mobile avec 60+ composants.' },
  { id: 'figma-02', name: 'Wireframe Kit', category: 'Figma', format: 'Figma', description: '200+ wireframes pour prototyper vos apps et sites.' },
  { id: 'figma-03', name: 'Dashboard Analytics', category: 'Figma', format: 'Figma', description: 'Template dashboard avec graphiques et tableaux de bord.' },
  { id: 'figma-04', name: 'Landing Page Kit', category: 'Figma', format: 'Figma', description: 'Sections landing page : hero, features, témoignages.' },
  { id: 'figma-05', name: 'Design System Starter', category: 'Figma', format: 'Figma', description: 'Base de design system avec tokens et composants.' },
  { id: 'figma-06', name: 'Portfolio Template', category: 'Figma', format: 'Figma', description: 'Template portfolio créatif pour designers et artistes.' },
  { id: 'figma-07', name: 'Mobile App Onboarding', category: 'Figma', format: 'Figma', description: 'Écrans d\'onboarding pour applications mobiles.' },
  { id: 'figma-08', name: 'Email Newsletter', category: 'Figma', format: 'Figma', description: 'Template d\'email responsive pour campagnes.' },

  // ── Web ──
  { id: 'web-01', name: 'Startup Landing Page', category: 'Web', format: 'HTML + CSS', description: 'Landing page moderne pour startup tech.' },
  { id: 'web-02', name: 'Coming Soon', category: 'Web', format: 'HTML + CSS', description: 'Page d\'attente avec compteur et inscription.' },
  { id: 'web-03', name: 'Features Section', category: 'Web', format: 'HTML + CSS', description: 'Section features responsive avec grille et icônes.' },
  { id: 'web-04', name: 'Blog Template', category: 'Web', format: 'HTML + CSS', description: 'Template blog minimaliste avec sidebar.' },
  { id: 'web-05', name: 'Pricing Table', category: 'Web', format: 'HTML + CSS', description: 'Tableau de prix responsive avec toggle.' },
  { id: 'web-06', name: 'Portfolio Grid', category: 'Web', format: 'HTML + CSS', description: 'Galerie portfolio en masonry.' },
  { id: 'web-07', name: 'Contact Form', category: 'Web', format: 'HTML + CSS', description: 'Formulaire de contact avec validation.' },
  { id: 'web-08', name: 'Footer Collection', category: 'Web', format: 'HTML + CSS', description: '5 variantes de footer responsive.' },

  // ── Canva / Docs ──
  { id: 'canva-01', name: 'Pitch Deck Pro', category: 'Canva', format: 'Canva', description: 'Présentation investisseur complète, 12 slides.' },
  { id: 'canva-02', name: 'CV Moderne', category: 'Canva', format: 'Canva', description: 'CV design épuré avec photo et timeline.' },
  { id: 'canva-03', name: 'Post Instagram', category: 'Canva', format: 'Canva', description: 'Pack de 10 posts Instagram prêts à l\'emploi.' },
  { id: 'canva-04', name: 'Rapport Annuel', category: 'Canva', format: 'Canva', description: 'Template rapport annuel professionnel.' },
  { id: 'canva-05', name: 'Newsletter Email', category: 'Canva', format: 'Canva', description: 'Template newsletter au format email.' },
  { id: 'canva-06', name: 'Story Instagram', category: 'Canva', format: 'Canva', description: 'Animated stories pack pour réseaux sociaux.' },
  { id: 'canva-07', name: 'Business Card', category: 'Canva', format: 'Canva', description: 'Cartes de visite modernes, lots de 4 designs.' },
  { id: 'canva-08', name: 'Certificate Template', category: 'Canva', format: 'Canva', description: 'Certificat de formation ou achievement.' },
]

export default templates
export { categories }
