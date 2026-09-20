export interface ScoreboardMetric {
  value: string;
  label: string;
}

export interface Discipline {
  title: string;
  description: string;
}

export interface FichaItem {
  label: string;
  value: string;
}

export const profile = {
  name: 'Johaquin Sierra',
  role: 'Marketing & Growth',
  location: 'Lima, Perú',
  headline: 'Construyo marcas y las hago crecer con datos.',
  bio: 'Egresado de Administración y Negocios del Deporte (UPC). Combina la disciplina del deporte competitivo (selección de atletismo y fútbol) con analítica y creatividad para lanzar marcas, producir contenido y convertirlo en ventas.',
  scoreboard: [
    { value: '+88%', label: 'Margen bruto sostenido (ZEIFIR)' },
    { value: '+95%', label: 'Crecimiento de facturación mensual (HS Europa Sport)' },
    { value: '+25%', label: 'Sobre el récord anual de ventas en 60 días' },
  ] as ScoreboardMetric[],
  disciplines: [
    {
      title: 'Growth marketing',
      description: 'Crecimiento orgánico y contenido para vender sin depender de pauta masiva.',
    },
    {
      title: 'Creación de contenido',
      description: 'Piezas gráficas y audiovisuales con Canva, DaVinci Resolve y CapCut.',
    },
    {
      title: 'Analítica y datos',
      description: 'Métricas e indicadores con modelado financiero en Excel y Power BI.',
    },
    {
      title: 'Gestión de marca',
      description: 'Posicionamiento, propuesta de valor y estructura de precios.',
    },
  ] as Discipline[],
  ficha: [
    { label: 'Formación', value: 'Administración y Negocios del Deporte — UPC' },
    {
      label: 'Especializaciones',
      value: 'Marketing Deportivo · Marketing Estratégico · Analítica Digital',
    },
    { label: 'Herramientas', value: 'Excel · Power BI · Canva · DaVinci Resolve · CapCut' },
    { label: 'Idiomas', value: 'Español · Inglés (avanzado) · Francés (básico)' },
    { label: 'Deporte', value: 'Selección de atletismo UPC · Fútbol distrital' },
  ] as FichaItem[],
  contentEvidence: {
    label: 'Ver seguimiento de contenido',
    href: '/docs/marca-personal-contenido.pdf',
  },
  contact: {
    email: 'jsq2908@gmail.com',
    phone: '963 507 814',
    linkedin: '#',
  },
};
