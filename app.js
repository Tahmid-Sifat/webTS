import { Navbar } from "./components/Navbar.js";
import { HeroSection } from "./components/HeroSection.js";
import { AboutSection } from "./components/AboutSection.js";
import { ProjectsSection, drawerTemplate } from "./components/ProjectsSection.js";
import { ExperienceTimeline } from "./components/ExperienceTimeline.js";
import { HobbiesSection } from "./components/HobbiesSection.js";
import { ContactSection } from "./components/ContactSection.js";
import { Footer } from "./components/Footer.js";
import { GlobalFluidCometCursor } from "./components/visuals/GlobalFluidCometCursor.js";
import { projects } from "./data/projects.js";
import { qs, qsa } from "./lib/dom.js";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function render() {
  qs("#app").innerHTML = `
    ${GlobalFluidCometCursor()}
    ${Navbar()}
    <main id="main">
      ${HeroSection()}
      ${AboutSection()}
      ${ExperienceTimeline()}
      ${ProjectsSection()}
      ${HobbiesSection()}
      ${ContactSection()}
    </main>
    ${Footer()}
  `;
}

function setupLoader() {
  const loader = qs("#loader");
  window.setTimeout(() => loader?.classList.add("is-hidden"), 1350);
}

function setupTheme() {
  const saved = localStorage.getItem("portfolio-theme");
  if (saved) document.documentElement.dataset.theme = saved;
  qs("#themeToggle")?.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("portfolio-theme", next);
  });
}

function setupNavigation() {
  const toggle = qs("#navToggle");
  const links = qs("#navLinks");
  toggle?.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  qsa(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle?.setAttribute("aria-expanded", "false");
    });
  });

  const sections = qsa("[data-section]");
  const navItems = qsa("[data-nav]");
  const setActiveSection = () => {
    const marker = window.scrollY + Math.min(window.innerHeight * 0.34, 280);
    let current = sections[0]?.id;

    sections.forEach(section => {
      if (section.offsetTop <= marker) current = section.id;
    });

    navItems.forEach(link => link.classList.toggle("is-active", link.dataset.nav === current));
  };

  setActiveSection();
  window.addEventListener("scroll", setActiveSection, { passive: true });
  window.addEventListener("resize", setActiveSection);
}

function setupReveal() {
  const revealItems = qsa(".reveal");
  const cardSelector = [
    ".glass-card",
    ".stat-card",
    ".highlight-card",
    ".skill-card",
    ".project-card",
    ".timeline-item",
    ".award-card",
    ".mood-card",
    ".contact-panel",
    ".contact-form",
    ".philosophy-card",
    ".filter-row"
  ].join(",");

  qsa("[data-section]").forEach(section => {
    section.classList.add("reveal-space");
    qsa(".reveal", section).forEach((item, index) => {
      item.style.setProperty("--reveal-delay", `${Math.min(index * 60, 360)}ms`);
      if (item.matches(cardSelector)) item.dataset.reveal = item.dataset.reveal || "card";
      if (item.matches(".section-heading")) item.dataset.reveal = item.dataset.reveal || "section";
      if (item.matches(".timeline-item")) item.dataset.reveal = "timeline";
    });
  });

  if (prefersReducedMotion) {
    revealItems.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: "0px 0px -8% 0px",
    threshold: 0.18
  });

  revealItems.forEach(el => revealObserver.observe(el));
}

