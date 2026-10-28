# Auditoría SEO de la website principal de HiveYoung

**Fecha:** 15 de octubre de 2026

**Dominio auditado:** `https://www.hiveyoung.org`

**Alcance:** toda la website institucional principal, no solamente su portada.

## Alcance exacto

### URLs incluidas

- `https://www.hiveyoung.org/`
- `https://www.hiveyoung.org/somos`
- `https://www.hiveyoung.org/historia`
- `https://www.hiveyoung.org/equipo`
- `https://www.hiveyoung.org/advisory-board`
- `https://www.hiveyoung.org/unete`
- `https://www.hiveyoung.org/contacto`

### Fuera de alcance

- `congreso.hiveyoung.org`
- `/congreso` y `/congreso/2025`
- Otros subdominios, incluida la plataforma de marca
- Analítica, campañas pagadas y redes sociales

## Resumen ejecutivo

La website principal tiene una base técnica razonablemente sólida: las siete URLs públicas responden correctamente, son indexables, tienen canonical autorreferente, sitemap, robots.txt, metadatos sociales y renderizado HTML estático. No se encontró un bloqueo crítico que impida a Google rastrear o indexar las páginas principales.

El mayor potencial de mejora está en la relevancia on-page, la profundidad de algunas páginas y el peso del frontend. Los problemas más importantes son:

1. **Contenido importante de la portada excluido de los snippets.** Cinco bloques usan `data-nosnippet`, incluida la definición de la organización y la explicación de sus áreas de trabajo. Esto reduce el texto que Google puede seleccionar para describir la página en resultados de búsqueda.
2. **Títulos poco descriptivos en seis de las siete páginas.** Son correctos, pero demasiado breves y genéricos para comunicar tema, ubicación e intención de búsqueda.
3. **Páginas con poco contenido visible.** `/advisory-board`, `/unete` y `/contacto` tienen aproximadamente 49, 74 y 37 palabras visibles, respectivamente. Esto limita la cobertura semántica y la capacidad de responder búsquedas no vinculadas directamente con la marca.
4. **Jerarquía de encabezados irregular.** `/historia` y `/advisory-board` pasan de H1 a H3; `/contacto` no tiene subtítulos de contenido; `/equipo` mezcla H3 y H4 sin una jerarquía consistente.
5. **Carga de JavaScript elevada.** Cada ruta referencia aproximadamente 767–828 KB de JavaScript sin comprimir. Además, `/historia` genera unos 362 KB de HTML y contiene 119 imágenes en el DOM.
6. **Señales de confianza inconsistentes.** Se publican tres variantes de correo electrónico y “Términos” y “Privacidad” aparecen como texto, no como enlaces a páginas legales.

No se asigna una puntuación SEO artificial. La prioridad se basa en impacto potencial, alcance y esfuerzo de implementación.

## Estado por página

| URL | Title actual | Caracteres | Descripción | H1 | Palabras visibles aprox. | Datos estructurados específicos | Prioridad |
|---|---|---:|---:|---:|---:|---|---|
| `/` | HiveYoung \| Principal articulador del ecosistema juvenil | 56 | 152 | 1, pero con texto duplicado en el DOM | 180 | `Organization` | Alta |
| `/somos` | Quiénes Somos \| HiveYoung | 25 | 129 | 1 | 653 | `AboutPage`, `BreadcrumbList` | Media |
| `/historia` | Nuestra Historia \| HiveYoung | 28 | 132 | 1 | 300 | `ItemList`, `BreadcrumbList` | Alta |
| `/equipo` | Nuestro Equipo \| HiveYoung | 26 | 138 | 1 | 258 | `ItemList`, `BreadcrumbList` | Media |
| `/advisory-board` | Advisory Board \| HiveYoung | 26 | 126 | 1 | 49 | `ItemList`, `BreadcrumbList` | Alta |
| `/unete` | Únete \| HiveYoung | 17 | 120 | 1 | 74 | `FAQPage`, `BreadcrumbList` | Alta |
| `/contacto` | Contacto \| HiveYoung | 20 | 118 | 1 | 37 | `ContactPage`, `BreadcrumbList` | Alta |

> Las cifras de palabras corresponden al contenido visible detectado en el navegador. En `/unete`, parte de las respuestas puede permanecer oculta hasta abrir cada acordeón.

## 1. Rastreo e indexación

### Lo que está bien

- Las siete URLs incluidas responden con estado HTTP 200.
- Todas declaran `index, follow` y un canonical correcto hacia su propia URL.
- `robots.txt`, `sitemap.xml` y `sitemap-images.xml` están disponibles.
- El sitemap principal incluye las siete URLs institucionales y no mezcla el sitio con el subdominio del Congreso.
- Las rutas se prerenderizan como páginas estáticas, por lo que el contenido principal no depende exclusivamente de que Google ejecute JavaScript.
- Las páginas están conectadas mediante la navegación principal o el pie de página; no se detectaron páginas huérfanas dentro del alcance.

