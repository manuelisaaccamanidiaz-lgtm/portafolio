/* ================================================================
   PORTAFOLIO — Manuel Isaac Camaño Díaz
   Archivo: js/main.js

   ÍNDICE:
   1. Menú hamburguesa (móvil)
   2. Navbar: cambio de estilo al hacer scroll
   3. Animaciones de entrada al hacer scroll
   4. Texto rotatorio en el hero
   5. Año dinámico en el footer
   6. Cambio de idioma
   7. Contador de repositorios de GitHub
   8. Fondo animado de constelación
================================================================ */


/* ================================================================
   1. MENÚ HAMBURGUESA
   En móvil, el menú está oculto. Este código lo muestra/oculta
   cuando el usuario toca el botón de las tres rayas.
================================================================ */
(function initMobileMenu() {
  const toggle = document.querySelector('.navbar__toggle');
  const menu   = document.getElementById('navbar-menu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', function () {
    const isOpen = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen);
    /* Bloquear scroll del body mientras el menú está abierto */
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  /* Cerrar el menú al tocar cualquier link */
  menu.querySelectorAll('.navbar__link').forEach(function (link) {
    link.addEventListener('click', function () {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* Cerrar el menú si el usuario toca fuera de él */
  document.addEventListener('click', function (event) {
    const clickAfuera = !menu.contains(event.target) &&
                        !toggle.contains(event.target);
    if (clickAfuera && menu.classList.contains('is-open')) {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}());


/* ================================================================
   2. NAVBAR: CAMBIO DE ESTILO AL HACER SCROLL
   Cuando el usuario baja, la navbar se vuelve más opaca.
   Como las gafas fotocromáticas: se oscurecen solas según el entorno.
================================================================ */
(function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  /* Inyectar el estilo de la navbar al hacer scroll */
  const style = document.createElement('style');
  style.textContent = `
    .navbar--scrolled {
      background-color: rgba(15, 17, 23, 0.96);
      border-bottom-color: #2a3347;
    }
  `;
  document.head.appendChild(style);

  /* Añadir/quitar la clase según la posición del scroll */
  window.addEventListener('scroll', function () {
    navbar.classList.toggle('navbar--scrolled', window.scrollY > 20);
  }, { passive: true }); /* passive: true mejora el rendimiento */
}());


/* ================================================================
   3. ANIMACIONES DE ENTRADA AL HACER SCROLL
   Los elementos aparecen suavemente cuando el usuario llega a ellos.

   IntersectionObserver es como un vigilante: observa si un elemento
   entró al área visible. Cuando entra, le aplica la animación.
================================================================ */
(function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) return;

  /* Elementos que queremos animar al entrar en pantalla */
  const selectores = [
    '.section__eyebrow',
    '.section__title',
    '.section__subtitle',
    '.about__paragraph',
    '.about__facts',
    '.about__stat-card',
    '.skills__category',
    '.project-card',
    '.contact__title',
    '.contact__description',
    '.contact__links'
  ].join(', ');

  const elementos = document.querySelectorAll(selectores);

  const observador = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-up');
        observador.unobserve(entry.target); /* Animar solo una vez */
      }
    });
  }, { threshold: 0.1 }); /* Se activa cuando el 10% es visible */

  /* Preparar cada elemento: ocultarlo y darle un retraso escalonado */
  elementos.forEach(function (el, index) {
    el.style.opacity = '0';
    /* Máximo 5 niveles de retraso para no hacerlo muy lento */
    el.style.animationDelay = (Math.min(index % 6, 5) * 80) + 'ms';
    observador.observe(el);
  });
}());


