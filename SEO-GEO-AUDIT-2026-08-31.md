# Auditoría integral SEO + GEO — HiveYoung

Fecha de auditoría: 31 de agosto de 2026
Sitios evaluados: `hiveyoung.org`, `congreso.hiveyoung.org` y `brand.hiveyoung.org`
Código evaluado: proyecto Next.js 16 del workspace local

## Actualización tras las correcciones

Los siguientes hallazgos de la auditoría ya quedaron **resueltos en el código** y verificados con compilación de producción y navegador local:

- El schema `Event` de `/congreso` y `/congreso/2025` usa las fechas reales del 7 y 8 de julio de 2025 y ya no publica `EventScheduled`, ofertas ni disponibilidad `InStock` para el evento pasado.
- Se restauró la implementación visual original de `/historia` por solicitud posterior. La corrección del título se mantiene; la optimización de imágenes y del bucle vuelve a figurar como recomendación pendiente de esta auditoría.
- `hiveyoung.org` y `congreso.hiveyoung.org` sirven sitemaps XML, sitemaps de imágenes y referencias de `robots.txt` separados por host.
- El título final de Historia es `Nuestra Historia | HiveYoung`, sin repetir la marca.
- Se corrigieron las erratas “conécta” y “nuestro iniciativas”, además del fallback con género masculino que aparecía en perfiles sin descripción como el de María Ignacia.

Los hallazgos históricos que aparecen a continuación describen el estado observado durante la auditoría original; se conservan como evidencia y trazabilidad.

## 1. Resumen ejecutivo

HiveYoung tiene una base SEO mejor que la de muchos sitios institucionales jóvenes: usa renderizado estático, títulos y descripciones por página, canonicals, Open Graph, Twitter Cards, robots, sitemap, sitemap de imágenes y datos estructurados. Las siete páginas institucionales principales ya aparecen en resultados públicos y el contenido textual es legible por los rastreadores.

Sin embargo, hay cuatro problemas que limitan de forma material el crecimiento orgánico y la visibilidad en buscadores con IA:

1. `brand.hiveyoung.org` no resuelve por DNS. Las ocho páginas del Brand Kit son inaccesibles en producción.
2. Los datos estructurados del Congreso contienen fechas y estados contradictorios. La página “Congreso HiveYoung 2025” declara un evento en julio de 2026 y entradas `InStock`; la portada del Congreso aún marca como programado un evento de julio de 2025.
3. `/historia` genera 119 imágenes para solo 14 fuentes únicas y 14 preloads. Además, el carrusel repetido aparece como contenido duplicado para rastreadores.
4. La estrategia de contenido se limita casi por completo a páginas corporativas. Faltan páginas de programas, proyectos, resultados, casos, recursos y conocimiento que respondan búsquedas no marcarias y las consultas compuestas que usan los sistemas generativos.

### Puntuación diagnóstica

| Área | Puntuación | Estado |
|---|---:|---|
| Rastreo e indexación | 62/100 | Necesita correcciones importantes |
| SEO técnico | 61/100 | Base sólida con fallos puntuales críticos |
| SEO on-page | 76/100 | Bueno, con duplicaciones y semántica mejorable |
| Contenido y E-E-A-T | 56/100 | Insuficiente para crecer en búsquedas no marcarias |
| Imágenes y rendimiento | 48/100 | Principal deuda técnica visible |
| GEO / visibilidad generativa | 58/100 | Entidad clara, pero poca evidencia y cobertura temática |
| **Salud global estimada** | **61/100** | **Base aprovechable; prioridad alta en correcciones P0/P1** |

Estas puntuaciones son un marco de priorización propio, no métricas de Google. No sustituyen datos de Search Console, GA4 o CrUX.

## 2. Alcance y método

Se revisaron:

- Las 17 rutas de contenido del proyecto.
- Metadatos, canonicals, encabezados, enlaces internos y HTML semántico.
- `robots.txt`, sitemap XML y sitemap de imágenes.
- JSON-LD de Organization, AboutPage, ContactPage, Person, ItemList, BreadcrumbList, FAQPage y Event.
- Middleware de dominios y subdominios.
- Imágenes locales, uso de `next/image`, lazy loading, prioridad y responsive images.
- Contenido visible públicamente e indicios de indexación mediante resultados web.
- Compilación de producción de Next.js.
- Preparación para Google AI Overviews/AI Mode y otros sistemas de búsqueda generativa.

### Verificaciones completadas

- La compilación de producción finaliza correctamente.
- Las 17 rutas de contenido se prerenderizan como páginas estáticas.
- La home renderizada tiene un canonical correcto, una sola H1 y Organization JSON-LD.
- `/historia` renderiza 119 imágenes, 14 fuentes únicas y 14 preloads.
- Las siete páginas institucionales principales aparecen públicamente descubiertas.
- `brand.hiveyoung.org` devuelve `ERR_NAME_NOT_RESOLVED`.
- El resultado público de `/historia` muestra el título duplicado “Nuestra Historia | HiveYoung | HiveYoung”.

### Limitaciones

No se tuvo acceso a:

- Google Search Console: cobertura real, consultas, posiciones, enlaces y Core Web Vitals de campo.
- GA4: tráfico orgánico, engagement, conversiones y landing pages.
- Bing Webmaster Tools.
- Perfil de backlinks de Ahrefs/Semrush/Majestic.
- Volumen y dificultad de palabras clave.
- Métricas Lighthouse/PageSpeed reproducibles para todas las plantillas.

Por lo tanto, las oportunidades de keywords propuestas son hipótesis estratégicas y deben validarse con GSC y una herramienta de demanda.

## 3. Hallazgos críticos y de alta prioridad

### P0 — El subdominio de marca no existe públicamente

**Evidencia:** `brand.hiveyoung.org` no resuelve por DNS. El middleware redirige cualquier URL `hiveyoung.org/brand...` hacia ese subdominio.

**Impacto:** crítico. Ocho páginas quedan inaccesibles para usuarios y rastreadores. Los enlaces o menciones externas hacia el Brand Kit terminan en error y no transfieren valor.

**Corrección:** crear/verificar el registro DNS y asociar el dominio al deployment. Después comprobar HTTPS, 200, canonical, sitemap y Search Console. Si el Brand Kit aún no debe publicarse, eliminar temporalmente la redirección y marcar las rutas como `noindex` hasta el lanzamiento.

### P0 — Schema Event contradictorio y desactualizado

**Evidencia:**

- `/congreso` declara `startDate: 2025-07-07`, `endDate: 2025-07-08`, `EventScheduled` y oferta `InStock`.
- `/congreso/2025` se titula “Congreso HiveYoung 2025”, pero declara fechas `2026-07-07` y `2026-07-08`, `EventScheduled` e `InStock`.
- La página 2025 se presenta como retrospectiva (“Revive”), no como un evento futuro disponible.

**Impacto:** crítico para confianza de máquina, rich results y GEO. El marcado no coincide con el contenido visible ni con el estado real del evento.

**Corrección:**

- En `/congreso/2025`, usar las fechas reales de 2025 y eliminar la oferta activa. Mantenerlo como archivo histórico con contenido retrospectivo.
- En `/congreso`, decidir si representa la edición vigente o una landing general. Si la edición 2026 ya ocurrió, no anunciar disponibilidad; si existe una edición futura, crear una URL propia por año con fechas, lugar y oferta reales.
- Omitir `eventStatus` cuando no sea necesario o usar únicamente el estado que refleje la realidad.
- Validar ambos JSON-LD en Rich Results Test tras publicar.

### P0 — Exceso extremo de imágenes y preloads en `/historia`

**Evidencia:** 119 elementos `<img>`, 14 imágenes únicas y 14 `link rel=preload`. El componente duplica las galerías dentro de siete columnas y vuelve a duplicar cada secuencia para crear el loop.