### Mejoras recomendadas

- **`lastmod` corregido localmente.** La fecha estática (`2026-06-23`) se retiró del sitemap porque el proyecto no dispone de una fuente editorial que garantice fechas reales por URL. La corrección quedará pública con el próximo despliegue.
- **Normalización del dominio reforzada localmente.** El middleware ahora redirige `hiveyoung.org` directamente a `https://www.hiveyoung.org`, conservando ruta y parámetros. Para garantizar un solo salto desde HTTP en producción también debe configurarse `hiveyoung.org` como redirección de dominio hacia `www.hiveyoung.org` en Vercel, ya que la infraestructura procesa HTTP antes que Next.js.
- **Validar el estado real en Google Search Console.** La búsqueda pública permite encontrar las páginas principales, pero no sustituye los informes de indexación, rendimiento y Core Web Vitals de Search Console.

## 2. Titles y metadescripciones

La portada tiene un title descriptivo y una longitud adecuada. En el resto del sitio, los titles identifican la sección, pero no aprovechan términos como “organización juvenil”, “liderazgo juvenil”, “Chile”, “alianzas” o “comunidad”. Esto es una oportunidad de relevancia y de mejor comunicación en la página de resultados.

### Propuestas de title

| URL | Propuesta |
|---|---|
| `/` | Mantener: `HiveYoung \| Principal articulador del ecosistema juvenil` |
| `/somos` | `Organización juvenil en Chile \| Quiénes somos \| HiveYoung` |
| `/historia` | `Historia de HiveYoung y su impacto juvenil en Chile` |
| `/equipo` | `Equipo de jóvenes líderes en Chile \| HiveYoung` |
| `/advisory-board` | `Advisory Board y líderes aliados \| HiveYoung` |
| `/unete` | `Únete a una comunidad de líderes juveniles \| HiveYoung` |
| `/contacto` | `Contacto y alianzas estratégicas \| HiveYoung` |

Las descripciones actuales son únicas y razonables, aunque podrían incorporar mejor el beneficio específico de cada página. No se deben forzar longitudes exactas: Google puede reescribirlas según la consulta.

En `/unete`, la afirmación “la comunidad de liderazgo juvenil más grande de Chile” debe acompañarse de evidencia verificable o reemplazarse por una formulación demostrable. Las afirmaciones absolutas sin respaldo pueden perjudicar la confianza.

## 3. Contenido y relevancia on-page

### Portada

- Cinco áreas están marcadas con `data-nosnippet`. Entre ellas se encuentran la definición de HiveYoung y las descripciones de “Qué hacemos”. Google puede indexar esos contenidos, pero no utilizarlos para construir el snippet. Se recomienda reservar este atributo para información que realmente no deba aparecer en resultados.
- El H1 combina una versión accesible del mensaje con otra versión animada dentro del mismo encabezado. El resultado en el DOM es la frase repetida. Debe existir un solo texto semántico y animarse sus fragmentos sin duplicar el contenido.
- El mensaje principal es inspirador, pero genérico. Conviene que el primer bloque explique explícitamente qué es HiveYoung, dónde opera y para quién existe.

### `/somos`

Es la página con mayor profundidad del sitio —aproximadamente 653 palabras— y cubre misión, visión y valores. Es una buena base para búsquedas informativas sobre la organización.

Mejoras:

- Integrar de forma natural “organización juvenil en Chile” y el tipo de impacto que genera.
- Añadir enlaces contextuales hacia historia, equipo, programas o formas de participación.
- Evitar que los valores sean solo etiquetas; cada uno debe explicar una conducta o resultado concreto.

### `/historia`

Tiene contenido suficiente para explicar la trayectoria, pero presenta el mayor riesgo de rendimiento del sitio: 119 imágenes en el DOM y unos 362 KB de HTML sin comprimir.

Mejoras:

- Incorporar un H2 que agrupe los hitos y usar H3 para cada etapa.
- Reducir la cantidad de imágenes renderizadas inicialmente y cargar galerías o detalles bajo demanda.
- Consolidar elementos repetidos y verificar que cada imagen aporte información.
- Enlazar los hitos relevantes con proyectos, equipo o apariciones verificables cuando existan.

### `/equipo`

La separación entre dirección ejecutiva, coordinadores regionales y directorio facilita la comprensión de la estructura. La página también aporta señales de experiencia y autoridad.

Mejoras:

- Normalizar la jerarquía H2 → H3, sin alternar H4 antes de H3.
- Añadir biografías breves y verificables que expliquen función, experiencia y área de trabajo.
- Incluir en los datos estructurados a las personas relevantes que efectivamente aparecen en la página, manteniendo correspondencia exacta con el contenido visible.