/* ================================================================
   4. TEXTO ROTATORIO EN EL HERO
   El rol cambia cada 3 segundos con una animación suave.
   Cuenta más sobre ti sin ocupar espacio extra en la página.
================================================================ */
(function initRoleRotator() {
  const elemento = document.getElementById('role-text');
  if (!elemento) return;

  /* En español el prefijo "Desarrollador" va en el HTML; en inglés
     el prefijo es vacío y cada rol es la frase completa */
  const roles = {
    es: [
      'Full Stack Junior',
      'Backend con Java y Spring Boot',
      'Frontend con JavaScript y React',
      'de agentes de IA con Python'
    ],
    en: [
      'Junior Full Stack Developer',
      'Java & Spring Boot Backend Developer',
      'JavaScript & React Frontend Developer',
      'AI Agent Developer with Python'
    ]
  };

  let indiceActual = 0;
  let idiomaActual = document.documentElement.lang === 'en' ? 'en' : 'es';

  function cambiarTexto() {
    /* Paso 1: desvanecer y subir el texto actual */
    elemento.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    elemento.style.opacity    = '0';
    elemento.style.transform  = 'translateY(-8px)';

    setTimeout(function () {
      /* Paso 2: cambiar al siguiente texto */
      indiceActual        = (indiceActual + 1) % roles[idiomaActual].length;
      elemento.textContent = roles[idiomaActual][indiceActual];

      /* Paso 3: posicionar abajo antes de aparecer */
      elemento.style.transform = 'translateY(8px)';

      setTimeout(function () {
        /* Paso 4: aparecer subiendo */
        elemento.style.opacity   = '1';
        elemento.style.transform = 'translateY(0)';
      }, 50);

    }, 300);
  }

  document.addEventListener('languagechange', function (event) {
    idiomaActual = event.detail.language;
    indiceActual = 0;
    elemento.textContent = roles[idiomaActual][indiceActual];
  });

  setInterval(cambiarTexto, 3000);
}());


/* ================================================================
   5. AÑO DINÁMICO EN EL FOOTER
   Se actualiza solo cada año. Sin acordarse de cambiarlo a mano.
================================================================ */
(function initDynamicYear() {
  document.querySelectorAll('.footer__text').forEach(function (el) {
    if (el.textContent.includes('©')) {
      el.textContent = el.textContent.replace(
        /\d{4}/,
        new Date().getFullYear()
      );
    }
  });
}());


