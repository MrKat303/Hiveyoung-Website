# Reporte SEO detallado sin Brand — HiveYoung

**Fecha de validación:** 1 de septiembre de 2026

**Sitios evaluados:** `www.hiveyoung.org` y `congreso.hiveyoung.org`

**Exclusión:** no se auditaron, puntuaron ni incorporaron las rutas, contenidos o activos del sitio Brand. Tampoco se usaron búsquedas de marca para valorar el potencial orgánico.

**Objetivo:** aumentar descubrimiento, clics y conversiones procedentes de consultas genéricas como liderazgo juvenil, voluntariado juvenil, organizaciones juveniles, proyectos juveniles y congresos para jóvenes en Chile.

---

## 1. Resumen ejecutivo

HiveYoung tiene una base técnica indexable y razonablemente ordenada. Las nueve páginas analizadas responden `200`, usan HTTPS, presentan una única H1, tienen canonical propio y aparecen en sitemaps separados por host. La variante pública también está bien consolidada: HTTP y el dominio sin `www` terminan en `https://www.hiveyoung.org/`.

El principal límite del SEO no marcario no es técnico, sino editorial y arquitectónico. El dominio principal tiene solo siete páginas, casi todas institucionales. Explican quién es la organización, pero no desarrollan con suficiente profundidad las necesidades que una persona buscaría sin conocerla previamente: cómo desarrollar liderazgo juvenil, dónde hacer voluntariado, qué proyectos se ejecutan, qué resultados producen, cómo crear una iniciativa o qué oportunidades existen para jóvenes.

En las búsquedas genéricas revisadas, el espacio competitivo está ocupado por INJUV, Fundación Movámonos, Fundación Adolescente Impacta, Cruz Roja Juventud, Fundación Civis y otras entidades con páginas dedicadas a programas, iniciativas, áreas de impacto y recursos. HiveYoung sí es rastreable, pero todavía no posee suficiente superficie temática para competir de forma sostenida por esas intenciones.

### Puntuación diagnóstica

Estas puntuaciones son un marco de priorización propio, no métricas de Google.

| Área | Puntuación | Diagnóstico |
|---|---:|---|
| Rastreo e indexación | 88/100 | Robots, canonicals y sitemaps funcionan; `lastmod` no refleja cambios reales |
| Canonicalización y URLs | 92/100 | HTTPS y `www` consolidados; rutas limpias y sin parámetros |
| SEO on-page | 70/100 | Metadatos únicos y una H1 por página; varios títulos son genéricos y faltan jerarquías H2 |
| Contenido no marcario | 38/100 | Muy poca cobertura de consultas genéricas y ausencia de clusters temáticos |
| Enlazado y arquitectura | 62/100 | Páginas accesibles, pero el enlazado es mayormente navbar/footer |
| Datos estructurados | 75/100 | Cobertura amplia; falta consolidar entidades y mantener contenido histórico coherente |
| Imágenes y rendimiento | 48/100 | Buena cobertura alt, pero Historia tiene 119 imágenes y 14 preloads |
| Confianza y E-E-A-T | 61/100 | Equipo y menciones externas reales; faltan resultados, metodología, políticas y evidencia propia |
| **Salud SEO no marcaria** | **62/100** | **Base técnica útil, crecimiento limitado por contenido, rendimiento y prueba de impacto** |

### Prioridades principales

1. Reducir drásticamente el coste de renderizado de `/historia`.
2. Crear páginas de proyectos, impacto, voluntariado y recursos orientadas a demanda no marcaria.
3. Corregir señales editoriales y de confianza: contenido histórico del Congreso, emails y páginas legales.
4. Mejorar títulos, headings y enlazado contextual por intención.
5. Automatizar fechas reales del sitemap y desplegar los metadatos sociales que ya están preparados localmente.

---

## 2. Alcance y metodología

### URLs incluidas

| Host | URL |
|---|---|
| Principal | `https://www.hiveyoung.org/` |
| Principal | `https://www.hiveyoung.org/somos` |
| Principal | `https://www.hiveyoung.org/historia` |
| Principal | `https://www.hiveyoung.org/equipo` |
| Principal | `https://www.hiveyoung.org/advisory-board` |
| Principal | `https://www.hiveyoung.org/unete` |
| Principal | `https://www.hiveyoung.org/contacto` |
| Congreso | `https://congreso.hiveyoung.org/` |
| Congreso | `https://congreso.hiveyoung.org/2025` |