### `/advisory-board`

La página es muy breve y depende casi totalmente de nombres y fotografías. Tiene valor reputacional, pero poca información para usuarios o buscadores.

Mejoras:

- Explicar qué función cumple el Advisory Board, cómo contribuye y qué tipo de experiencia reúne.
- Añadir perfiles breves con cargo, organización y ámbito de experiencia, siempre que sean datos autorizados y actuales.
- Incorporar al menos un H2 antes de los perfiles y usar H3 para los integrantes.
- Enlazar fuentes o perfiles profesionales oficiales cuando corresponda.

### `/unete`

El FAQ y su marcado `FAQPage` son positivos, pero la introducción visible es escasa.

Mejoras:

- Explicar a quién está dirigida la comunidad, qué recibe una persona al participar, requisitos, proceso y modalidades.
- Añadir evidencia de actividad: proyectos, regiones, testimonios verificables o cifras con fecha y fuente.
- Comprobar que todas las preguntas y respuestas del schema coincidan exactamente con el contenido visible y sean accesibles sin depender de interacciones complejas.
- Crear enlaces contextuales desde otras páginas hacia esta conversión, no solo desde la navegación.

### `/contacto`

La página cumple su función básica, pero 37 palabras ofrecen muy poco contexto.

Mejoras:

- Explicar los motivos de contacto: alianzas, participación, prensa, instituciones educativas u otros canales reales.
- Mostrar un único correo institucional coherente en todo el sitio.
- Incorporar datos organizacionales y tiempos de respuesta solamente si pueden mantenerse actualizados.
- Añadir enlaces reales a privacidad y tratamiento de datos junto al formulario.

## 4. Encabezados y estructura semántica

La mayoría de las páginas tienen un solo H1, lo que es correcto. Los problemas aparecen en los niveles secundarios:

- `/historia`: H1 seguido por H3, sin H2.
- `/advisory-board`: H1 seguido por H3, sin H2.
- `/contacto`: no presenta H2 o H3 de contenido.
- `/equipo`: mezcla H4 y H3 de forma inconsistente.

Los niveles de encabezado deben describir la estructura del documento, no usarse por su apariencia visual. La corrección mejora accesibilidad, comprensión y mantenimiento, aunque no constituye por sí sola un factor decisivo de ranking.

## 5. Datos estructurados

### Implementación positiva

- `Organization` global.
- `AboutPage` en `/somos`.
- `ItemList` en `/historia`, `/equipo` y `/advisory-board`.
- `FAQPage` en `/unete`.
- `ContactPage` en `/contacto`.
- `BreadcrumbList` en las páginas internas.

### Recomendaciones

- Mantener una entidad `Organization` autoritativa, idealmente con un `@id` estable, y referenciarla desde las páginas internas en lugar de repetir versiones independientes en todas las rutas.
- Alinear nombre, correo, teléfono, logo y perfiles sociales con la información visible.
- Validar que los datos de personas, hitos y preguntas coincidan con el contenido que ve el usuario.
- No esperar resultados enriquecidos automáticos: el marcado ayuda a Google a comprender entidades, pero no garantiza una presentación especial.

## 6. Imágenes

No se detectaron imágenes sin atributo `alt`. Los `alt=""` parecen corresponder principalmente a elementos decorativos, lo que es correcto si no transmiten información.

Riesgos y mejoras:

- `/historia` contiene 119 imágenes; 78 usan carga diferida, pero la cantidad total sigue siendo alta.
- La portada utiliza imágenes PNG originales relativamente pesadas. Aunque Next.js genera variantes optimizadas, conviene conservar originales eficientes y revisar WebP/AVIF.
- Algunas imágenes de carrusel se solicitan a anchuras grandes. Se deben definir correctamente `sizes` y `srcset` según su tamaño real en pantalla.
- Los carruseles automáticos terminan cargando varias imágenes aunque el usuario no interactúe. Se recomienda precargar solo la primera y diferir las siguientes.
- Los nombres y textos alternativos deberían describir el contenido concreto, evitando repetir palabras clave sin contexto.

## 7. Rendimiento y experiencia

El build de producción finaliza correctamente y todas las rutas auditadas son estáticas. Sin embargo, el volumen de recursos apunta a una oportunidad importante de optimización.

| Ruta | HTML sin comprimir | JavaScript referenciado sin comprimir | CSS sin comprimir |
|---|---:|---:|---:|
| `/` | 50,0 KB | 827,6 KB | 48,1 KB |
| `/somos` | 54,9 KB | 785,6 KB | 40,1 KB |
| `/historia` | 361,8 KB | 824,8 KB | 42,7 KB |
| `/equipo` | 87,6 KB | 774,2 KB | 42,9 KB |
| `/advisory-board` | 42,7 KB | 767,3 KB | 38,1 KB |
| `/unete` | 37,6 KB | 771,4 KB | 37,4 KB |
| `/contacto` | 32,3 KB | 770,2 KB | 36,6 KB |

