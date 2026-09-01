# Auditoría detallada SEO + GEO — HiveYoung

**Fecha:** 1 de septiembre de 2026
**Alcance:** `hiveyoung.org` y `congreso.hiveyoung.org`
**Exclusión expresa:** no se evaluó, puntuó ni incluyó ninguna ruta o activo de Brand.
**Estado evaluado:** código local actual + deployment público accesible durante la auditoría.

## Actualización de implementación — 1 de septiembre de 2026

Esta sección prevalece sobre las referencias históricas al deployment que aparecen más abajo y conserva los hallazgos originales como línea base de auditoría.

- La variante pública elegida es `https://www.hiveyoung.org`.
- La corrección de `metadataBase`, canonicals, URLs de Organization, breadcrumbs, enlaces absolutos y sitemaps ya fue publicada y verificada en las páginas principales.
- El título duplicado de Historia ya está corregido en producción.
- El código local incorpora ahora metadatos Open Graph y Twitter/X específicos para las nueve páginas auditadas, incluidas las dos páginas de Congreso.
- Todas las páginas declaran `og:type`, `og:locale`, `og:site_name`, `og:url`, título, descripción e imagen de 1200 × 630; Twitter/X usa `summary_large_image`, título, descripción, imagen y texto alternativo.
- Las cinco imágenes sociales contextuales generadas mediante Cloudinary responden `200`, se entregan como `image/jpeg` y pesan entre 64.791 y 139.187 bytes.
- La implementación social está validada en el HTML local y queda pendiente de despliegue. Hasta entonces, la web pública continúa mostrando parte de los metadatos Open Graph anteriores.

### Inventario social actualizado

| Ruta | `og:url` | Imagen social | Estado |
|---|---|---|---|
| `/` | `https://www.hiveyoung.org` | Arte institucional 1200 × 630 | Validado local; pendiente desplegar |
| `/somos` | `https://www.hiveyoung.org/somos` | Comunidad HiveYoung | Validado local; pendiente desplegar |
| `/historia` | `https://www.hiveyoung.org/historia` | Fundadores e historia | Validado local; pendiente desplegar |
| `/equipo` | `https://www.hiveyoung.org/equipo` | Equipo y comunidad | Validado local; pendiente desplegar |
| `/advisory-board` | `https://www.hiveyoung.org/advisory-board` | Arte institucional | Validado local; pendiente desplegar |
| `/unete` | `https://www.hiveyoung.org/unete` | Voluntariado | Validado local; pendiente desplegar |
| `/contacto` | `https://www.hiveyoung.org/contacto` | Arte institucional | Validado local; pendiente desplegar |
| Congreso `/` | `https://congreso.hiveyoung.org` | Orquesta del Congreso | Validado local; pendiente desplegar |
| Congreso `/2025` | `https://congreso.hiveyoung.org/2025` | Panel y público del Congreso 2025 | Validado local; pendiente desplegar |

La selección de imágenes es deliberadamente contextual: las páginas con una narrativa visual propia no reutilizan de forma indiscriminada la imagen genérica del sitio. Se fijó JPEG para maximizar compatibilidad con Facebook, LinkedIn, WhatsApp, X/Twitter y otros consumidores de Open Graph.

## 1. Resumen ejecutivo

HiveYoung cuenta con una base SEO técnicamente competente: renderizado HTML indexable, HTTPS, una H1 por ruta, canonicals declarados, metadatos únicos, Open Graph, Twitter Cards, JSON-LD, navegación interna clara y cobertura pública de fuentes externas relevantes. La organización también dispone de señales reales de autoridad: universidades y medios han publicado información independiente sobre HiveYoung y el Congreso 2025.

La auditoría inicial detectó como problema principal la **inconsistencia entre señales**. Desde entonces ya se publicó la normalización de la variante canónica `www` y la corrección del título de Historia. La prioridad operativa actual es desplegar la nueva capa social, confirmar nuevamente la separación de sitemaps por host y validar en producción los schemas corregidos del Congreso.