### Comprobaciones realizadas

- Estado HTTP, HTTPS, variantes `www` y redirecciones.
- `robots.txt`, sitemap XML y sitemap de imágenes por host.
- Title, description, canonical, H1, H2, tamaño del HTML, imágenes, lazy loading, preloads y JSON-LD.
- Código fuente local de Next.js y diferencias con producción.
- Arquitectura, enlazado interno, confianza y cobertura temática.
- Revisión exploratoria de resultados para consultas genéricas relacionadas.
- Consulta a PageSpeed Insights; la API respondió `429`, por lo que no se inventaron métricas de Core Web Vitals.

### Limitaciones

No se dispuso de Google Search Console, GA4, CrUX, un índice comercial de backlinks ni volúmenes de keywords. Por ello, el reporte no afirma posiciones, tráfico, conversiones, backlinks totales o URLs indexadas exactas. El análisis de demanda es cualitativo y debe cruzarse después con impresiones y consultas reales de Search Console.

---

## 3. Inventario técnico de producción

| URL | Title (car.) | Description (car.) | H1 | H2 | HTML KB | Imágenes | Lazy | Preloads imagen | JSON-LD |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| `/` | 56 | 152 | 1 | 3 | 49,2 | 20 | 15 | 5 | Sí |
| `/somos` | 25 | 129 | 1 | 3 | 54,0 | 7 | 5 | 2 | Sí |
| `/historia` | 28 | 132 | 1 | 0 | 360,8 | 119 | 78 | 14 | Sí |
| `/equipo` | 26 | 138 | 1 | 3 | 86,9 | 16 | 8 | 8 | Sí |
| `/advisory-board` | 26 | 126 | 1 | 0 | 41,7 | 8 | 7 | 1 | Sí |
| `/unete` | 17 | 120 | 1 | 1 | 36,6 | 3 | 1 | 2 | Sí |
| `/contacto` | 20 | 118 | 1 | 0 | 31,3 | 3 | 2 | 1 | Sí |
| Congreso `/` | 74 | 158 | 1 | 5 | 50,9 | 2 | 1 | 1 | Sí |
| Congreso `/2025` | 23 | 149 | 1 | 4 | 63,3 | 22 | 20 | 2 | Sí |

**Lectura:** las páginas normales tienen un HTML moderado. Historia es el outlier: pesa más de siete veces la home en HTML y contiene casi seis veces más imágenes. Ese coste ocurre antes de contar JavaScript, CSS, fuentes, imágenes transferidas y trabajo de decodificación.

---

## 4. Rastreo, indexación y canonicalización

### 4.1 Fortalezas verificadas

- `robots.txt` responde `200` en ambos hosts y permite el rastreo general.
- Cada host declara sus propios sitemaps.
- El sitemap principal contiene siete URLs del dominio principal.
- El sitemap del Congreso contiene solo la home del Congreso y `/2025`.
- Todas las URLs del sitemap son absolutas y coinciden con sus canonicals.
- HTTP, `hiveyoung.org` y `www` terminan en la variante canónica `https://www.hiveyoung.org/`.
- `/congreso` en el dominio principal redirige al subdominio correspondiente.
- HSTS está activo con `max-age=63072000`.

### 4.2 P1 — `lastmod` fijo e inexacto

**Evidencia:** todas las URLs publican `2026-06-23` aunque hubo cambios sustanciales posteriores en títulos, canonicals, structured data y enlaces. El código usa una sola constante para las nueve páginas.

**Impacto:** medio. Google solo usa `lastmod` cuando es consistente y verificablemente preciso. Una fecha repetida e inexacta puede terminar ignorada.

**Acción:** mantener una fecha de última modificación por página, derivada del contenido o del proceso de publicación. Si no se puede garantizar precisión, es preferible omitir `lastmod` antes que falsearlo. Google ignora `priority` y `changefreq`, de modo que no deben ocupar esfuerzo operativo.