**Impacto:** alto/crítico en móviles: consumo de red, memoria, decodificación, DOM, LCP e INP. También crea una representación rastreable repetitiva; el buscador público extrajo decenas de repeticiones de las mismas imágenes antes de llegar al contenido principal.

**Corrección:**

- Renderizar un máximo de 14–28 imágenes, no 119.
- Construir la ilusión de continuidad mediante transformaciones/reutilización visual, pseudo-elementos o virtualización, sin duplicar el contenido semántico.
- Marcar la galería decorativa con `alt=""`, `aria-hidden="true"` y evitar que cada copia sea una entidad informativa repetida.
- Precargar solo la imagen LCP real. Eliminar `priority` de todas las imágenes fuera del primer viewport.
- Mantener lazy loading para el resto y limitar `sizes` al ancho real.

### P1 — Sitemap mezcla hosts diferentes

**Evidencia:** `https://hiveyoung.org/sitemap.xml` incluye páginas de `https://congreso.hiveyoung.org`; el sitemap de imágenes hace lo mismo con su `<loc>`.

**Impacto:** alto. Un sitemap debe estar asociado al host que cubre, salvo configuraciones específicas mediante Search Console. El Congreso carece de una señal limpia e independiente de descubrimiento.

**Corrección:**

- Sitemap de `hiveyoung.org`: solo URLs del dominio principal.
- Sitemap de `congreso.hiveyoung.org`: `/` y `/2025` en ese host.
- Sitemap de `brand.hiveyoung.org`: solo las rutas de marca, si deben indexarse.
- Cada host debe servir su propio `robots.txt` con su sitemap.
- Enviar cada propiedad/dominio en Search Console.

### P1 — Todas las páginas de Brand heredan el mismo canonical y metadata

**Evidencia:** solo `app/brand/layout.tsx` exporta metadata. Las páginas `/brand/logo`, `/brand/color`, `/brand/tipografia`, `/brand/voice`, `/brand/ilustraciones`, `/brand/submarcas` y `/brand/uso` no tienen metadata propia. Heredan título, descripción y canonical `https://brand.hiveyoung.org`.

**Impacto:** alto cuando el DNS vuelva a funcionar. Las páginas hijas indicarán que la raíz es la versión preferida, por lo que Google puede excluirlas como duplicadas. También compartirán el mismo title y description.

**Corrección:** dar a cada ruta title, description, canonical y Open Graph propios. Alternativa: si no se desea posicionarlas individualmente, noindexarlas conscientemente y concentrar todo el contenido indexable en la portada.

### P1 — Título duplicado en Historia

**Evidencia:** la página define `title: "Nuestra Historia | HiveYoung"` y el layout añade la plantilla `| HiveYoung`. El resultado real es “Nuestra Historia | HiveYoung | HiveYoung”.

**Impacto:** medio/alto en CTR, calidad del snippet y consistencia de marca.

**Corrección:** definir `title: "Nuestra Historia"` o usar `title.absolute` si se quiere controlar el string completo. Aplicar el mismo criterio a todas las páginas.

## 4. Rastreo, indexación y arquitectura

### Fortalezas

- `robots.txt` permite rastreo y enlaza sitemaps.
- Las páginas principales usan canonicals absolutos.
- La navegación principal y el footer enlazan las páginas institucionales.
- La arquitectura del dominio principal es plana: las páginas clave están a uno o dos clics.
- El contenido está prerenderizado; no depende exclusivamente de JavaScript cliente para existir.
- No se detectan parámetros, facetas o paginaciones que desperdicien presupuesto de rastreo.

### Problemas

1. El sitemap principal omite todas las páginas de Brand y mezcla el subdominio Congreso.
2. Las fechas `lastModified` son idénticas para todas las URLs. Deben reflejar cambios reales o eliminarse.
3. El comportamiento `www` → no-www no está garantizado por el código. Confirmar una única redirección 301 a `https://hiveyoung.org`.
4. Faltan páginas legales reales. El footer muestra “Términos” y “Privacidad” como texto no enlazado.
5. No hay página 404 personalizada visible en el inventario; Next genera `_not-found`, pero conviene revisar su utilidad y enlaces.
6. La convención `middleware.ts` está deprecada en Next.js 16; la compilación recomienda migrar a `proxy`. No es hoy un problema SEO directo, pero sí deuda de mantenimiento.