El segundo problema es estratégico: el sitio explica quién es HiveYoung, pero tiene poca profundidad sobre **qué proyectos ejecuta, qué resultados obtiene, cómo trabaja y qué conocimiento propio puede aportar**. Eso limita la captación de búsquedas no marcarias y la posibilidad de ser citado como fuente en AI Overviews, AI Mode, ChatGPT, Perplexity u otros sistemas basados en recuperación.

### Puntuación diagnóstica

| Área | Puntuación | Diagnóstico |
|---|---:|---|
| Rastreo e indexación | 57/100 | Producción mezcla hosts y contradice la URL canónica |
| SEO técnico | 63/100 | Buena base Next.js; deployment y carga de imágenes requieren corrección |
| SEO on-page | 79/100 | Metadatos y H1 sólidos, con algunos títulos y contenidos mejorables |
| Imágenes y rendimiento | 46/100 | Historia concentra la principal deuda técnica |
| Contenido y E-E-A-T | 62/100 | Entidad real y validación externa, pero poca evidencia propia publicada |
| GEO / búsqueda generativa | 61/100 | Entidad comprensible; falta cobertura temática, citas y datos reutilizables |
| **Salud global estimada** | **64/100** | **Base sólida con correcciones técnicas urgentes** |

Las puntuaciones son un marco propio de priorización; no son métricas de Google ni sustituyen Search Console, GA4, CrUX o una herramienta de backlinks.

## 2. Alcance y metodología

Se evaluaron nueve URLs indexables:

### Dominio principal

1. `https://hiveyoung.org/`
2. `https://hiveyoung.org/somos`
3. `https://hiveyoung.org/historia`
4. `https://hiveyoung.org/equipo`
5. `https://hiveyoung.org/advisory-board`
6. `https://hiveyoung.org/unete`
7. `https://hiveyoung.org/contacto`

### Congreso

8. `https://congreso.hiveyoung.org/`
9. `https://congreso.hiveyoung.org/2025`

La revisión incluyó:

- Respuestas HTTP, HTTPS y redirecciones `www`.
- `robots.txt`, sitemap XML y sitemap de imágenes en ambos hosts.
- Titles, meta descriptions, canonicals, H1, Open Graph y Twitter Cards.
- JSON-LD de Organization, AboutPage, ContactPage, Person, ItemList, BreadcrumbList, FAQPage y Event.
- Cantidad de imágenes, alt, lazy loading, preloads y duplicación de recursos.
- Arquitectura, enlaces internos, profundidad y cobertura temática.
- Señales públicas de autoridad y capacidad de citación para GEO.
- Diferencias entre el código local y el deployment público.

## 3. Hallazgos críticos

### P0 — Producción no contiene las correcciones que existen localmente

**Evidencia pública:**

- El sitemap principal contiene las nueve URLs, incluidas las dos del subdominio Congreso.
- El sitemap servido desde Congreso contiene exactamente la misma lista del dominio principal.
- El `robots.txt` del Congreso enlaza los sitemaps de `hiveyoung.org`.
- Historia aún publica `Nuestra Historia | HiveYoung | HiveYoung`.
- La home pública todavía contiene “conécta”.
- El schema público de `/congreso` conserva `EventScheduled`, `Offer` e `InStock`.
- El schema público de `/2025` declara fechas del 7 y 8 de julio de **2026**, junto con `EventScheduled`, `Offer` e `InStock`.

**Estado local:** el código actual ya separa los sitemaps por host, corrige el título de Historia, corrige la errata y usa las fechas reales de 2025 sin oferta activa.

**Impacto:** crítico. La auditoría de producción y Googlebot siguen observando la versión incorrecta. Una corrección no produce efecto SEO hasta desplegarse, rastrearse y procesarse.

**Acción:** desplegar el código actual y ejecutar una lista de aceptación posdeploy con respuestas reales de ambos hosts. Después solicitar reindexación en Search Console.

### P0 — La URL canónica contradice la redirección a `www`

**Evidencia:**