function setupAboutZoom() {
  const section = qs(".about-journey");
  const stage = qs(".about-cinematic", section);
  const title = qs(".about-zoom-title", section);
  const content = qs(".about-content", section);
  if (!section || !stage || !title || !content) return;

  const setStaticState = () => {
    section.style.setProperty("--about-zoom-scale", "1");
    section.style.setProperty("--about-zoom-y", "0px");
    section.style.setProperty("--about-zoom-opacity", "1");
    section.style.setProperty("--about-zoom-blur", "0px");
    section.style.setProperty("--about-content-opacity", "1");
    section.style.setProperty("--about-content-y", "0px");
  };

  if (prefersReducedMotion) {
    setStaticState();
    return;
  }

  let ticking = false;
  const smoothstep = value => value * value * (3 - 2 * value);
  const clamp = value => Math.min(1, Math.max(0, value));

  const update = () => {
    ticking = false;
    const rect = stage.getBoundingClientRect();
    const zoomDistance = Math.max(1, stage.offsetHeight - window.innerHeight);
    const progress = clamp(-rect.top / zoomDistance);
    const eased = smoothstep(progress);
    const isMobile = window.matchMedia("(max-width: 720px)").matches;
    const maxScale = isMobile ? 1.48 : 2.04;
    const scale = 1 + eased * (maxScale - 1);
    const titleFade = clamp((progress - 0.84) / 0.16);
    const contentProgress = clamp((progress - 0.82) / 0.17);

    section.style.setProperty("--about-zoom-scale", scale.toFixed(3));
    section.style.setProperty("--about-zoom-y", `${(-window.innerHeight * (isMobile ? 0.042 : 0.07) * eased).toFixed(1)}px`);
    section.style.setProperty("--about-zoom-opacity", (1 - titleFade).toFixed(3));
    section.style.setProperty("--about-zoom-blur", `${(titleFade * (isMobile ? 4 : 10)).toFixed(2)}px`);
    section.style.setProperty("--about-content-opacity", smoothstep(contentProgress).toFixed(3));
    section.style.setProperty("--about-content-y", `${(46 * (1 - smoothstep(contentProgress))).toFixed(1)}px`);
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  update();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
}

function setupAboutSubnav() {
  const links = qsa("[data-about-nav]");
  if (!links.length) return;

  const blocks = links
    .map(link => qs(`#${link.dataset.aboutNav}`))
    .filter(Boolean);

  const setActive = id => {
    links.forEach(link => {
      const active = link.dataset.aboutNav === id;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };

  const update = () => {
    const nav = qs(".about-mini-nav");
    const marker = (nav?.getBoundingClientRect().bottom ?? 0) + 72;
    let current = blocks[0]?.id;
    let closestDistance = Number.POSITIVE_INFINITY;

    blocks.forEach(block => {
      const rect = block.getBoundingClientRect();
      const containsMarker = rect.top <= marker && rect.bottom > marker;
      const distance = Math.abs(rect.top - marker);

      if (containsMarker) {
        current = block.id;
        closestDistance = 0;
      } else if (closestDistance !== 0 && distance < closestDistance) {
        current = block.id;
        closestDistance = distance;
      }
    });

    if (current) setActive(current);
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

function setupProgress() {
  const progress = qs("#scrollProgress");
  window.addEventListener("scroll", () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? window.scrollY / max : 0;
    progress.style.transform = `scaleX(${ratio})`;
    qs("#siteHeader")?.classList.toggle("is-scrolled", window.scrollY > 24);
  }, { passive: true });
}

function setupProjects() {
  const grid = qs("#projectsGrid");
  const drawer = qs("#projectDrawer");
  const content = qs("#drawerContent");
  const scrim = qs("#drawerScrim");
  const close = () => {
    drawer?.setAttribute("aria-hidden", "true");
    scrim.hidden = true;
    document.body.classList.remove("drawer-open");
  };

  qsa(".filter-pill").forEach(button => {
    button.addEventListener("click", () => {
      qsa(".filter-pill").forEach(item => item.classList.remove("is-active"));
      button.classList.add("is-active");
      const filter = button.dataset.filter;
      qsa(".project-card", grid).forEach(card => {
        const categories = card.dataset.categories.split(",");
        card.hidden = filter !== "All" && !categories.includes(filter);
      });
    });
  });

  grid?.addEventListener("click", event => {
    const card = event.target.closest("[data-project]");
    if (!card) return;
    const project = projects.find(item => item.slug === card.dataset.project);
    if (!project) return;
    content.innerHTML = drawerTemplate(project);
    drawer.setAttribute("aria-hidden", "false");
    scrim.hidden = false;
    document.body.classList.add("drawer-open");
  });

  qs("#drawerClose")?.addEventListener("click", close);
  scrim?.addEventListener("click", close);
  window.addEventListener("keydown", event => {
    if (event.key === "Escape") close();
  });
}

function setupContactForm() {
  qs("#contactForm")?.addEventListener("submit", event => {
    event.preventDefault();
    const form = event.currentTarget;
    const status = qs("#formStatus");
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const message = form.elements.message.value.trim();

    if (name.length < 2) return setFormStatus(status, "Please enter your name.", true);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setFormStatus(status, "Please enter a valid email address.", true);
    if (message.length < 10) return setFormStatus(status, "Please write at least 10 characters.", true);

    setFormStatus(status, "Message validated. Email sending is not connected yet, so please use the email link for now.", false);
    form.reset();
  });
}

function setFormStatus(status, text, error) {
  status.textContent = text;
  status.className = error ? "is-error" : "is-success";
}

function setupMagnetic() {
  if (prefersReducedMotion || window.matchMedia("(pointer: coarse)").matches) return;
  qsa(".magnetic").forEach(el => {
    el.addEventListener("mousemove", event => {
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * 0.18;
      const y = (event.clientY - rect.top - rect.height / 2) * 0.18;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  });
}

function setupCardLight() {
  if (window.matchMedia("(pointer: coarse)").matches) return;
  qsa(".glass-card, .project-card__button").forEach(card => {
    card.addEventListener("mousemove", event => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--card-x", `${event.clientX - rect.left}px`);
      card.style.setProperty("--card-y", `${event.clientY - rect.top}px`);
    });
  });
}

function setupPortraitInteraction() {
  if (prefersReducedMotion || window.matchMedia("(pointer: coarse)").matches) return;
  qsa("[data-portrait-card]").forEach(card => {
    let frameId = 0;
    const state = {
      rotateX: 0,
      rotateY: 0,
      imageX: 0,
      imageY: 0,
      sheenX: 50,
      sheenY: 50
    };

    const apply = () => {
      frameId = 0;
      card.style.setProperty("--portrait-rx", `${state.rotateX}deg`);
      card.style.setProperty("--portrait-ry", `${state.rotateY}deg`);
      card.style.setProperty("--portrait-image-x", `${state.imageX}px`);
      card.style.setProperty("--portrait-image-y", `${state.imageY}px`);
      card.style.setProperty("--portrait-sheen-x", `${state.sheenX}%`);
      card.style.setProperty("--portrait-sheen-y", `${state.sheenY}%`);
    };

    const schedule = () => {
      if (!frameId) frameId = requestAnimationFrame(apply);
    };

    card.addEventListener("mousemove", event => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      const dx = px - 0.5;
      const dy = py - 0.5;

      state.rotateX = dy * -6;
      state.rotateY = dx * 7;
      state.imageX = dx * 8;
      state.imageY = dy * 8;
      state.sheenX = px * 100;
      state.sheenY = py * 100;
      card.classList.add("is-hovered");
      schedule();
    });

    card.addEventListener("mouseleave", () => {
      state.rotateX = 0;
      state.rotateY = 0;
      state.imageX = 0;
      state.imageY = 0;
      state.sheenX = 50;
      state.sheenY = 50;
      card.classList.remove("is-hovered");
      schedule();
    });
  });
}

function setupFluidCometCursor() {
  const canvas = qs("#siteLiquidCanvas");
  const container = qs(".site-liquid");
  if (!canvas || !container) return;

  if (prefersReducedMotion) {
    return;
  }

  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const readableSelector = [
    ".site-header",
    ".glass-card",
    ".stat-card",
    ".highlight-card",
    ".skill-card",
    ".project-card",
    ".timeline-item",
    ".award-card",
    ".mood-card",
    ".philosophy-card",
    ".contact-panel",
    ".contact-form",
    ".filter-pill",
    ".section-heading",
    ".hero-copy",
    ".about-copy",
    ".project-card__body",
    ".btn",
    "h1",
    "h2",
    "h3",
    "h4",
    "p",
    "label",
    "button",
    "a",
    "input",
    "textarea"
  ].join(",");
  let fluidStarted = false;
  let fluidReady = false;
  let pointerSamples = 0;
  let lastPointer = null;

  const dispatchFluidWarmup = () => {
    const baseX = Math.round(window.innerWidth * 0.14);
    const baseY = Math.round(window.innerHeight * 0.82);
    const points = [
      [baseX, baseY],
      [baseX + 18, baseY - 10],
      [baseX + 35, baseY + 6],
      [baseX + 52, baseY - 8]
    ];
    const targets = [canvas, window];

    points.forEach(([clientX, clientY], index) => {
      window.setTimeout(() => {
        targets.forEach(target => {
          const common = {
            bubbles: true,
            cancelable: true,
            clientX,
            clientY,
            screenX: clientX,
            screenY: clientY
          };

          if (window.PointerEvent) {
            target.dispatchEvent(new PointerEvent("pointermove", {
              ...common,
              pointerId: 99,
              pointerType: "mouse",
              isPrimary: true
            }));
            target.dispatchEvent(new PointerEvent("pointerdown", {
              ...common,
              pointerId: 99,
              pointerType: "mouse",
              isPrimary: true,
              buttons: 1
            }));
            target.dispatchEvent(new PointerEvent("pointerup", {
              ...common,
              pointerId: 99,
              pointerType: "mouse",
              isPrimary: true
            }));
          }

          target.dispatchEvent(new MouseEvent("mousemove", common));
          target.dispatchEvent(new MouseEvent("mousedown", { ...common, buttons: 1 }));
          target.dispatchEvent(new MouseEvent("mouseup", common));
          target.dispatchEvent(new MouseEvent("click", common));
        });
      }, 90 + index * 90);
    });
  };

  const startFluid = () => {
    if (fluidStarted) return;
    fluidStarted = true;
    import("https://cdn.jsdelivr.net/npm/smokey-fluid-cursor@1.0.7/dist/index.mjs")
      .then(({ initFluid }) => {
        initFluid({
          id: "siteLiquidCanvas",
          simResolution: coarse ? 96 : 160,
          dyeResolution: coarse ? 384 : 768,
          captureResolution: 512,
          densityDissipation: 0.965,
          velocityDissipation: 0.982,
          pressure: 0.78,
          pressureIteration: coarse ? 12 : 18,
          curl: coarse ? 28 : 58,
          splatRadius: coarse ? 0.075 : 0.115,
          splatForce: coarse ? 3000 : 6200,
          shading: true,
          colorUpdateSpeed: 0.035,
          transparent: true,
          backColor: { r: 0, g: 0, b: 0 }
        });
        dispatchFluidWarmup();
        window.setTimeout(() => {
          fluidReady = true;
        }, 900);
      })
      .catch(error => {
        console.warn("Fluid cursor failed to load.", error);
      });
  };

  const syncFluidState = event => {
    if (event && !event.isTrusted) return;
    if (event) startFluid();
    if (event && fluidReady) {
      if (lastPointer) {
        const distance = Math.hypot(event.clientX - lastPointer.x, event.clientY - lastPointer.y);
        if (distance > 2 && distance < Math.max(window.innerWidth, window.innerHeight) * 0.24) {
          pointerSamples += 1;
        }
      }
      lastPointer = { x: event.clientX, y: event.clientY };
      if (pointerSamples >= 5) container.classList.add("has-fluid-input");
    }
    const target = event ? document.elementFromPoint(event.clientX, event.clientY) : null;
    const readable = Boolean(target?.closest(readableSelector));
    container.classList.toggle("is-readable-hover", readable);
  };

  window.addEventListener("pointermove", syncFluidState, { passive: true });
  window.addEventListener("pointerleave", () => container.classList.remove("is-readable-hover"), { passive: true });

  new MutationObserver(() => syncFluidState()).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"]
  });
}

function setupAmbientLiveBackground() {
  const canvas = qs("#ambientLiquidCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const particleCount = coarse ? 44 : 118;
  const waveCount = coarse ? 6 : 10;
  let width = 0;
  let height = 0;
  let dpr = 1;
  let frame = 0;
  let hidden = document.hidden;
  let particles = [];

  const colorsForTheme = theme => theme === "dark"
    ? {
        particle: "170, 246, 255",
        line: "56, 232, 245",
        glow: "59, 130, 246",
        fade: "5, 10, 15"
      }
    : {
        particle: "96, 88, 80",
        line: "194, 101, 42",
        glow: "140, 60, 60",
        fade: "239, 226, 210"
      };

  function resizeAmbient() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.6);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.14,
      vy: (Math.random() - 0.5) * 0.1,
      r: 0.45 + Math.random() * 1.25,
      phase: Math.random() * Math.PI * 2
    }));
  }

  function drawAmbient() {
    if (hidden) return;
    frame += 1;
    const theme = document.documentElement.dataset.theme;
    const colors = colorsForTheme(theme);
    const light = theme === "light";

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = `rgba(${colors.fade}, ${light ? 0.025 : 0.05})`;
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    ctx.globalAlpha = light ? 0.18 : 0.1;
    ctx.strokeStyle = `rgba(${colors.line}, 1)`;
    ctx.lineWidth = 0.5;
    for (let i = 0; i < waveCount; i++) {
      const yBase = (height / waveCount) * i + Math.sin(frame * 0.004 + i) * 16;
      ctx.beginPath();
      for (let x = -48; x <= width + 48; x += 24) {
        const y = yBase
          + Math.sin(x * 0.0065 + frame * 0.007 + i * 1.7) * 7
          + Math.cos(x * 0.012 + frame * 0.004 + i) * 3;
        if (x === -48) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    ctx.restore();

    particles.forEach((particle, index) => {
      particle.phase += 0.0075;
      particle.x += particle.vx + Math.cos(particle.phase) * 0.018;
      particle.y += particle.vy + Math.sin(particle.phase) * 0.014;

      if (particle.x < -12) particle.x = width + 12;
      if (particle.x > width + 12) particle.x = -12;
      if (particle.y < -12) particle.y = height + 12;
      if (particle.y > height + 12) particle.y = -12;

      const pulse = 0.58 + Math.sin(particle.phase + frame * 0.01) * 0.24;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.r * pulse, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${colors.particle}, ${light ? 0.22 : 0.16})`;
      ctx.fill();

      if (!coarse && index % 4 === 0) {
        const next = particles[(index + 11) % particles.length];
        const distance = Math.hypot(next.x - particle.x, next.y - particle.y);
        if (distance < 132) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(next.x, next.y);
          ctx.strokeStyle = `rgba(${colors.line}, ${(1 - distance / 132) * (light ? 0.085 : 0.045)})`;
          ctx.lineWidth = 0.4;
          ctx.stroke();
        }
      }
    });

    if (!prefersReducedMotion) requestAnimationFrame(drawAmbient);
  }

  resizeAmbient();

  if (prefersReducedMotion) {
    drawAmbient();
    return;
  }

  window.addEventListener("resize", resizeAmbient);
  document.addEventListener("visibilitychange", () => {
    hidden = document.hidden;
    if (!hidden) requestAnimationFrame(drawAmbient);
  });
  requestAnimationFrame(drawAmbient);
}

render();
setupLoader();
setupTheme();
setupNavigation();
setupReveal();
setupAboutZoom();
setupAboutSubnav();
setupProgress();
setupProjects();
setupContactForm();
setupMagnetic();
setupCardLight();
setupPortraitInteraction();
setupAmbientLiveBackground();
setupFluidCometCursor();