### Recomendación de arquitectura

Dominio principal:

- `/`
- `/somos`
- `/historia`
- `/equipo`
- `/advisory-board`
- `/impacto`
- `/proyectos/`
- `/programas/`
- `/recursos/` o `/blog/`
- `/prensa/`
- `/unete`
- `/contacto`
- `/privacidad`
- `/terminos`

Congreso:

- `congreso.hiveyoung.org/` como edición vigente o hub.
- `congreso.hiveyoung.org/2025` como archivo histórico.
- Una URL estable por edición futura.

## 5. SEO on-page

### Titles y descriptions

**Bueno:** home, Somos, Equipo, Advisory, Únete y Contacto tienen titles y descriptions diferenciados. Los titles son claros y los canonicals están presentes.

**A corregir:**

- Historia duplica la marca en el title.
- Brand repite title/description/canonical en todas las rutas.
- Se reutiliza una única imagen Open Graph para casi todas las páginas. Crear imágenes específicas mejora relevancia y CTR social.
- Algunas afirmaciones superlativas (“principal”, “más grande”, “más importante”) carecen de evidencia visible.
- `keywords` meta existe en layouts, pero no aporta valor de ranking moderno; no es perjudicial, aunque no merece mantenimiento prioritario.

### Encabezados

- Las páginas principales tienen una H1.
- La home usa una H1 accesible correcta, aunque el texto visual animado deja un carácter `|` en la extracción.
- `/equipo` repite el nombre de cada persona en varios encabezados y mezcla H3/H4 para nombre y cargo. Simplificar cada tarjeta a un único heading del nivel correcto.
- `/historia` salta de H1 a H3 en los hitos. Usar H2 para los hitos principales.
- En la home, “¿Quiénes somos?” funciona como badge, mientras la declaración principal es H2. La jerarquía es aceptable, pero podría ser más explícita para la intención “organización juvenil en Chile”.

### Calidad lingüística

Errores detectados:

- “conécta” debe ser “conecta”.
- “impulsar nuestro iniciativas” debe ser “impulsar nuestras iniciativas”.
- Revisar concordancia de género en perfiles, por ejemplo “María Ignacia… Apasionado”.
- Unificar “HiveYoung@gmail.com”, `contacto@hiveyoung.org` y el enlace erróneo `contacto@hiveyoung.com`.

Estos detalles afectan profesionalismo, confianza y extracción fiable de entidades.

### Enlazado interno

La navegación institucional es correcta, pero faltan enlaces contextuales dentro del contenido. Recomendaciones:

- Desde Somos, enlazar misión/impacto a proyectos y programas concretos.
- Desde Historia, enlazar el Congreso 2025, aliados y resultados.
- Desde Equipo y Advisory, enlazar perfiles, entrevistas o iniciativas lideradas.
- Desde Congreso, enlazar claramente a HiveYoung, Únete e Impacto.
- Crear breadcrumbs visibles además del JSON-LD cuando aporten navegación.

## 6. Contenido, autoridad y E-E-A-T

### Fortalezas

- Entidad y propósito claros.
- Historia fundacional concreta.
- Personas reales con roles, biografías, imágenes y algunos perfiles de LinkedIn.
- Advisory Board con nombres e instituciones reconocibles.
- Datos propios valiosos: más de 2.000 asistentes y más de 30 instituciones en el Congreso.
- Información de contacto visible.

### Debilidades

- No existe una página de impacto que explique cómo se midieron los resultados.
- No hay fuentes, notas de prensa, memorias, reportes, testimonios o enlaces a evidencia externa.
- No hay páginas detalladas de programas/proyectos, salvo el Congreso.
- No hay autores, revisores, fechas de publicación/actualización ni política editorial.
- No hay páginas legales enlazadas.
- Las afirmaciones de liderazgo de mercado no están justificadas.
- La huella indexable actual está dominada por búsquedas de marca y páginas corporativas.