- `http://hiveyoung.org/` → 308 a `https://hiveyoung.org/`.
- `https://hiveyoung.org/` → 308 a `https://www.hiveyoung.org/`.
- `https://www.hiveyoung.org/` devuelve 200.
- El HTML de `www` declara canonical `https://hiveyoung.org` sin `www`.
- Los sitemaps también listan URLs sin `www`.

Google considera redirecciones, `rel=canonical` y sitemaps señales de canonicalización. Conviene que las tres apunten a la misma variante, no en direcciones opuestas. [Guía oficial de canonicalización](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

**Impacto:** alto. Puede retrasar la consolidación, generar “Google eligió una canonical diferente” y desperdiciar rastreo en cada URL del dominio principal.

**Corrección:** elegir una sola variante:

- **Opción recomendada:** mantener `www` como URL pública y actualizar `metadataBase`, canonicals, Organization URL, breadcrumbs, enlaces absolutos y sitemaps a `https://www.hiveyoung.org`.
- **Alternativa:** mantener las señales sin `www` y cambiar la configuración del dominio para redirigir `www` → sin `www`.

No deben coexistir una redirección hacia `www` y canonicals hacia la versión desnuda.

### P0 — Sitemaps mezclados entre hosts en producción

**Evidencia:** tanto `hiveyoung.org/sitemap.xml` como `congreso.hiveyoung.org/sitemap.xml` publican las siete URLs principales y las dos del Congreso. El `robots.txt` de Congreso apunta a los sitemaps del dominio principal.

Google recomienda incluir en cada sitemap las URLs canónicas que corresponden al sitio y recuerda que el alcance del sitemap depende de su ubicación. [Documentación oficial de sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

**Impacto:** alto. El Congreso pierde una señal independiente de descubrimiento y seguimiento en Search Console.

**Corrección esperada tras desplegar el código local:**

- Sitemap principal: siete URLs de HiveYoung.
- Sitemap Congreso: `/` y `/2025` en `congreso.hiveyoung.org`.
- Sitemap de imágenes principal: solo landing pages del dominio principal.
- Sitemap de imágenes Congreso: activos de Congreso en su propio host.
- Cada `robots.txt` debe enlazar exclusivamente los sitemaps de su host.

### P1 — Schema Event público contradictorio y desactualizado

**Evidencia:**

| Ruta | Fecha pública | Estado/oferta pública | Fecha real |
|---|---|---|---|
| `/` Congreso | 7–8 julio 2025 | `EventScheduled`, `Offer`, `InStock` | 7–8 julio 2025, evento pasado |
| `/2025` | 7–8 julio 2026 | `EventScheduled`, `Offer`, `InStock` | 7–8 julio 2025 |

**Impacto:** alto para SEO semántico y GEO. Los datos estructurados contradicen el contenido, la fecha histórica y las fuentes externas. Google recomienda que el structured data represente el contenido visible de la página. [AI features y sitio web](https://developers.google.com/search/docs/appearance/ai-features).

**Corrección:** desplegar el schema local corregido, validar ambas rutas con Rich Results Test y Schema.org Validator, y convertir el contenido visible de `/2025` a pasado de manera consistente. La FAQ aún utiliza frases como “requiere inscripción” y “los cupos son limitados”, que parecen vigentes aunque el evento terminó.

## 4. Inventario on-page del deployment

| Ruta | Title | Caracteres | Description | H1 | Imágenes | JSON-LD |
|---|---|---:|---:|---:|---:|---:|
| `/` | HiveYoung \| Principal articulador del ecosistema juvenil | 56 | 152 | 1 | 20 | Sí |
| `/somos` | Quiénes Somos \| HiveYoung | 25 | 129 | 1 | 7 | Sí |
| `/historia` | Nuestra Historia \| HiveYoung \| HiveYoung | 40 | 132 | 1 | 119 | Sí |
| `/equipo` | Nuestro Equipo \| HiveYoung | 26 | 138 | 1 | 16 | Sí |
| `/advisory-board` | Advisory Board \| HiveYoung | 26 | 126 | 1 | 8 | Sí |
| `/unete` | Únete \| HiveYoung | 17 | 120 | 1 | 3 | Sí |
| `/contacto` | Contacto \| HiveYoung | 20 | 118 | 1 | 3 | Sí |
| Congreso `/` | Congreso HiveYoung… \| HiveYoung | 74 | 158 | 1 | 2 | Sí |
| Congreso `/2025` | Congreso HiveYoung 2025 | 23 | 149 | 1 | 22 | Sí |

### Fortalezas on-page

- Todas las rutas auditadas devuelven 200 después de sus redirecciones esperadas.
- Todas tienen una H1.
- Todas declaran description y canonical.
- Titles y descriptions son únicos por intención.
- Existe metadata social con imagen 1200×630.
- El idioma raíz está declarado como español.
- Las URLs son cortas, legibles y estables.

### Oportunidades on-page

#### Congreso `/`: title demasiado largo y doble branding

El title público tiene 74 caracteres y termina en `| HiveYoung`. Esto ocurre por la interacción entre el layout global y el layout del Congreso.

**Propuesta:** usar title absoluto, por ejemplo:

`Congreso HiveYoung | Liderazgo e innovación juvenil en Chile`

#### Titles demasiado genéricos

`Contacto`, `Únete`, `Nuestro Equipo` y `Advisory Board` son correctos para navegación, pero capturan poca demanda no marcaria.

**Propuestas:**

- `Únete a HiveYoung | Voluntariado y liderazgo juvenil`
- `Equipo HiveYoung | Jóvenes líderes en Chile`
- `Advisory Board HiveYoung | Mentores y líderes estratégicos`
- `Contacto HiveYoung | Alianzas y colaboración juvenil`

#### H1 de “Quiénes Somos”

El H1 accesible contiene `¿Quiénes Somos? | HiveYoung`; conviene mantener el heading como contenido, no como title SEO:

`Quiénes somos`

La marca ya está presente en el contexto, logo y title.

## 5. Auditoría de imágenes

### Resumen del deployment

| Ruta | Total | Alt ausente | Alt vacío | Lazy | Fuentes únicas | Nodos duplicados | Preloads |
|---|---:|---:|---:|---:|---:|---:|---:|
| Home | 20 | 0 | 11 | 15 | 19 | 1 | 5 |
| Somos | 7 | 0 | 4 | 5 | 6 | 1 | — |
| Historia | 119 | 0 | 0 | 78 | 14 | 105 | 14 |
| Equipo | 16 | 0 | 1 | 8 | 15 | 1 | 8 |
| Advisory | 8 | 0 | 0 | 7 | 7 | 1 | — |
| Únete | 3 | 0 | 0 | 1 | 2 | 1 | — |
| Contacto | 3 | 0 | 0 | 2 | 2 | 1 | — |
| Congreso `/` | 2 | 0 | 0 | 1 | 1 | 1 | — |
| Congreso `/2025` | 22 | 0 | 0 | 20 | 21 | 1 | 2 |

### P1 — Historia renderiza 119 imágenes para 14 fuentes únicas

**Impacto:** alto. Hay 105 nodos repetidos y 14 imágenes precargadas. Esto aumenta HTML, solicitudes potenciales, memoria, decodificación, competencia de red y trabajo del navegador. Además, cada copia usa alt descriptivo, por lo que el carrusel decorativo se presenta repetidamente como contenido informativo.

**Corrección recomendada:** mantener la apariencia original con 14–28 nodos como máximo mediante virtualización, transformaciones o una secuencia visual controlada; marcar las copias puramente decorativas con `alt=""`, `aria-hidden="true"` y `role="presentation"`. Mantener alt descriptivo solo en las imágenes narrativas reales.

### P1 — Exceso de preloads

- Historia: 14.
- Equipo: 8.
- Home: 5.

La prioridad alta debe reservarse para la imagen que realmente sea LCP. El resto debe cargarse con lazy loading y `decoding="async"` cuando esté bajo el fold.

### Fortalezas de imágenes

- No se encontraron `<img>` sin atributo alt.
- La mayoría de imágenes usan el optimizador de Next.js y Cloudinary.
- Congreso 2025 aplica lazy loading a 20 de 22 imágenes.
- Las imágenes informativas de speakers y miembros tienen descripciones contextuales.
- Existe sitemap de imágenes.

Google utiliza el alt, el contexto de la página y señales visuales para comprender imágenes; también recomienda filenames descriptivos y proximidad a texto relevante. [Guía oficial de Google Images](https://developers.google.com/search/docs/appearance/google-images).

## 6. Datos estructurados

### Cobertura actual

| Entidad/página | Schema detectado en código |
|---|---|
| Sitio completo | `Organization` |
| Somos | `AboutPage`, `Organization`, `BreadcrumbList` |
| Historia | `ItemList`, `ImageObject`, `BreadcrumbList` |
| Equipo | `ItemList`, `Person`, `BreadcrumbList` |
| Advisory | `ItemList`, `Person`, `BreadcrumbList` |
| Únete | `FAQPage`, `BreadcrumbList` |
| Contacto | `ContactPage`, `Organization`, `ContactPoint`, `BreadcrumbList` |
| Congreso | `Event` |
| Congreso 2025 | `Event`, `FAQPage` |

### Fortalezas

- Uso de JSON-LD, formato recomendado por Google por su mantenibilidad. [Introducción oficial a structured data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data).
- Entidades Person conectadas con roles, organizaciones e imágenes.
- Breadcrumbs consistentes en las páginas principales.
- Organization incluye logo, redes sociales y contacto.

### Mejoras recomendadas

1. Añadir un `@id` persistente a la organización, por ejemplo `https://www.hiveyoung.org/#organization`, y reutilizarlo mediante referencias en AboutPage, Person, Event y ContactPage.
2. Normalizar el email (`hiveyoung@gmail.com`) y la URL según la variante canónica elegida.
3. Sustituir enlaces genéricos `https://linkedin.com/` por perfiles reales o eliminarlos.
4. Añadir `sameAs` institucionales adicionales verificables cuando existan.
5. En Historia, alinear las URLs del `ImageObject` con las imágenes actuales de `data/historia.ts`; el schema contiene URLs antiguas diferentes a las mostradas.
6. Validar el Event corregido después de desplegar.
7. No añadir schemas inventados para GEO: Google confirma que no existe un marcado especial para aparecer en AI Overviews o AI Mode. [Guía oficial de optimización para IA](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).

## 7. Arquitectura y enlaces internos

### Fortalezas

- Las siete páginas principales están a uno o dos clics desde navegación o footer.
- El footer enlaza Somos, Equipo, Advisory, Historia, Únete y Contacto.
- La home enlaza el Congreso y ofrece una ruta de conversión clara.
- No existen parámetros, filtros o facetas que multipliquen URLs.

### Problemas

#### Enlaces legales no funcionales

“Términos” y “Privacidad” son `<span>`, no enlaces. Esto reduce confianza, especialmente porque Contacto y Únete recopilan información.

**Acción:** publicar páginas reales de privacidad y términos, enlazarlas desde el footer y describir finalidad, base de tratamiento, conservación, terceros y mecanismo de contacto.

#### Navegación principal sin acceso directo a Únete

La CTA existe, pero no forma parte del objeto de navegación semántica. Mantener un enlace `<a>` rastreable y visible con texto descriptivo.

#### Poca vinculación contextual

La mayor parte del interlinking está en navbar/footer. Faltan enlaces dentro del contenido, por ejemplo:

- Historia → Congreso 2025.
- Congreso 2025 → speakers relevantes en Equipo/Advisory cuando corresponda.
- Somos → proyectos, resultados y alianzas.
- Equipo → iniciativas lideradas por cada área.

## 8. Contenido, demanda y E-E-A-T

### Fortalezas de autoridad

HiveYoung dispone de evidencia externa significativa:

- La [Universidad de Chile](https://uchile.cl/noticias/228355/estudiantes-realizaran-congreso-para-jovenes-en-el-instituto-nacional-) documentó el lanzamiento, los 40 estudiantes de 13 establecimientos y los objetivos del Congreso.
- La [Universidad Autónoma de Chile](https://www.uautonoma.cl/noticias/universidad-autonoma-participa-en-la-primera-edicion-del-congreso-hiveyoung/) publicó su participación en la primera edición y la realización en CEINA.
- [ADN Radio](https://www.adnradio.cl/2025/10/13/plaza-adn-alumnos-del-instituto-nacional-organizan-mundial-de-debate-y-feria-de-innovacion/) describió a HiveYoung como una organización de estudiantes y articuladora del ecosistema juvenil.
- [Universidad Andrés Bello](https://noticias.unab.cl/congreso-hive-young-unab-estuvo-presente-para-hablar-de-sostenibilidad/) cubrió el Congreso y sus temáticas.
- [Gerencia](https://www.gerencia.cl/innovation/hiveyoung-impulsando-el-emprendimiento-desde-la-etapa-escolar/) publicó sobre el Congreso y el problema que busca resolver.

Estas menciones fortalecen E-E-A-T y son especialmente valiosas para GEO porque permiten corroborar personas, fechas, lugar, alcance y propósito.

### Debilidad principal: evidencia dispersa y no incorporada

El sitio afirma ser el principal articulador del ecosistema juvenil y señala más de 2.000 estudiantes y 30 instituciones, pero no ofrece una página de resultados con metodología, fuentes, logos de aliados, testimonios y enlaces externos verificables.

**Acción:** crear `/impacto` o `/resultados` con:

- Métricas fechadas y metodología de conteo.
- Número de participantes, instituciones, voluntarios, speakers y actividades.
- Testimonios atribuidos.
- Fotografías con captions.
- Enlaces a cobertura externa.
- Fecha de actualización y responsable editorial.

### Falta de cobertura temática

El sitio tiene páginas corporativas, pero casi ninguna respuesta a consultas informativas no marcarias. Faltan clusters sobre:

- Liderazgo juvenil en Chile.
- Voluntariado juvenil.
- Emprendimiento escolar.
- Innovación y tecnología para estudiantes.
- Cómo organizar proyectos juveniles.
- Redes y oportunidades para jóvenes.
- Casos de proyectos liderados por estudiantes.
- Aprendizajes del Congreso HiveYoung.

Sin este contenido, el dominio depende de búsquedas de marca y del Congreso.

### Consistencia editorial

El deployment todavía contiene “conécta”; el código local ya lo corrige. Debe establecerse una revisión editorial antes de publicar. También conviene normalizar:

- “Camilo Jimenez” → comprobar si corresponde “Jiménez”.
- “Maglio Olguin” → comprobar si corresponde “Olguín”.
- Uso consistente de “cofundador”, cargos y mayúsculas.
- Biografías en tercera persona, con longitud y estructura similares.

## 9. Evaluación GEO

GEO no sustituye el SEO. Google indica que sus experiencias generativas usan los mismos fundamentos: páginas indexables, contenido útil, enlaces internos, experiencia de página, texto accesible y structured data coherente con lo visible. No exige un schema especial ni archivos “AI” adicionales. [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features).

### Evaluación por dimensión

| Dimensión GEO | Estado | Observación |
|---|---|---|
| Descubrimiento | Medio | Indexación pública existente, pero sitemaps contradictorios |
| Identidad de entidad | Bueno | Nombre, organización, fundadores, redes y cobertura externa coherentes |
| Corroboración | Bueno | Universidades y medios independientes validan el Congreso y la organización |
| Respuestas citables | Bajo | Pocas páginas responden preguntas concretas con estructura reutilizable |
| Frescura | Bajo/medio | No hay fechas de actualización ni sección editorial recurrente |
| Evidencia propia | Medio/bajo | Métricas relevantes sin metodología ni página de resultados |
| Datos estructurados | Bueno en amplitud | Necesita IDs persistentes y consistencia deployment/contenido |
| Cobertura temática | Baja | Predominan páginas corporativas y de conversión |

### Contenidos prioritarios para GEO

1. **Qué es HiveYoung y cómo funciona**: respuesta breve, programas, criterios, cobertura geográfica y formas de participación.
2. **Resultados del Congreso HiveYoung 2025**: datos, aprendizajes, participantes, instituciones y cobertura.
3. **Guía de liderazgo juvenil en Chile**: marco propio, pasos, ejemplos y recursos.
4. **Cómo crear un proyecto juvenil de impacto**: proceso utilizado por HiveYoung, plantillas y errores comunes.
5. **Directorio de oportunidades para jóvenes**: becas, voluntariado, eventos y programas, con fechas de actualización.
6. **Casos de impacto**: problema, intervención, resultados, responsables y evidencia.
7. **Página por iniciativa**: objetivo, público, proceso, equipo, aliados, resultados y FAQ.

### Formato recomendado para contenido citable

- Respuesta directa de 40–80 palabras al comienzo.
- H2 en forma de preguntas reales.
- Datos en tablas simples.
- Definiciones claras y sin lenguaje promocional excesivo.
- Fuentes enlazadas junto a cada cifra.
- Autor o responsable, fecha de publicación y actualización.
- Resumen, metodología y limitaciones.
- Fotografías o videos con captions contextuales.

## 10. Mapa inicial de keywords e intención

| URL/cluster | Keyword primaria | Intención | Prioridad |
|---|---|---|---|
| Home | organización juvenil Chile | Navegacional/institucional | Alta |
| Somos | qué es HiveYoung | Informativa de marca | Alta |
| Únete | voluntariado juvenil Chile | Participación | Alta |
| Congreso | congreso juvenil Chile | Evento | Alta |
| Congreso 2025 | Congreso HiveYoung 2025 | Histórica/navegacional | Alta |
| Nueva `/impacto` | impacto de proyectos juveniles | Evidencia | Alta |
| Nueva `/programas` | programas para jóvenes Chile | Informativa/comercial | Alta |
| Nueva guía | liderazgo juvenil Chile | Informativa | Media/alta |
| Nueva guía | emprendimiento escolar Chile | Informativa | Media/alta |
| Nueva guía | cómo crear un proyecto juvenil | Informativa | Media |

Las keywords deben validarse con Search Console y una herramienta de volumen; este mapa expresa relevancia e intención, no demanda cuantificada.

## 11. Rendimiento y Core Web Vitals

No se obtuvieron métricas Lighthouse públicas porque la API de PageSpeed Insights respondió `429 Too Many Requests`. Tampoco se contó con datos de campo de CrUX o Search Console. Por ello, no se asignan valores inventados de LCP, INP o CLS.

### Riesgos técnicos observables

- 369 KB de HTML público en Historia.
- 119 nodos de imagen y 14 preloads en Historia.
- 8 preloads de imagen en Equipo.
- Uso conjunto de GSAP, Framer Motion, Lenis, slick carousel y múltiples componentes client-side.
- Fuentes de Google cargadas mediante `next/font`, con varias familias y pesos.
- Middleware de Next.js marcado como convención obsoleta durante compilaciones locales anteriores.

### Medición requerida

Ejecutar Lighthouse móvil y escritorio para Home, Historia, Equipo, Únete, Congreso y Congreso 2025. Registrar:

- LCP objetivo ≤ 2,5 s.
- INP objetivo ≤ 200 ms.
- CLS objetivo ≤ 0,1.
- TTFB, FCP y Total Blocking Time como diagnóstico.
- Elemento LCP real y cadena de solicitudes críticas.
- Bytes de JavaScript por ruta.

## 12. Plan de acción priorizado

### Fase 0 — Despliegue y verificación inmediata (0–2 días)

1. Desplegar el código local actual.
2. Elegir `www` o sin `www` y alinear redirecciones, canonicals, sitemap y schema.
3. Confirmar separación real de sitemaps y robots por host.
4. Confirmar fechas 2025 y ausencia de `EventScheduled`, `Offer` e `InStock`.
5. Confirmar title final `Nuestra Historia | HiveYoung`.
6. Confirmar que la home pública diga “conecta”.
7. Ejecutar Rich Results Test en ambas rutas del Congreso.
8. Enviar los sitemaps correctos en propiedades separadas de Search Console.

### Fase 1 — Correcciones de alto impacto (3–14 días)

1. Resolver la carga de 119 imágenes en Historia sin cambiar la apariencia aprobada.
2. Reducir preloads en Historia y Equipo.
3. Crear páginas funcionales de Privacidad y Términos.
4. Corregir el title largo del Congreso.
5. Convertir todo `/2025` a lenguaje histórico coherente.
6. Unificar `@id` de Organization y referencias de entidades.
7. Actualizar ImageObject de Historia para que coincida con las imágenes visibles.
8. Eliminar URLs genéricas de LinkedIn.

### Fase 2 — Autoridad y GEO (15–45 días)

1. Publicar página de Impacto/Resultados.
2. Publicar páginas individuales de programas e iniciativas.
3. Incorporar cobertura externa y testimonios con atribución.
4. Crear 3–5 contenidos pilares de liderazgo, voluntariado y emprendimiento juvenil.
5. Añadir autoría, fechas y política editorial.
6. Crear interlinking contextual entre Historia, Congreso, Impacto y Equipo.

### Fase 3 — Crecimiento sostenido (45–90 días)

1. Publicar casos de estudio mensuales.
2. Construir un hub de recursos y oportunidades juveniles.
3. Solicitar enlaces desde universidades, aliados, speakers y medios que ya mencionan HiveYoung.
4. Mantener fichas de eventos históricos y crear nuevas URLs por edición futura.
5. Medir consultas no marcarias, menciones de marca y referencias desde experiencias de IA.

## 13. KPIs recomendados

### SEO técnico

- 100% de URLs indexables con canonical coherente.
- 0 URLs cruzadas entre sitemaps de hosts.
- 0 errores de schema Event.
- 0 títulos duplicados.
- 0 enlaces internos rotos.

### Rendimiento

- ≥ 75% de visitas con CWV “Good” al inicio; objetivo posterior ≥ 90%.
- LCP p75 ≤ 2,5 s.
- INP p75 ≤ 200 ms.
- CLS p75 ≤ 0,1.
- Reducción de nodos de imagen y preloads en plantillas pesadas.

### Contenido y GEO

- Crecimiento de impresiones no marcarias.
- Número de páginas que reciben tráfico orgánico.
- Consultas en top 10 por clusters juveniles.
- Dominios referentes de universidades, medios y aliados.
- Menciones de HiveYoung acompañadas de enlaces.
- Tráfico referido desde buscadores y asistentes con IA.
- Conversiones orgánicas a Únete y Contacto.

## 14. Limitaciones

No se tuvo acceso a:

- Google Search Console.
- GA4 más allá del código de Analytics de Vercel.
- Bing Webmaster Tools.
- Perfil completo de backlinks de Ahrefs, Semrush o Majestic.
- Datos CrUX de campo.
- PageSpeed Insights, que respondió 429 durante esta auditoría.
- Datos de conversiones, formularios enviados o engagement.

Por ello, no se afirma cobertura total de indexación, posiciones, tráfico, backlinks o Core Web Vitals reales. Esos datos deben incorporarse en una segunda fase conectada a las herramientas propietarias.

## 15. Conclusión

HiveYoung ya posee una entidad digital reconocible, contenido indexable y autoridad externa real. Su oportunidad principal consiste en **alinear todas las señales técnicas**, desplegar las correcciones pendientes y convertir su experiencia verificable en contenido profundo y citable.

El orden correcto es:

1. Despliegue y canonicalización.
2. Sitemaps y schema coherentes.
3. Rendimiento de Historia y Equipo.
4. Evidencia, resultados y páginas de iniciativas.
5. Contenido temático sostenido para búsquedas no marcarias y GEO.

La recomendación no es añadir más etiquetas de forma indiscriminada. Es publicar información original, verificable, bien enlazada y técnicamente consistente. Google mantiene que los fundamentos SEO siguen siendo la base de sus funciones generativas: contenido útil, rastreable, textual, confiable y con una buena experiencia de página. [Guía oficial de optimización para funciones generativas](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).
