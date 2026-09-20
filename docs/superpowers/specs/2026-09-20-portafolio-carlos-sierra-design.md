# Portafolio web — Carlos Johaquin Sierra Quispe

## 1. Objetivo

Landing de una sola página (con estructura que permita crecer a varias) para
Carlos Sierra — marketing & growth, con perfil deportivo y experiencia como
fundador de ZEIFIR (perfumería). Objetivo híbrido: sirve tanto para reclutadores
(marca personal / búsqueda de trabajo) como para clientes potenciales de sus
servicios de marketing (casos comerciales). Se envía por link.

## 2. Dirección estética (referencia: asrv.com, sin copiar marca ni imágenes)

- **Ánimo:** técnico, disciplinado, "performance". Lema mental: *lo ganado en silencio*.
- **Modo principal oscuro**, modo claro no requerido en v1.
- **Paleta:**
  - `--bg: #0B0C0E`
  - `--surface: #141619`
  - `--fg: #F3F4F6`
  - `--muted: #8B9096`
  - `--line: #24272C`
  - `--accent: #2E6BFF`
- **Tipografía:** titulares — *Space Grotesk* (o *Archivo* / *Chivo*), técnica y
  de tracking ajustado. Cuerpo — *Inter*. Vía Google Fonts, `display=swap`.
- **Detalles de marca:** nomenclatura tipo "código" para proyectos (`PRJ-01`…),
  etiquetas técnicas, líneas finas divisorias, marquee superior en loop, aire
  negativo generoso.
- **Imágenes:** grandes, a sangre, preferentemente en blanco y negro o con tinte
  sutil. Las miniaturas de proyecto salen de la portada de cada PDF (ver §5).
- **Movimiento:** sobrio — reveal en el hero, transiciones limpias en hover.
  Respetar `prefers-reduced-motion`.

## 3. Stack

- **Astro + Tailwind CSS** (sitio mayormente estático, sin backend).
- Deploy en Vercel o Netlify (se deja listo, sin desplegar automáticamente).
- Tipografías vía Google Fonts.

## 4. Estructura de la página

1. Marquee superior — lema en loop ("MARKETING · GROWTH · CONTENIDO").
2. Hero — nombre, rol, titular + CTA "Ver trabajo" / "Contacto" + línea de
   métricas tipo marcador deportivo.
3. Trabajo — 4 proyectos (tarjetas con nomenclatura de código, ver §5).
4. Lo que hago — 4 disciplinas.
5. Perfil — bio corta + ficha de datos + evidencia de marca personal (§5).
6. Contacto — email, teléfono, LinkedIn (placeholder `#` hasta tener el link).
7. Footer.

## 5. Contenido y mapeo de PDFs (verificado contra los archivos originales)

Cada PDF confirmado se copia a `public/docs/` y se muestra en su tarjeta de
proyecto como: **miniatura de la portada (primera página) + botón "Ver PDF
completo ↗"** que abre el archivo original en una pestaña nueva. No se usan
iframes embebidos (peso y mala UX en móvil) ni galerías completas de páginas.

- **PRJ-01 · ZEIFIR — Lanzamiento de marca de perfumería (2025)**
  Assets: `ZEIFIR_Catalogo.pdf`, `videos_ZEIFIR.pdf`, `Posts_Productos.pdf`.
  Fundó y lanzó una marca de perfumería: pricing, inventarios de importación,
  calendario de contenido TikTok y piezas de campaña ("No persigas, atrae").
  Métrica: 88% margen bruto sostenido. Tags: Estrategia de marca, Growth, Pricing, Contenido.

- **PRJ-02 · VINTAGE — Estrategia de marca y carta para discoteca (2026)**
  Assets: `Vintage.pdf`, `Carta_Vintage.pdf`.
  Plan de negocio y posicionamiento premium (NSE A/B, Andahuaylas), estrategia
  de "zonificación de densidad" y una carta diseñada con ingeniería de precios
  (anclaje, señuelo, cócteles insignia). Tags: Posicionamiento, Pricing psicológico, Menú.