Referencia: [documentación oficial de sitemaps de Google](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

### 4.3 P2 — Falta verificar indexación real en Search Console

**Evidencia:** el rastreo técnico es correcto, pero un sitemap accesible no demuestra que todas las URLs estén indexadas ni que Google haya elegido la canonical declarada.

**Acción:** crear propiedades de dominio o URL-prefix para ambos hosts y revisar:

- páginas indexadas frente a las nueve esperadas;
- “Duplicada: Google eligió una canonical diferente”;
- rastreada/descubierta, actualmente sin indexar;
- sitemap leído y última fecha de procesamiento;
- inspección individual después de cada despliegue importante.

---

## 5. SEO on-page

### 5.1 Fortalezas

- Todas las páginas tienen title, description, canonical y una sola H1.
- Titles y descriptions son únicos por URL.
- Las descripciones están dentro de una longitud razonable.
- El idioma raíz se declara como español.
- Las URLs son cortas, legibles, minúsculas y sin parámetros.
- No se encontraron imágenes sin atributo `alt`.

### 5.2 P1 — Titles institucionales sin intención no marcaria

Los titles `Únete`, `Contacto`, `Nuestro Equipo` y `Advisory Board` identifican la página, pero dicen poco sobre la necesidad del usuario. Google recomienda usar términos que las personas utilizarían al buscar y situarlos en title, encabezado principal, enlaces y alt text.

Referencia: [Google Search Essentials](https://developers.google.com/search/docs/essentials).

| URL | Title actual | Propuesta orientativa |
|---|---|---|
| `/somos` | Quiénes Somos | Organización juvenil en Chile: misión y comunidad |
| `/equipo` | Nuestro Equipo | Jóvenes líderes en Chile: equipo y experiencia |
| `/advisory-board` | Advisory Board | Mentores de liderazgo, innovación y emprendimiento juvenil |
| `/unete` | Únete | Voluntariado juvenil en Chile: participa y lidera proyectos |
| `/contacto` | Contacto | Alianzas para proyectos y liderazgo juvenil en Chile |
| Congreso `/` | 74 caracteres y doble sufijo de sitio | Congreso juvenil en Chile: liderazgo, innovación y emprendimiento |

Las propuestas requieren validar consultas en Search Console. No conviene imponer una keyword si cambia el propósito real de la página.

### 5.3 P1 — Título del Congreso en producción aún es demasiado largo

**Producción:** `Congreso HiveYoung | El evento juvenil más importante de Chile | HiveYoung` (74 caracteres).

**Código local:** ya usa un title absoluto más claro y evita la repetición final.

**Acción:** desplegar la versión local y solicitar reindexación.

Google puede reescribir titles cuando existe repetición o falta coherencia entre title, heading y contenido visible. Referencia: [buenas prácticas para title links](https://developers.google.com/search/docs/appearance/title-link).

### 5.4 P1 — Jerarquía de encabezados incompleta

Historia, Advisory y Contacto no tienen H2 en el HTML publicado. Historia utiliza H3 para los hitos; Advisory y Contacto dependen en exceso del diseño visual.

**Impacto:** medio. No bloquea indexación, pero reduce la claridad semántica, la navegación asistiva y la capacidad de que cada sección capture subtemas.

**Acción:** estructurar el contenido con H2 descriptivos y H3 subordinados. Ejemplos:

- Historia: `Orígenes`, `Primeros proyectos`, `Congreso 2025`, `Crecimiento de la comunidad`.
- Advisory: `Mentoría estratégica`, `Innovación y emprendimiento`, `Educación y políticas públicas`.
- Contacto: `Alianzas institucionales`, `Prensa`, `Voluntariado`.

### 5.5 P2 — H1 de Somos poco visible semánticamente

El H1 existe como contenido solo para lectores de pantalla. La frase visual principal funciona como H2. No es necesariamente incorrecto, pero la señal principal debería ser consistente entre el title, el H1 y el título visual.

**Acción:** convertir el título visible de la página en H1 o asegurar que el H1 oculto exprese exactamente la intención principal, sin separadores de title como `|`.

---

## 6. Contenido y cobertura de demanda no marcaria

### 6.1 Hallazgo principal: el sitio carece de páginas que respondan búsquedas genéricas

El dominio explica identidad, equipo e historia. No dispone de páginas dedicadas a:

- proyectos ejecutados y casos de estudio;
- resultados e impacto medido;
- programa de voluntariado, requisitos, proceso y dedicación;
- formación en liderazgo juvenil;
- guías para crear proyectos juveniles;
- oportunidades, fondos, eventos o redes para jóvenes;
- alianzas con colegios, universidades y empresas;
- aprendizajes, datos o investigaciones sobre juventudes.

La competencia sí organiza contenido en iniciativas, áreas de impacto, programas y recursos. En la revisión exploratoria, INJUV aparece con una guía de más de 260 programas; Fundación Movámonos explica propósito, pilares e iniciativas; Adolescente Impacta desarrolla áreas de impacto y participación; Cruz Roja Juventud publica programas específicos. No basta con repetir “liderazgo juvenil”: se necesita una página que resuelva la intención mejor que esos resultados.

Google prioriza contenido útil, fiable y creado para personas, con valor sustancial frente a otras páginas. Referencia: [guía de contenido útil de Google](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).

### 6.2 Mapa inicial de keywords no marcarias

Este mapa expresa relevancia e intención; no incluye volumen ni dificultad.

| Cluster | Intención | Página destino recomendada | Estado |
|---|---|---|---|
| organización juvenil Chile | Descubrir/comparar | Home + Somos | Cobertura parcial |
| liderazgo juvenil Chile | Aprender/participar | `/liderazgo-juvenil` o programa | Sin página dedicada |
| voluntariado juvenil Chile | Participar | `/unete/voluntariado-juvenil` | Cobertura superficial |
| voluntariado para jóvenes en Santiago | Participar/local | Página de convocatoria | Sin página dedicada |
| proyectos juveniles Chile | Inspiración/alianza | `/proyectos` | Sin página |
| cómo crear un proyecto juvenil | Informacional | Guía editorial | Sin contenido |
| emprendimiento juvenil Chile | Aprender/red | Hub temático | Sin página dedicada |
| innovación juvenil Chile | Aprender/red | Hub temático | Sin página dedicada |
| red de jóvenes líderes Chile | Comunidad | Página de comunidad | Cobertura parcial |
| congreso juvenil Chile | Evento | Congreso `/` | Cobertura buena, title mejorable |
| evento para jóvenes en Santiago | Evento/local | Próxima edición | La página actual prioriza un evento pasado |
| participación juvenil Chile | Informacional | Informe/guía | Sin contenido |
| oportunidades para jóvenes Chile | Descubrir | Directorio o newsletter | Sin contenido |

### 6.3 Arquitectura editorial recomendada

```text
/
├── /somos
├── /proyectos
│   ├── /proyectos/congreso-juvenil-2025
│   └── /proyectos/[caso-de-estudio]
├── /impacto
├── /unete
│   ├── /unete/voluntariado-juvenil
│   └── /unete/alianzas
├── /recursos
│   ├── /recursos/liderazgo-juvenil
│   ├── /recursos/proyectos-juveniles
│   └── /recursos/oportunidades-para-jovenes
└── /contacto
```

No se recomienda publicar decenas de artículos débiles. Es mejor lanzar cuatro páginas pilares con evidencia propia y luego ampliar según impresiones reales.

### 6.4 Primeros contenidos a publicar

1. **Voluntariado juvenil en Chile: cómo participar, requisitos y experiencia.** Incluir proceso, edades, horas, calendario, roles, testimonios y preguntas frecuentes.
2. **Proyectos juveniles con impacto: casos, metodología y resultados.** Una ficha por proyecto con problema, solución, participantes, aliados, métricas y aprendizajes.
3. **Guía práctica para crear un proyecto liderado por jóvenes.** Contenido original basado en experiencia del equipo, no una recopilación genérica.
4. **Liderazgo juvenil en Chile: habilidades, oportunidades y redes.** Definiciones, ejercicios, programas, cifras y enlaces a recursos públicos.
5. **Página de impacto.** Metodología de medición, periodo, fuentes, indicadores, aliados y resultados auditables.

---

## 7. Arquitectura y enlazado interno

### 7.1 Fortalezas

- Las siete páginas principales están a uno o dos clics.
- Navbar y footer usan enlaces rastreables.
- La home conecta con el Congreso y con páginas institucionales.
- No hay navegación facetada ni parámetros que generen duplicados.

### 7.2 P1 — Enlazado casi exclusivamente global

El navbar y el footer hacen la mayor parte del trabajo. Faltan enlaces dentro de los textos, donde el contexto ayuda a Google y a la persona a entender la relación entre páginas.

**Acciones:**

- Home → página de proyectos mediante “proyectos juveniles con impacto”.
- Somos → impacto, metodología y alianzas.
- Historia → caso de estudio del Congreso 2025.
- Equipo → proyectos concretos liderados por cada área.
- Únete → convocatoria, roles, requisitos y FAQ.
- Congreso 2025 → perfiles de speakers, memoria del evento y proyectos derivados.

### 7.3 P2 — Anchors demasiado institucionales

Textos como `Somos`, `Historia` o `Advisory` sirven en navegación, pero aportan poco contexto fuera de ella.

**Acción:** usar anchors naturales y descriptivos dentro del contenido, sin sobreoptimización: `conoce nuestros proyectos juveniles`, `revisa los resultados del Congreso 2025`, `participa como voluntario joven`.

---

## 8. Imágenes y rendimiento

### 8.1 P0 — Historia renderiza 119 imágenes para 14 fuentes únicas

**Evidencia:** siete columnas multiplican dos veces la galería y cada columna vuelve a recorrer el conjunto. El HTML resultante pesa 360,8 KB, contiene 119 imágenes, 14 preloads y 78 imágenes lazy. Las imágenes del fondo están dentro de un contenedor `aria-hidden`, pero conservan alt descriptivo repetido.

**Impacto:** alto. Aumenta HTML, hidratación, memoria, solicitudes potenciales, decodificación y competencia por ancho de banda. También introduce ruido semántico y de accesibilidad.

**Acción recomendada:**

- reducir la galería a 14–28 nodos totales;
- crear el efecto continuo mediante transformaciones, virtualización o duplicación mínima;
- dejar `alt=""` en copias decorativas y mantener alt descriptivo solo en la imagen informativa real;
- retirar `priority` de todas salvo la imagen LCP real;
- cargar los paneles posteriores bajo demanda;
- evitar importar plugins GSAP no utilizados desde `gsap/all`.

### 8.2 P1 — Demasiados preloads

| Página | Preloads de imagen |
|---|---:|
| Historia | 14 |
| Equipo | 8 |
| Home | 5 |

El preload debe reservarse para recursos realmente críticos. Marcar muchas imágenes como prioritarias hace que compitan entre sí y puede perjudicar el LCP.

### 8.3 P1 — Carga tipográfica amplia

El layout solicita Poppins en nueve pesos (`100` a `900`) además de Geist y Geist Mono. Aunque `next/font` optimiza entrega y evita llamadas externas en ejecución, esta amplitud aumenta el número potencial de archivos y CSS.

**Acción:** inventariar pesos realmente utilizados, conservar normalmente 3–4, eliminar familias no usadas y comprobar el waterfall después del cambio.

### 8.4 Fortalezas de imágenes

- Ninguna de las nueve páginas contiene imágenes sin atributo alt.
- La mayoría usa `next/image` y Cloudinary.
- Congreso 2025 aplica lazy loading a 20 de 22 imágenes.
- Existe sitemap de imágenes separado por host.
- Las dimensiones de Open Graph son 1200 × 630 en el código local.

### 8.5 Core Web Vitals: medición pendiente

PageSpeed Insights respondió `429` para home, Historia y Congreso. Sin CrUX o Search Console no es válido asignar números de LCP, INP o CLS.

**Objetivos oficiales:** LCP ≤ 2,5 s, INP < 200 ms y CLS < 0,1 en el percentil 75. Referencia: [Core Web Vitals de Google](https://developers.google.com/search/docs/appearance/core-web-vitals).

**Medición requerida:** móvil y escritorio para home, Historia, Únete, Congreso y Congreso 2025; registrar elemento LCP, TTFB, JS no utilizado, trabajo del main thread, imágenes transferidas y comportamiento p75 de usuarios reales.

---

## 9. Datos estructurados

### 9.1 Cobertura observada

El código contiene Organization, AboutPage, ContactPage, ContactPoint, BreadcrumbList, ItemList, Person, ImageObject, FAQPage y Event según la página.

El schema Event publicado ya usa las fechas correctas del 7 y 8 de julio de 2025 y no contiene oferta activa. Esto corrige una inconsistencia histórica relevante.

### 9.2 P1 — El Congreso pasado conserva lenguaje de convocatoria vigente

La FAQ de `/2025` todavía dice que el evento “requiere inscripción previa”, que “los cupos son limitados”, qué debe llevar el asistente y que habrá alimentación. Esa redacción contradice una página que invita a revivir un evento pasado.

**Acción:** reescribir toda la página en pasado y convertir la FAQ en memoria útil: cuántas personas asistieron, qué actividades hubo, quiénes participaron, dónde se realizó, qué resultados dejó y cómo acceder a la próxima edición.

### 9.3 P1 — Consolidar la entidad Organization

**Acciones:**

- añadir un `@id` persistente, por ejemplo `https://www.hiveyoung.org/#organization`;
- referenciar ese `@id` desde Event, Person, AboutPage y ContactPage;
- usar un solo email institucional verificado;
- mantener URL, logo y perfiles sociales idénticos en todas las instancias;
- validar cada despliegue con Rich Results Test y Schema.org Validator.

Google recomienda colocar Organization en la home o en una página que describa la organización; no es necesario repetirlo en todas las páginas. Referencia: [Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization).

### 9.4 P2 — Event histórico con elegibilidad limitada

El markup es semánticamente útil, pero la experiencia enriquecida de eventos se orienta a descubrir y asistir a eventos. Para una edición pasada, la prioridad debe ser una memoria o caso de estudio; la próxima edición debe tener su propia URL estable y schema Event completo.

Referencia: [Event structured data](https://developers.google.com/search/docs/appearance/structured-data/event).

---

## 10. E-E-A-T y confianza

### 10.1 Fortalezas

- Existen páginas de equipo, advisory e historia.
- Las personas se presentan con roles e imágenes.
- Hay menciones externas en universidades y medios que pueden corroborar el Congreso, sus participantes y su propósito.
- Contacto y redes sociales son accesibles.

### 10.2 P1 — Falta una página de impacto verificable

El sitio formula afirmaciones de alcance y liderazgo, pero no reúne método, periodo, fuentes, resultados, instituciones, testimonios y enlaces externos en una página rastreable.

**Acción:** publicar `/impacto` con:

- métricas por año y proyecto;
- definición de cada indicador;
- fuente o mecanismo de cálculo;
- instituciones participantes;
- testimonios identificados y autorizados;
- enlaces a cobertura externa;
- fecha de actualización y responsable editorial.

### 10.3 P1 — Emails inconsistentes

Se usan al menos tres variantes:

- `HiveYoung@gmail.com`;
- `contacto@hiveyoung.org`;
- `contacto@hiveyoung.com` en navegación móvil.

**Impacto:** medio para confianza y conversión. La variante `.com` puede dirigir a un dominio distinto o fallar.

**Acción:** elegir el correo institucional verificado, unificar contenido visible, `mailto`, schema y formularios.

### 10.4 P1 — Términos y Privacidad no son enlaces

El footer muestra ambos textos como `<span>`. Para un sitio que recopila datos en formularios, la ausencia de páginas legales reduce confianza.

**Acción:** publicar políticas reales y enlazarlas con `<a>`/`Link`. Incluir finalidad, datos recogidos, responsable, conservación, terceros, derechos y canal de contacto según asesoría legal aplicable.

### 10.5 P2 — Falta atribución editorial en recursos futuros

Cada guía debería mostrar autor o revisor, experiencia relevante, fecha de publicación, fecha de actualización, fuentes y método. Esto aumenta trazabilidad y evita que el contenido parezca genérico.

---

## 11. SEO local y de eventos

El Congreso tiene intención geográfica clara en Santiago, pero el sitio puede reforzarla sin caer en repetición artificial.

**Acciones:**

- publicar la próxima edición en una URL estable propia;
- incluir recinto, dirección completa, mapa, transporte, accesibilidad y horarios visibles;
- mantener fechas y estado del evento consistentes entre texto, metadata y schema;
- solicitar enlaces desde recinto, universidades, speakers, patrocinadores y medios;
- crear una memoria indexable por edición en lugar de reemplazar la URL anterior;
- usar títulos que combinen tipo de evento, público, ciudad y año cuando corresponda.

---

## 12. Plan de acción priorizado

### Fase 0 — 0 a 7 días

| Prioridad | Acción | Resultado esperado |
|---|---|---|
| P0 | Reducir nodos, priority y preloads de Historia | Menor carga, mejor LCP potencial y menos ruido semántico |
| P1 | Desplegar title absoluto y Open Graph contextual ya preparado localmente | Snippets sociales y title del Congreso coherentes |
| P1 | Convertir FAQ 2025 completamente a pasado | Coherencia visible y semántica |
| P1 | Unificar el email institucional | Mayor confianza y menos pérdida de contactos |
| P1 | Corregir `lastmod` por URL o eliminarlo | Señal de rastreo confiable |
| P1 | Crear y enlazar Privacidad y Términos | Confianza y cumplimiento básico |

### Fase 1 — 8 a 30 días

| Prioridad | Acción | Resultado esperado |
|---|---|---|
| P1 | Publicar `/proyectos` y dos casos de estudio | Nueva superficie para proyectos juveniles e impacto |
| P1 | Ampliar Únete con roles, requisitos, tiempos, proceso y FAQ | Mejor captación de voluntariado juvenil |
| P1 | Publicar `/impacto` con metodología y fuentes | E-E-A-T, conversión institucional y enlaces |
| P1 | Reescribir titles/H1/H2 según intención | Mayor relevancia y CTR potencial |
| P2 | Añadir enlaces contextuales entre páginas | Mejor descubrimiento y distribución de autoridad |
| P2 | Consolidar Organization con `@id` | Entidad más consistente |

### Fase 2 — 31 a 90 días

| Prioridad | Acción | Resultado esperado |
|---|---|---|
| P1 | Lanzar hub `/recursos` con 3–4 guías expertas | Captación informacional no marcaria |
| P1 | Crear landing de la próxima edición del Congreso | Captar intención de evento vigente |
| P2 | Programa de enlaces con aliados y universidades | Mayor autoridad temática y local |
| P2 | Incorporar datos originales y testimonios | Diferenciación frente a contenido genérico |
| P2 | Medir CWV p75 y optimizar plantillas | Mejor experiencia móvil real |

---

## 13. KPIs recomendados

### Search Console

- impresiones y clics excluyendo consultas que contengan el nombre de la entidad o variantes;
- consultas no marcarias en top 3, top 10 y top 20;
- páginas con primeras impresiones no marcarias;
- CTR por intención y por página;
- URLs indexadas frente a URLs indexables;
- canonical elegida por Google;
- resultados enriquecidos válidos y errores de schema.

### Contenido

- clics no marcarios por cluster;
- páginas que generan conversiones asistidas;
- profundidad de scroll en guías y casos;
- enlaces internos recibidos por página pilar;
- dominios aliados que enlazan casos, impacto o Congreso;
- frecuencia de actualización y porcentaje de contenidos con autor/fuentes.

### Conversión

- formularios de voluntariado desde orgánico no marcario;
- contactos de alianzas desde orgánico;
- registros a eventos procedentes de páginas informacionales;
- tasa de conversión por landing y consulta.

### Rendimiento

- LCP p75 ≤ 2,5 s;
- INP p75 < 200 ms;
- CLS p75 < 0,1;
- peso transferido, solicitudes y JavaScript por plantilla;
- cantidad de imágenes y preloads por página.

---

## 14. Conclusión

HiveYoung ya resolvió los problemas técnicos más peligrosos de canonicalización y separación de hosts. El siguiente salto no vendrá de añadir más meta keywords ni de repetir términos en páginas institucionales. Vendrá de publicar evidencia útil y específica: proyectos, metodología, resultados, voluntariado, liderazgo y recursos para jóvenes.

La oportunidad es clara: convertir experiencia real en páginas que resuelvan búsquedas reales. Si se corrige primero Historia y luego se publican cuatro activos fuertes —Proyectos, Impacto, Voluntariado y Liderazgo Juvenil— el sitio tendrá una arquitectura mucho más apta para crecer sin depender de consultas de marca.