Estas cifras no equivalen al peso transferido por red, porque el servidor aplica compresión y el navegador comparte caché entre rutas. Sí sirven como señal de complejidad y coste de ejecución.

Recomendaciones:

- Reducir componentes cliente y mantener como servidor todo contenido que no necesite interacción.
- Evitar cargar simultáneamente GSAP y Framer Motion en una misma ruta si las animaciones pueden resolverse con una sola biblioteca.
- Separar por ruta el código de animaciones, formularios y galerías mediante importación dinámica.
- Aplicar `prefers-reduced-motion` para accesibilidad y para evitar trabajo innecesario en dispositivos que lo solicitan.
- Priorizar la imagen principal y diferir imágenes no visibles.
- Medir LCP, INP y CLS con datos de campo desde Search Console o CrUX después de publicar las mejoras.

No se incluye una puntuación Lighthouse porque el servicio de PageSpeed Insights no entregó datos durante la auditoría por límite de cuota. No corresponde inventar ni extrapolar un puntaje.

## 8. Confianza, autoridad y consistencia

El equipo, el directorio y el Advisory Board son activos fuertes para demostrar experiencia y legitimidad. Deben acompañarse de información verificable y actualizada.

Problemas detectados:

- **Correo corregido localmente:** la website principal, sus enlaces y sus datos estructurados ahora utilizan de forma consistente `HIVEYOUNG@GMAIL.COM`. La corrección quedará pública con el próximo despliegue.
- “Términos” y “Privacidad” aparecen como texto no enlazado.
- Algunas afirmaciones de liderazgo o tamaño no muestran fuente, fecha ni metodología.

Acciones:

- Elegir un correo institucional principal y sincronizar footer, navegación, contacto y schema.
- Publicar páginas reales de privacidad y términos, especialmente porque existen formularios.
- Respaldar cifras y superlativos con una fuente fechada o usar formulaciones objetivas.
- Mantener actualizados cargos, perfiles y vínculos externos.

## 9. Plan priorizado

### Prioridad 1 — impacto alto, esfuerzo bajo o medio

1. Retirar `data-nosnippet` de los cinco bloques relevantes de la portada.
2. Corregir el H1 duplicado de la portada.
3. Reescribir los titles de las seis páginas internas y ajustar sus descripciones.
4. Normalizar los encabezados de `/historia`, `/equipo`, `/advisory-board` y `/contacto`.
5. Unificar el correo institucional en contenido, formularios y datos estructurados.
6. Convertir Privacidad y Términos en páginas y enlaces reales.

### Prioridad 2 — impacto alto, esfuerzo medio

1. Ampliar `/advisory-board`, `/unete` y `/contacto` con contenido útil y verificable.
2. Reducir imágenes y HTML de `/historia`.
3. Consolidar la entidad `Organization` mediante un `@id` estable.
4. Mejorar enlaces contextuales entre “Quiénes somos”, historia, equipo y “Únete”.

### Prioridad 3 — rendimiento y crecimiento orgánico

1. Reducir JavaScript cliente y dividir las bibliotecas de animación por ruta.
2. Definir `sizes` correctos y optimizar carruseles y originales de imagen.
3. Añadir compatibilidad con movimiento reducido.
4. Crear contenido editorial basado en preguntas reales sobre liderazgo juvenil, participación, voluntariado y alianzas, siempre fuera de las páginas institucionales cuando el tema lo justifique.

## 10. Medición posterior

Después de implementar los cambios, medir durante al menos 28 días:

- URLs indexadas y problemas de cobertura en Search Console.
- Impresiones, clics, CTR y posición por página y consulta.
- Consultas no vinculadas con la marca.
- LCP, INP y CLS con datos de campo.
- Envíos válidos de los formularios y clics hacia “Únete”.
- Resultados de validación de datos estructurados.

## Conclusión

La website principal de HiveYoung no presenta una emergencia de indexación. Su oportunidad está en convertir una buena base técnica y una identidad visual fuerte en páginas más explícitas, profundas, rápidas y verificables. La secuencia recomendada es: corregir snippets, títulos, H1, encabezados y consistencia institucional; enriquecer las páginas más breves; y finalmente reducir el coste de JavaScript e imágenes.

## Referencias

- Website auditada: <https://www.hiveyoung.org/>
- Google Search Central — snippets: <https://developers.google.com/search/docs/appearance/snippet>
- Google Search Central — datos estructurados de organizaciones: <https://developers.google.com/search/docs/appearance/structured-data/organization>
- Google Search Central — fundamentos técnicos: <https://developers.google.com/search/docs/fundamentals/get-started-developers>
- web.dev — optimización de CLS: <https://web.dev/articles/optimize-cls>