### Contenidos prioritarios

1. **Página Impacto:** métricas, metodología, año, alcance geográfico, instituciones, horas de voluntariado, proyectos y resultados.
2. **Páginas de proyectos/programas:** objetivo, público, fechas, resultados, equipo, aliados, fotografías y CTA.
3. **Caso Congreso 2025:** agenda, speakers, datos, testimonios, cobertura y aprendizajes.
4. **Sala de prensa:** logos, boilerplate, contacto de prensa, menciones y comunicados.
5. **Recursos para jóvenes:** guías originales sobre liderazgo, emprendimiento, voluntariado, innovación social y construcción de proyectos.
6. **Informes anuales:** PDF accesible y versión HTML resumida.
7. **Perfiles de autores/líderes:** experiencia verificable y contenidos firmados.

## 7. Auditoría GEO / buscadores con IA

### Diagnóstico

GEO no requiere “trucos” especiales: la elegibilidad depende primero de indexación, contenido útil, señales de confianza, estructura técnica clara y capacidad de citar hechos. Google indica que SEO sigue siendo la base de sus funciones generativas y que no hace falta un schema especial ni archivos de IA adicionales.

HiveYoung es relativamente fácil de identificar como entidad, pero hoy ofrece poca información citable fuera de su propia presentación corporativa. Los modelos pueden responder “qué es HiveYoung” y “quién forma parte”, pero tienen menos material para preguntas como:

- ¿Qué organizaciones juveniles existen en Chile?
- ¿Qué programas apoyan a jóvenes líderes o emprendedores?
- ¿Cuáles fueron los resultados del Congreso HiveYoung?
- ¿Cómo participar en proyectos juveniles en Chile?
- ¿Qué iniciativas de liderazgo juvenil tienen evidencia de impacto?

### Fortalezas GEO

- Organization JSON-LD global.
- `sameAs` hacia Instagram y LinkedIn.
- AboutPage, ContactPage, Person, Breadcrumb, FAQ y Event schema.
- Contenido importante disponible en texto.
- FAQ en Únete y Congreso.
- Datos y nombres concretos.
- Imágenes con alt descriptivo en equipos, advisors, historia y Congreso.

### Debilidades GEO

1. Schema Event incorrecto: reduce confianza de máquina.
2. Claims superlativos sin evidencia o atribución.
3. Información de contacto inconsistente.
4. Falta de corroboración externa y citas.
5. Cobertura temática estrecha; casi no existen respuestas a búsquedas no marcarias.
6. Historia produce ruido duplicado antes del contenido principal.
7. Brand Kit inaccesible y con canonicals incorrectos.
8. No hay fechas de actualización ni responsables editoriales.
9. No hay página central de hechos (`Organization`/“Sobre HiveYoung”) con métricas verificables y definiciones concisas.

### Recomendaciones GEO concretas

- Crear bloques breves de respuesta al inicio de páginas informativas: definición, público, ubicación, fecha, resultados y cómo participar.
- Publicar datos propios con unidad, periodo, metodología y fuente.
- Añadir citas y enlaces a instituciones aliadas, cobertura de prensa y perfiles oficiales.
- Mantener consistencia absoluta de nombre, correo, URL, fechas, cargos y métricas entre HTML, JSON-LD, redes y perfiles externos.
- Crear páginas profundas para cada proyecto en vez de una sola narrativa corporativa.
- Usar tablas, listas y FAQs cuando ayuden a responder preguntas reales, sin fabricar páginas para cada variante de consulta.
- Medir menciones/clics de IA mediante Search Console y analítica; etiquetar campañas cuando plataformas lo permitan.
- No priorizar `llms.txt`: la guía oficial de Google indica que no es necesario para aparecer en sus experiencias generativas. Puede considerarse experimentalmente, pero después de resolver lo crítico.

## 8. Datos estructurados

