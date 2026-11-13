# Portafolio Profesional

Portafolio web personal desarrollado para presentar el perfil profesional, habilidades técnicas y proyectos de Manuel Isaac Camaño Díaz.

## Demo

**GitHub Pages:**

https://manuelisaaccamanidiaz-lgtm.github.io/portafolio_profesional/

**Repositorio:**

https://github.com/manuelisaaccamanidiaz-lgtm/portafolio_profesional

## Descripción

Este proyecto es un portafolio profesional web diseñado para presentar de forma clara y visual el perfil de Manuel Isaac Camaño Díaz como desarrollador Full Stack junior y Técnico en Desarrollo de Software e Inteligencia Artificial (Campuslands).

El sitio reúne información personal y profesional, habilidades técnicas, proyectos realizados y diferentes medios de contacto, funcionando como una carta de presentación digital para oportunidades de prácticas profesionales y primeras experiencias laborales.

El repositorio contiene un desarrollo frontend realizado con HTML, CSS y JavaScript vanilla, acompañado de recursos gráficos y del CV en PDF.

## Objetivos

* Presentar el perfil profesional y académico.
* Mostrar las habilidades y tecnologías utilizadas.
* Presentar proyectos desarrollados durante el proceso de formación.
* Facilitar el contacto profesional.
* Contar con una carta de presentación digital accesible desde un navegador.
* Practicar la organización y publicación de un proyecto frontend mediante Git y GitHub.

## Tecnologías utilizadas

| Tecnología       | Uso                                                                                                                                             |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **HTML5**        | Estructura y contenido de las diferentes secciones del portafolio.                                                                              |
| **CSS3**         | Diseño visual, distribución de elementos, animaciones y adaptación a diferentes tamaños de pantalla.                                            |
| **JavaScript**   | Interactividad del menú móvil, cambios de navegación al hacer scroll, animaciones de entrada, texto rotatorio y actualización dinámica del año. |
| **Google Fonts** | Carga de las familias tipográficas Inter y JetBrains Mono.                                                                                      |
| **Git / GitHub** | Control de versiones y almacenamiento del proyecto.                                                                                             |
| **GitHub Pages** | Despliegue del sitio en manuelisaaccamanidiaz-lgtm.github.io/portafolio_profesional.                                                                   |

El proyecto no utiliza frameworks frontend como React, Angular, Vue, Bootstrap o Tailwind CSS.

## Estructura del proyecto

```text
portafolio_profesional/
├── .vscode/
│   └── settings.json
├── assets/
│   ├── cv/
│   │   └── cv-manuel-isaac-camano-diaz.pdf
│   └── img/
│       ├── favicon.ico
│       ├── foto-perfil.jpg
│       ├── og-preview.jpg
│       ├── proyecto-abona.jpg
│       ├── proyecto-acmebank.jpg
│       ├── proyecto-analizador-cv.jpg
│       ├── proyecto-deliverybot.jpg
│       ├── proyecto-rentaherramientas.jpg
│       ├── proyecto-sica.jpg
│       └── proyecto-tienda.jpg
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── README.md
└── index.html
```

### Principales directorios

* **`assets/`**: contiene los recursos utilizados por el portafolio, incluyendo imágenes y el CV utilizado para su descarga desde la página.
* **`assets/img/`**: almacena la fotografía de perfil, favicon, imagen de vista previa y capturas asociadas a los proyectos.
* **`assets/cv/`**: contiene el CV en formato PDF enlazado desde el portafolio.
* **`css/`**: contiene la hoja de estilos principal `styles.css`.
* **`js/`**: contiene `main.js`, encargado de las interacciones dinámicas del sitio.
* **`.vscode/`**: contiene la configuración de Live Server utilizada por el proyecto.
* **`index.html`**: documento principal que contiene la estructura del portafolio.

## Características del portafolio

El sitio está organizado en diferentes secciones orientadas a presentar el perfil profesional:

### Presentación

La sección inicial muestra:

* Fotografía de perfil.
* Nombre.
* Rol profesional.
* Descripción personal.
* Botón para visualizar los proyectos.
* Botón para descargar el CV.

El rol profesional incluye un texto que cambia automáticamente mediante JavaScript. Todo el sitio puede cambiarse entre español e inglés con el botón ES/EN de la barra de navegación.

### Sobre mí

Presenta el perfil profesional, junto con datos de ubicación, formación y disponibilidad para prácticas o primer empleo. El número de repositorios se consulta en la API pública de GitHub.

### Habilidades

Las tecnologías y herramientas se presentan agrupadas en cinco categorías:

| Categoría | Tecnologías |
| --- | --- |
| Backend | Java, Spring Boot, APIs REST y JWT, JUnit |
| Frontend | JavaScript, React, HTML5, CSS3 |
| Bases de datos | PostgreSQL, MySQL, Flyway |
| IA y automatización | Python, LangChain y RAG, Streamlit, n8n |
| Herramientas | Git, GitHub y Gitflow, Docker, Postman, Linux |