/* ================================================================
   6. CAMBIO DE IDIOMA
   Traduce la interfaz completa sin duplicar el contenido HTML.
================================================================ */
(function initLanguageToggle() {
  const toggle = document.getElementById('language-toggle');
  if (!toggle) return;

  const translations = {
    es: {
      title: 'Manuel Isaac Camaño Díaz — Desarrollador Full Stack Junior',
      description: 'Portafolio de Manuel Isaac Camaño Díaz, desarrollador Full Stack Junior y Técnico en Desarrollo de Software e IA. Java, Spring Boot, PostgreSQL, JavaScript, React y agentes de IA con Python.',
      nav: ['Sobre mí', 'Habilidades', 'Proyectos', 'Contacto'],
      greeting: 'Hola, soy',
      rolePrefix: 'Desarrollador ',
      heroDescription: 'Construyo APIs REST con Java y Spring Boot, interfaces con JavaScript y React, y agentes de IA con Python.',
      viewProjects: 'Ver proyectos',
      downloadCv: 'Descargar CV',
      aboutEyebrow: '01 — sobre mí',
      aboutTitle: '¿Quién soy?',
      aboutParagraphs: [
        'Soy desarrollador Full Stack junior y Técnico en Desarrollo de Software e Inteligencia Artificial de <strong>Campuslands</strong>, en Bucaramanga. Trabajo el backend con Java, Spring Boot y PostgreSQL, el frontend con JavaScript y React, y construyo agentes de IA con Python.',
        'Me gusta resolver problemas reales: una plataforma de alquiler de herramientas para ferreterías de mi ciudad, un agente que ayuda a pequeños productores a comprar fertilizantes con precios del DANE o un analizador que compara hojas de vida con una oferta de empleo.',
        'Antes de escribir código me gusta entender el problema completo y planear la solución. Cuido la arquitectura, la base de datos y la documentación tanto como el resultado final.'
      ],
      facts: ['Bucaramanga, Colombia', 'Técnico en Desarrollo de Software e IA — Campuslands', 'Disponible para prácticas o primer empleo'],
      stat: 'repositorios en GitHub',
      skillsEyebrow: '02 — habilidades',
      skillsTitle: 'Tecnologías que uso',
      skillsSubtitle: 'Herramientas con las que he construido proyectos reales.',
      skillCategories: ['Backend', 'Frontend', 'Bases de datos', 'IA y automatización', 'Herramientas'],
      skillItems: { 'APIs REST y JWT': 'APIs REST y JWT', 'LangChain y RAG': 'LangChain y RAG', 'Git, GitHub y Gitflow': 'Git, GitHub y Gitflow' },
      projectsEyebrow: '03 — proyectos',
      projectsTitle: 'Lo que he construido',
      projectsSubtitle: 'Proyectos reales, con código real. Sin exagerar.',
      featured: 'Destacado',
      projectTitles: [
        'RentaHerramientas',
        'Abona: agente de IA para la compra de fertilizantes',
        'Analizador de CV con IA',
        'SICA: sistema de control de acceso'
      ],
      projectDescriptions: [
        'Plataforma de alquiler de herramientas entre ferreterías y clientes. API REST con Spring Boot en arquitectura hexagonal y DDD, base de datos PostgreSQL normalizada con migraciones Flyway, seguridad JWT con tres roles, facturas en PDF y frontend en JavaScript.',
        'Agente con tool calling que asesora a pequeños productores: cuánto vale un fertilizante en su municipio, si conviene comprar ya o esperar y dónde está más barato, con precios oficiales del DANE. Evaluación propia con 128 de 129 respuestas correctas.',
        'Aplicación que compara currículums en PDF con una oferta de empleo usando Gemini, OpenAI u Ollama. Incluye chat sobre el CV con RAG, ranking de candidatos, historial en PostgreSQL y pruebas con pytest.',
        'Sistema de escritorio para el ingreso de trabajadores y visitantes a un complejo cerrado. Arquitectura hexagonal y patrón Strategy para 4 flujos de acceso, roles y permisos (RBAC), bitácora de auditoría e interfaz en Swing.'
      ],
      githubLink: 'Ver en GitHub',
      videoLink: 'Ver video',
      othersTitle: 'Otros proyectos',
      otherProjects: [
        ['DeliveryBot', 'Bot de Telegram para pedidos de una cafetería, hecho con n8n y Google Sheets.'],
        ['AcmeBank', 'Plataforma bancaria web con cuentas y transacciones en JavaScript vanilla.'],
        ['Tienda de ropa', 'Frontend responsive de una tienda de ropa con HTML y CSS (demo en vivo).']
      ],
      contactEyebrow: '04 — contacto',
      contactTitle: '¿Hablamos?',
      contactDescription: 'Estoy buscando prácticas profesionales o mi primer empleo como desarrollador. Si tienes una vacante o un proyecto interesante, escríbeme.',
      email: 'Enviar email',
      footerNote: 'Construido con HTML, CSS y JavaScript vanilla',
      toggleLabel: 'Cambiar a inglés',
      toggleText: 'EN',
      language: 'es'
    },
    en: {
      title: 'Manuel Isaac Camaño Díaz — Junior Full Stack Developer',
      description: 'Portfolio of Manuel Isaac Camaño Díaz, Junior Full Stack Developer and Software Development & AI Technician. Java, Spring Boot, PostgreSQL, JavaScript, React and AI agents with Python.',
      nav: ['About me', 'Skills', 'Projects', 'Contact'],
      greeting: 'Hi, I am',
      rolePrefix: '',
      heroDescription: 'I build REST APIs with Java and Spring Boot, interfaces with JavaScript and React, and AI agents with Python.',
      viewProjects: 'View projects',
      downloadCv: 'Download CV',
      aboutEyebrow: '01 — about me',
      aboutTitle: 'Who am I?',
      aboutParagraphs: [
        'I am a junior Full Stack developer and Software Development & Artificial Intelligence Technician from <strong>Campuslands</strong> in Bucaramanga, Colombia. I work on the backend with Java, Spring Boot and PostgreSQL, on the frontend with JavaScript and React, and I build AI agents with Python.',
        'I like solving real problems: a tool rental platform for hardware stores in my city, an agent that helps small farmers buy fertilizer using official DANE prices, or an analyzer that compares resumes against a job posting.',
        'Before writing code I like to understand the whole problem and plan the solution. I care about architecture, the database and documentation as much as the final result.'
      ],
      facts: ['Bucaramanga, Colombia', 'Software Development & AI Technician — Campuslands', 'Open to internships or a first job'],
      stat: 'GitHub repositories',
      skillsEyebrow: '02 — skills',
      skillsTitle: 'Technologies I use',
      skillsSubtitle: 'Tools I have used to build real projects.',
      skillCategories: ['Backend', 'Frontend', 'Databases', 'AI & automation', 'Tools'],
      skillItems: { 'APIs REST y JWT': 'REST APIs & JWT', 'LangChain y RAG': 'LangChain & RAG', 'Git, GitHub y Gitflow': 'Git, GitHub & Gitflow' },
      projectsEyebrow: '03 — projects',
      projectsTitle: 'What I have built',
      projectsSubtitle: 'Real projects, real code. No exaggeration.',
      featured: 'Featured',
      projectTitles: [
        'RentaHerramientas',
        'Abona: AI agent for buying fertilizer',
        'AI Resume Analyzer',
        'SICA: access control system'
      ],
      projectDescriptions: [
        'Tool rental platform connecting hardware stores and customers. REST API with Spring Boot using hexagonal architecture and DDD, a normalized PostgreSQL database with Flyway migrations, JWT security with three roles, PDF invoices and a JavaScript frontend.',
        'Tool-calling agent that advises small farmers: how much a fertilizer costs in their town, whether to buy now or wait, and where it is cheapest, using official DANE prices. Custom evaluation with 128 of 129 correct answers.',
        'App that compares PDF resumes against a job posting using Gemini, OpenAI or Ollama. Includes chat over the resume with RAG, candidate ranking, history stored in PostgreSQL and tests with pytest.',
        'Desktop system for worker and visitor access to a gated community. Hexagonal architecture and the Strategy pattern for 4 access flows, role-based permissions (RBAC), an audit log and a Swing interface.'
      ],
      githubLink: 'View on GitHub',
      videoLink: 'Watch video',
      othersTitle: 'Other projects',
      otherProjects: [
        ['DeliveryBot', 'Telegram bot for coffee shop orders, built with n8n and Google Sheets.'],
        ['AcmeBank', 'Web banking platform with accounts and transactions in vanilla JavaScript.'],
        ['Clothing store', 'Responsive clothing store frontend built with HTML and CSS (live demo).']
      ],
      contactEyebrow: '04 — contact',
      contactTitle: "Let's talk",
      contactDescription: 'I am looking for an internship or my first job as a developer. If you have an opening or an interesting project, write to me.',
      email: 'Send email',
      footerNote: 'Built with HTML, CSS and vanilla JavaScript',
      toggleLabel: 'Switch to Spanish',
      toggleText: 'ES',
      language: 'en'
    }
  };

  function setText(selector, value) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(function (element) {
      Array.from(element.childNodes)
        .filter(function (node) { return node.nodeType === Node.TEXT_NODE; })
        .forEach(function (node) { node.remove(); });
      element.appendChild(document.createTextNode(value));
    });
  }

  function setPrefix(selector, value) {
    const element = document.querySelector(selector);
    if (!element) return;
    Array.from(element.childNodes)
      .filter(function (node) { return node.nodeType === Node.TEXT_NODE; })
      .forEach(function (node) { node.remove(); });
    element.insertBefore(document.createTextNode(value), element.firstChild);
  }

  function setHtml(selector, value) {
    document.querySelector(selector).innerHTML = value;
  }

  function setLanguage(language) {
    const text = translations[language];
    document.documentElement.lang = language;
    document.title = text.title;
    document.querySelector('meta[name="description"]').content = text.description;
    document.querySelectorAll('.navbar__link').forEach(function (link, index) {
      link.textContent = text.nav[index];
    });
    setText('.hero__greeting', text.greeting);
    setPrefix('.hero__role', text.rolePrefix);
    setText('.hero__description', text.heroDescription);
    setText('.hero__actions .btn--primary', text.viewProjects);
    setText('.hero__actions .btn--secondary', text.downloadCv);
    setText('.about .section__eyebrow', text.aboutEyebrow);
    setText('#about-title', text.aboutTitle);
    document.querySelectorAll('.about__paragraph').forEach(function (paragraph, index) {
      paragraph.innerHTML = text.aboutParagraphs[index];
    });
    document.querySelectorAll('.about__fact').forEach(function (fact, index) {
      const icon = fact.querySelector('svg');
      fact.innerHTML = '';
      fact.append(icon, document.createTextNode(text.facts[index]));
    });
    setText('.about__stat-label', text.stat);
    setText('.skills .section__eyebrow', text.skillsEyebrow);
    setText('#skills-title', text.skillsTitle);
    setText('.skills .section__subtitle', text.skillsSubtitle);
    document.querySelectorAll('.skills__category-title').forEach(function (title, index) {
      title.textContent = text.skillCategories[index];
    });
    /* Ítems de habilidades que cambian con el idioma (la llave es el texto en español) */
    document.querySelectorAll('.skills__item').forEach(function (item) {
      if (!item.dataset.key) {
        item.dataset.key = item.lastChild.textContent.trim();
      }
      const translated = text.skillItems[item.dataset.key];
      if (translated) item.lastChild.textContent = ' ' + translated;
    });
    setText('.projects .section__eyebrow', text.projectsEyebrow);
    setText('#projects-title', text.projectsTitle);
    setText('.projects__grid + .section__subtitle, .projects .section__subtitle', text.projectsSubtitle);
    setText('.project-card__badge', text.featured);
    document.querySelectorAll('.project-card__title').forEach(function (title, index) {
      title.textContent = text.projectTitles[index];
    });
    document.querySelectorAll('.project-card__description').forEach(function (description, index) {
      description.textContent = text.projectDescriptions[index];
    });
    setText('.project-card__link--primary', text.githubLink);
    setText('.project-card__link--video', text.videoLink);
    setText('.projects__others-title', text.othersTitle);
    document.querySelectorAll('.other-project').forEach(function (project, index) {
      project.querySelector('.other-project__name').textContent = text.otherProjects[index][0];
      project.querySelector('.other-project__description').textContent = text.otherProjects[index][1];
    });
    setText('.contact .section__eyebrow', text.contactEyebrow);
    setText('#contact-title', text.contactTitle);
    setText('.contact__description', text.contactDescription);
    setText('.contact__btn--primary', text.email);
    setText('.footer__text--muted', text.footerNote);
    toggle.textContent = text.toggleText;
    toggle.setAttribute('aria-label', text.toggleLabel);
    try { localStorage.setItem('portfolio-language', language); } catch (e) { /* almacenamiento no disponible */ }
    document.dispatchEvent(new CustomEvent('languagechange', { detail: { language: language } }));
  }

  let savedLanguage = null;
  try { savedLanguage = localStorage.getItem('portfolio-language'); } catch (e) { /* almacenamiento no disponible */ }
  setLanguage(savedLanguage === 'en' ? 'en' : 'es');
  toggle.addEventListener('click', function () {
    const nextLanguage = document.documentElement.lang === 'es' ? 'en' : 'es';
    setLanguage(nextLanguage);
  });
}());