- **PRJ-03 · Estrategia Comercial — Sastrería Barrington (2026)**
  Assets: `Estrategia_Fontenla.pdf`.
  Objetivos comerciales (+30% ventas, +15% utilidad neta, +20% ticket promedio,
  -40% CAC) y segmentación de clientes (cazadores de ofertas, corporativo, eventos).
  Tags: Estrategia comercial, Segmentación, KPIs.

- **PRJ-04 · Gringos Instalações — Pieza de reclutamiento (Brasil)**
  Assets: `GIC_Banner_vaga_Peru_logo_Gringos_negro.pdf`.
  Diseño de flyer de convocatoria laboral para estructuras metálicas.
  Tags: Diseño gráfico, Reclutamiento, Brand piece.

- **Evidencia adicional en "Perfil" (no es tarjeta de proyecto):**
  `Marca Personal - Contenido.pdf` — tabla de seguimiento de su propio
  contenido (TikTok @johaquin.s) con framework TOFU/MOFU/BOFU. Se muestra
  como enlace de descarga ("Ver seguimiento de contenido ↓") junto a la ficha
  de perfil, como evidencia de analítica de marca personal.

**Nombre:** Carlos Sierra (nombre completo Carlos Johaquin Sierra Quispe, se
usa forma corta en el sitio) · Marketing & Growth · Lima, Perú.

**Titular:** "Construyo marcas y las hago crecer con datos."

**Bio:** Egresado de Administración y Negocios del Deporte (UPC). Combina la
disciplina del deporte competitivo (selección de atletismo y fútbol) con
analítica y creatividad para lanzar marcas, producir contenido y convertirlo
en ventas.

**Métricas destacadas (marcador):**
- +88% margen bruto sostenido (ZEIFIR)
- +95% crecimiento de facturación mensual (HS Europa Sport)
- +25% sobre el récord anual de ventas (primeros 60 días)

**Lo que hace (disciplinas):**
- Growth marketing — crecimiento orgánico y contenido para vender sin pauta masiva.
- Creación de contenido — piezas gráficas y audiovisuales (Canva, DaVinci, CapCut).
- Analítica y datos — métricas e indicadores con Excel (modelado financiero) y Power BI.
- Gestión de marca — posicionamiento, propuesta de valor y estructura de precios.

**Ficha de perfil:**
- Formación: Administración y Negocios del Deporte — UPC
- Especializaciones: Marketing Deportivo · Marketing Estratégico · Analítica Digital
- Herramientas: Excel · Power BI · Canva · DaVinci Resolve · CapCut
- Idiomas: Español · Inglés (avanzado) · Francés (básico)
- Deporte: Selección de atletismo UPC · Fútbol distrital

**Contacto:**
- Email: jsq2908@gmail.com
- Teléfono: 963 507 814
- LinkedIn: placeholder `#` (pendiente de que Carlos lo envíe)
- Ubicación: Lima, Perú

## 6. Generación de assets

- Copiar los 8 PDF originales a `public/docs/<slug>.pdf`.
- Generar una imagen PNG de la primera página de cada PDF de proyecto
  (PRJ-01 a PRJ-04) para usar como miniatura de tarjeta (`public/images/prj-0X-cover.png`).
  El PDF de `Marca Personal - Contenido.pdf` no necesita miniatura (es solo
  enlace de descarga en Perfil).

## 7. Requisitos de calidad

- Responsive, mobile-first.
- Accesible: foco visible por teclado, buen contraste, `prefers-reduced-motion`.
- Rendimiento: imágenes optimizadas (miniaturas comprimidas), fuentes con `display=swap`.
- SEO básico: `<title>`, meta description, Open Graph.
- Código limpio, sin backend, sin dependencias innecesarias.

## 8. Fuera de alcance (v1)

- Modo claro.
- Blog o CMS.
- Formulario de contacto con backend (se usa `mailto:` / enlace directo).
- Proyectos "Domaind" y "movilidad eléctrica" del brief original: descartados
  por no tener PDF ni contenido verificable de respaldo.
