export interface ProjectAsset {
  label: string;
  href: string;
}

export interface Project {
  code: string;
  title: string;
  year: string;
  summary: string;
  metric: string;
  tags: string[];
  coverImage: string;
  assets: ProjectAsset[];
}

export const projects: Project[] = [
  {
    code: 'PRJ-01',
    title: 'ZEIFIR — Lanzamiento de marca de perfumería',
    year: '2025',
    summary:
      'Fundación y lanzamiento de una marca de perfumería: pricing, inventarios de importación, calendario de contenido en TikTok y piezas de campaña.',
    metric: '88% margen bruto sostenido',
    tags: ['Estrategia de marca', 'Growth', 'Pricing', 'Contenido'],
    coverImage: '/images/prj-01-cover.png',
    assets: [
      { label: 'Catálogo ZEIFIR', href: '/docs/zeifir-catalogo.pdf' },
      { label: 'Calendario de contenido TikTok', href: '/docs/zeifir-contenido-tiktok.pdf' },
      { label: 'Piezas de campaña', href: '/docs/zeifir-posts-productos.pdf' },
    ],
  },
  {
    code: 'PRJ-02',
    title: 'VINTAGE — Estrategia de marca y carta',
    year: '2026',
    summary:
      'Plan de negocio y posicionamiento premium para una discoteca (NSE A/B, Andahuaylas): estrategia de zonificación de densidad y una carta diseñada con ingeniería de precios.',
    metric: 'Posicionamiento premium NSE A/B',
    tags: ['Posicionamiento', 'Pricing psicológico', 'Menú'],
    coverImage: '/images/prj-02-cover.png',
    assets: [
      { label: 'Plan de negocio', href: '/docs/vintage-plan-de-negocio.pdf' },
      { label: 'Carta de cócteles', href: '/docs/vintage-carta.pdf' },
    ],
  },
  {
    code: 'PRJ-03',
    title: 'Estrategia Comercial — Sastrería Barrington',
    year: '2026',
    summary:
      'Objetivos comerciales y segmentación de clientes para una sastrería: crecimiento en ventas, utilidad neta, ticket promedio y reducción del costo de adquisición.',
    metric: '+30% ventas objetivo · -40% CAC objetivo',
    tags: ['Estrategia comercial', 'Segmentación', 'KPIs'],
    coverImage: '/images/prj-03-cover.png',
    assets: [
      { label: 'Estrategia comercial completa', href: '/docs/estrategia-comercial-barrington.pdf' },
    ],
  },
];