| Tipo | Estado | Evaluación |
|---|---|---|
| Organization | Presente globalmente | Bueno; mejorar identidad y contacto coherente |
| AboutPage | Presente en Somos | Bueno |
| ContactPage | Presente | Bueno; unificar email |
| BreadcrumbList | Presente en páginas institucionales | Bueno; valorar breadcrumbs visibles |
| ItemList + Person | Equipo/Advisory | Útil; revisar duplicación semántica de headings |
| FAQPage | Únete y Congreso 2025 | Correcto si todas las respuestas son visibles y coinciden |
| Event | Congreso | **Crítico: fechas, estado y oferta inconsistentes** |
| ImageObject | Historia | Útil, pero el exceso visual/DOM contrarresta el beneficio |

Mejoras de Organization:

- Usar un `@id` estable, por ejemplo `https://hiveyoung.org/#organization`.
- Reutilizar ese `@id` desde páginas, eventos y personas.
- Añadir `legalName` solo si corresponde legalmente.
- Añadir dirección/área atendida cuando sea apropiado y público.
- Añadir perfiles oficiales relevantes a `sameAs`.
- Mantener un único email principal bajo el dominio propio.

## 9. Imágenes y rendimiento

### Inventario local

- 31 imágenes en `public/`.
- Peso total local aproximado: 5,34 MB.
- Archivo más pesado: `degraded.webp`, 1,89 MB.
- PNG pesados: `Colaborar.png` 960,9 KB; `Articular.png` 579,6 KB; `Captar.png` 367,5 KB; `Proyectos.png` 250,7 KB.

### Alt text

- No se encontraron imágenes sin atributo `alt` en home o Historia renderizadas.
- La home tiene 11 imágenes con `alt=""`; en su mayoría son dibujos decorativos y el uso es correcto si permanecen `aria-hidden`.
- Las imágenes informativas de equipo, advisors, historia y Congreso usan textos descriptivos.

### Responsive y CLS

- `next/image` genera `srcset` en las imágenes relevantes.
- Las imágenes con `fill` no exponen width/height HTML, por lo que el contenedor debe mantener `aspect-ratio` o dimensiones estables en todos los breakpoints.
- Verificar CLS real en Search Console; no inferirlo solo desde el markup.

### Prioridad y lazy loading

- Hay uso excesivo de `priority`: todos los miembros de Dirección Ejecutiva, varias galerías y todos los paneles de Historia se marcan como prioritarios.
- La home precarga dos SVG decorativos. Solo debe priorizarse el recurso LCP real.
- En Historia se observaron 14 preloads de imagen; reducir a uno.

### Plan de optimización de activos

1. Comprimir/convertir los cuatro PNG grandes a WebP/AVIF y conservar PNG solo cuando la transparencia lo justifique.
2. Reducir `degraded.webp` por debajo de 200–300 KB si es hero/banner; actualmente supera ampliamente el umbral recomendado.
3. Crear variantes responsivas reales para fondos grandes.
4. Usar Cloudinary con `f_auto,q_auto,w_...` de forma consistente.
5. Eliminar `priority` fuera del primer viewport.
6. Auditar tamaños transferidos reales desde producción y no solo el archivo fuente.
7. Mantener nombres descriptivos, minúsculas y guiones en nuevos activos. Evitar espacios y nombres genéricos.

## 10. Keywords y mapa de intención propuesto

Validar con GSC y una herramienta de demanda antes de producir contenido a escala.

| Clúster | Intención | Página objetivo recomendada |
|---|---|---|
| organización juvenil Chile | Descubrimiento institucional | Home / Somos |
| liderazgo juvenil Chile | Informativa/comunidad | Hub de liderazgo juvenil |
| programas para jóvenes líderes | Participación | Programas |
| emprendimiento juvenil Chile | Informativa/participación | Programa o guía específica |
| voluntariado juvenil Chile | Participación | Únete + página de voluntariado |
| congreso juvenil Chile | Evento | Congreso vigente |
| evento para jóvenes Santiago | Evento/local | Congreso vigente |
| proyectos juveniles con impacto | Informativa | Proyectos + Impacto |
| innovación social juvenil | Informativa | Recursos/casos |
| red de jóvenes líderes | Comunidad | Somos / Únete |