/* ================================================================
   7. CONTADOR DE REPOSITORIOS DE GITHUB
   Consulta la API pública de GitHub para que el número no se quede
   viejo. Si la consulta falla, se mantiene el número del HTML.
================================================================ */
(function initRepoCount() {
  const contador = document.getElementById('repo-count');
  if (!contador || !('fetch' in window)) return;

  fetch('https://api.github.com/users/manuelisaaccamanidiaz-lgtm')
    .then(function (respuesta) {
      if (!respuesta.ok) throw new Error('GitHub API ' + respuesta.status);
      return respuesta.json();
    })
    .then(function (datos) {
      if (Number.isInteger(datos.public_repos)) {
        contador.textContent = datos.public_repos;
      }
    })
    .catch(function () { /* se deja el valor por defecto */ });
}());


/* ================================================================
   8. FONDO ANIMADO DE CONSTELACIÓN
   Puntos que flotan y se unen con líneas cuando están cerca; también
   se conectan con el mouse. Se pausa cuando la pestaña no está visible.
   Si el sistema tiene activado "reducir movimiento" (en Windows pasa
   cuando los efectos de animación están apagados), los puntos se
   mueven mucho más lento en lugar de quedarse quietos.
================================================================ */
(function initConstellation() {
  const canvas = document.getElementById('constellation');
  if (!canvas || !canvas.getContext) return;

  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const LINK_DISTANCE  = 130;   // px: distancia máxima para unir dos puntos
  const MOUSE_DISTANCE = 170;   // px: distancia para unir un punto con el mouse
  const SPEED          = 0.45;  // velocidad máxima de cada punto
  const SLOW_FACTOR    = 0.5;   // multiplicador con "reducir movimiento"

  let width = 0;
  let height = 0;
  let points = [];
  let animationId = null;
  const mouse = { x: null, y: null };

  function createPoints() {
    /* Cantidad según el área de la pantalla: menos puntos en celular */
    const total = Math.min(90, Math.round((width * height) / 15000));
    points = [];
    for (let i = 0; i < total; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * SPEED * 2,
        vy: (Math.random() - 0.5) * SPEED * 2,
        r: Math.random() * 1.2 + 0.8
      });
    }
  }

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width  = window.innerWidth;
    height = window.innerHeight;
    canvas.width  = width * ratio;
    canvas.height = height * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    createPoints();
  }

  function drawLine(a, b, maxDistance, strength) {
    const distance = Math.hypot(a.x - b.x, a.y - b.y);
    if (distance > maxDistance) return;
    ctx.strokeStyle = 'rgba(59, 130, 246, ' + ((1 - distance / maxDistance) * strength) + ')';
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.lineWidth = 1;

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        drawLine(points[i], points[j], LINK_DISTANCE, 0.35);
      }
      if (mouse.x !== null) {
        drawLine(points[i], mouse, MOUSE_DISTANCE, 0.5);
      }
    }

    ctx.fillStyle = 'rgba(147, 197, 253, 0.75)';
    points.forEach(function (point) {
      ctx.beginPath();
      ctx.arc(point.x, point.y, point.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function move() {
    const factor = reduceMotion.matches ? SLOW_FACTOR : 1;
    points.forEach(function (point) {
      point.x += point.vx * factor;
      point.y += point.vy * factor;
      if (point.x < 0 || point.x > width)  point.vx *= -1;
      if (point.y < 0 || point.y > height) point.vy *= -1;
    });
  }

  function loop() {
    move();
    draw();
    animationId = requestAnimationFrame(loop);
  }

  function start() {
    if (animationId === null && !document.hidden) {
      loop();
    }
  }

  function stop() {
    if (animationId !== null) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  }

  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      resize();
      draw();
    }, 150);
  });

  window.addEventListener('mousemove', function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  });

  document.addEventListener('mouseleave', function () {
    mouse.x = null;
    mouse.y = null;
  });

  /* Pausa la animación cuando la pestaña no se está viendo */
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stop(); else start();
  });

  resize();
  draw();
  start();
}());