### Proyectos

El portafolio presenta cuatro proyectos principales:

1. **RentaHerramientas** (destacado) — Plataforma de alquiler de herramientas con Spring Boot, arquitectura hexagonal y DDD, PostgreSQL con Flyway y seguridad JWT.
2. **Abona** — Agente de IA en Python que asesora la compra de fertilizantes con precios oficiales del DANE.
3. **Analizador de CV con IA** — Aplicación en Python, Streamlit y LangChain que compara currículums con una oferta de empleo.
4. **SICA** — Sistema de control de acceso en Java con arquitectura hexagonal, patrón Strategy y MySQL.

Cada proyecto incluye una captura, descripción, tecnologías utilizadas y enlace al repositorio. Debajo se listan otros proyectos de formación: DeliveryBot, AcmeBank y la tienda de ropa.

### Contacto

La sección de contacto incluye enlaces para:

* Enviar un correo electrónico.
* Acceder a LinkedIn.
* Acceder al perfil de GitHub.

## Diseño y experiencia de usuario

El portafolio utiliza un diseño visual orientado a una presentación profesional, con navegación fija, secciones claramente diferenciadas, tarjetas para los proyectos y elementos visuales de apoyo.

El diseño incluye adaptación para tabletas y dispositivos móviles mediante media queries de CSS. En pantallas pequeñas, la navegación se transforma en un menú hamburguesa controlado mediante JavaScript.

También se implementan animaciones de entrada al desplazarse por la página y cambios visuales en la barra de navegación durante el scroll.

El fondo del sitio es una constelación animada dibujada con `<canvas>`: puntos que flotan y se unen con líneas cuando están cerca o cuando el mouse se acerca. La animación se pausa cuando la pestaña no está visible y se mueve más lento si el usuario activó la opción de reducir movimiento en su sistema.

## CV

El CV en PDF está en `assets/cv/cv-manuel-isaac-camano-diaz.pdf` y se descarga desde el botón **Descargar CV** del portafolio.

## Instalación y ejecución local

Este es un proyecto frontend estático, por lo que no requiere instalación de dependencias mediante npm.

### 1. Clonar el repositorio

```bash
git clone https://github.com/manuelisaaccamanidiaz-lgtm/portafolio_profesional.git
```

### 2. Entrar al directorio

```bash
cd portafolio_profesional
```

### 3. Ejecutar el proyecto

Se puede abrir `index.html` directamente desde el navegador.

También es posible utilizar **Live Server** desde Visual Studio Code. El repositorio incluye una configuración específica para Live Server en `.vscode/settings.json`.

## Despliegue en GitHub Pages

Al tratarse de un proyecto frontend estático con `index.html` como archivo principal, puede desplegarse mediante GitHub Pages.

De forma general:

1. Abrir el repositorio en GitHub.
2. Entrar en **Settings → Pages**.
3. Seleccionar la rama `main` como fuente de publicación.
4. Seleccionar la carpeta raíz del repositorio (`/root`).
5. Guardar la configuración.
6. Esperar a que GitHub Pages genere el sitio.

**Demo:**

https://manuelisaaccamanidiaz-lgtm.github.io/portafolio_profesional/

## Aprendizajes

El desarrollo de este proyecto permitió trabajar directamente en:

* Estructuración de páginas mediante HTML5.
* Diseño y organización visual mediante CSS3.
* Desarrollo de interacciones con JavaScript vanilla.
* Implementación de diseño responsive.
* Uso de animaciones e interacción con el DOM.
* Organización de archivos y recursos de un proyecto frontend.
* Uso de Git y GitHub para gestionar el código.
* Presentación de proyectos y habilidades dentro de un perfil profesional.

## Mejoras futuras

Las siguientes propuestas corresponden a posibles mejoras y **no forman parte de las funcionalidades actuales documentadas**:

* Mejorar progresivamente la accesibilidad del sitio.
* Optimizar el rendimiento y la carga de recursos.
* Ampliar la información de los proyectos con demostraciones y documentación.
* Incorporar nuevos proyectos a medida que avance la formación.
* Mejorar detalles de la experiencia en dispositivos móviles.
* Incorporar un formulario de contacto funcional.
* Añadir nuevas optimizaciones visuales y de interacción.

## Autor

**Manuel Isaac Camaño Díaz**

**GitHub:**
https://github.com/manuelisaaccamanidiaz-lgtm

**LinkedIn:**
https://www.linkedin.com/in/manuel-isaac-camaño-díaz-707006305/

## Licencia

Este repositorio no contiene una licencia de software explícita.

Este proyecto fue desarrollado con fines académicos y de portafolio profesional.