Evitar canibalización: Home debe presentar la entidad; Somos debe explicar propósito y organización; Únete debe captar participación; cada programa debe posicionar su intención específica; Congreso debe concentrar búsquedas del evento.

## 11. Plan de acción priorizado

### Primeras 72 horas

1. Corregir o desactivar la redirección a `brand.hiveyoung.org` hasta que el DNS funcione.
2. Corregir ambos Event JSON-LD y retirar ofertas/estado incorrectos.
3. Corregir el title de Historia.
4. Separar los sitemaps por host.
5. Eliminar la mayoría de los preloads/`priority` de Historia.
6. Corregir `contacto@hiveyoung.com` y unificar el correo oficial.
7. Corregir errores ortográficos y de concordancia visibles.

### Semana 1–2

1. Reducir las 119 imágenes de Historia a una implementación visual mucho más ligera.
2. Crear metadata y canonicals únicos para todas las rutas Brand, o noindexarlas.
3. Optimizar los cinco activos locales más pesados.
4. Crear páginas de Privacidad y Términos y enlazarlas.
5. Validar schema con Rich Results Test.
6. Confirmar redirecciones HTTP→HTTPS, www→no-www y headers con un crawler técnico.
7. Enviar sitemaps corregidos a Search Console por host.

### Mes 1

1. Publicar página de Impacto con datos verificables.
2. Publicar páginas individuales de programas y proyectos.
3. Convertir Congreso 2025 en un caso/archivo completo.
4. Crear sala de prensa y evidencia externa.
5. Definir mapa de keywords con datos reales de GSC.
6. Añadir métricas de conversión SEO/GEO: solicitudes, formularios, inscripciones y alianzas.

### Mes 2–3

1. Lanzar un hub editorial de recursos originales.
2. Publicar 2–4 contenidos de alta calidad por mes, firmados y actualizados.
3. Desarrollar enlaces desde aliados, colegios, universidades, instituciones y medios.
4. Actualizar contenidos y datos estructurados con un proceso editorial.
5. Comparar rendimiento clásico vs. generativo en Search Console cuando el informe esté disponible para la propiedad.

## 12. KPIs recomendados

### SEO técnico

- URLs válidas/indexadas vs. enviadas.
- Errores de sitemap y canonical.
- LCP, INP y CLS por plantilla.
- Páginas con title/description duplicados.
- Imágenes y bytes transferidos por página.

### Visibilidad orgánica

- Impresiones y clics no marcarios.
- Top 20 queries por clúster.
- Número de keywords en top 3, top 10 y top 20.
- CTR por página/query.
- Conversiones orgánicas: Únete, contacto, alianzas e inscripciones.

### GEO

- Impresiones/clics desde funciones generativas en Search Console cuando estén disponibles.
- Landing pages citadas o enlazadas desde experiencias generativas.
- Consultas conversacionales que activan impresiones.
- Menciones de marca verificables en herramientas de IA, registradas con fecha, país y prompt.
- Conversiones asistidas por referencias generativas.

## 13. Fuentes de referencia

- Google Search Central: [Optimizing your website for generative AI features on Google Search](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- Google Search Central: [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- Google Search Central: [Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- Google Search Central: [Search Essentials](https://developers.google.com/search/docs/essentials)

## 14. Conclusión

La web no parte de cero: su renderizado, metadata, entidad, estructura institucional y schema general son una base valiosa. El problema principal no es “falta de etiquetas SEO”, sino inconsistencia técnica y falta de profundidad demostrable. Resolver DNS, schemas del Congreso, sitemaps y la carga de Historia debe preceder cualquier campaña de contenidos. Después, el mayor crecimiento vendrá de convertir la experiencia real de HiveYoung —proyectos, personas, aliados, resultados y aprendizajes— en páginas originales, verificables y fáciles de citar tanto por buscadores tradicionales como por sistemas generativos.
