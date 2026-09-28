const projects = [
  { name: "GoodJob", subtitle: "Task Management", category: "app", type: "Produktivitas", platforms: ["Google Play", "App Store"], icon: "goodjob", mark: "◉", featured: true },
  { name: "GetRich", subtitle: "Spending Manager", category: "app", type: "Keuangan", platforms: ["Google Play", "App Store"], icon: "getrich", mark: "G", featured: true },
  { name: "Stack Up", subtitle: "Stacking Game", category: "game", type: "Game", platforms: ["App Store"], icon: "stackup", mark: "▰", featured: true },
  { name: "Mind Stack", subtitle: "Stacking Game", category: "game", type: "Game", platforms: ["App Store"], icon: "mindstack", mark: "▣" },
  { name: "Mobin", subtitle: "Inventory Manager", category: "app", type: "Bisnis", platforms: ["Google Play", "App Store"], icon: "mobin", mark: "⬡" },
  { name: "Amuba", subtitle: "", category: "app", type: "Aplikasi", platforms: ["Google Play", "App Store"], icon: "amuba", mark: "m" },
  { name: "Smart Shopper", subtitle: "", category: "app", type: "Belanja", platforms: ["Google Play"], icon: "shopper", mark: "S" },
  { name: "SMOP!", subtitle: "Grocery Shopping List", category: "app", type: "Belanja", platforms: ["App Store"], icon: "smop", mark: "S" },
  { name: "Furple", subtitle: "", category: "app", type: "Aplikasi", platforms: ["App Store"], icon: "furple", mark: "✿" },
  { name: "MoodBuddy!", subtitle: "", category: "app", type: "Lifestyle", platforms: ["App Store"], icon: "moodbuddy", mark: "◕" },
  { name: "#SpeakUp", subtitle: "", category: "app", type: "Aplikasi", platforms: ["App Store"], icon: "speakup", mark: "#" },
  { name: "Trumecs", subtitle: "", category: "app", type: "Aplikasi", platforms: ["App Store"], icon: "trumecs", mark: "T" },
];

const grid = document.querySelector("#project-grid");
const filters = [...document.querySelectorAll(".filter-button")];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function projectCard(project, index) {
  const article = document.createElement("article");
  article.className = `project-card ${project.featured ? "project-card-featured" : ""}`;
  article.dataset.category = project.category;
  article.style.setProperty("--card-order", index);
  article.innerHTML = `
    <div class="project-visual project-visual-${project.icon}">
      <span class="project-visual-grid" aria-hidden="true"></span>
      <span class="project-number">HA / ${String(index + 1).padStart(2, "0")}</span>
      <span class="app-icon app-icon-${project.icon}" aria-hidden="true">${project.mark}</span>
      <span class="visual-caption">${project.category === "game" ? "PLAY MORE" : "MAKE IT SIMPLE"}</span>
    </div>
    <div class="project-info">
      <div><span class="project-type">${project.type}</span><h3>${project.name}</h3>${project.subtitle ? `<p>${project.subtitle}</p>` : ""}</div>
    </div>
    <div class="project-platforms">${project.platforms.map((platform) => `<span>${platform}</span>`).join("")}</div>
  `;
  return article;
}

projects.forEach((project, index) => grid.append(projectCard(project, index)));

function animateVisibleCards(cards) {
  if (reduceMotion.matches) return;
  const animate = window.anime?.animate;
  if (!animate) return;
  cards.forEach((card, index) => {
    animate(card, { opacity: [0, 1], y: [22, 0], duration: 600, delay: Math.min(index, 5) * 65, ease: "outCubic" });
  });
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filters.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    const visibleCards = [];
    [...grid.children].forEach((card) => {
      const visible = filter === "all" || card.dataset.category === filter;
      card.hidden = !visible;
      if (visible) visibleCards.push(card);
    });
    animateVisibleCards(visibleCards);
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
  nav.classList.toggle("is-open", open);
});
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Buka menu");
  nav.classList.remove("is-open");
}));

document.querySelector("#year").textContent = new Date().getFullYear();

if (!reduceMotion.matches && window.anime?.animate) {
  const { animate, stagger } = window.anime;
  animate(".hero-content > *", { opacity: [0, 1], y: [28, 0], duration: 850, delay: stagger(110, { start: 120 }), ease: "outExpo" });
  animate(".hero-logo-frame", { opacity: [0, 1], scale: [0.82, 1], rotate: [-8, 0], duration: 1250, delay: 280, ease: "outExpo" });
  animate(".orbit-outer", { rotate: 360, duration: 42000, loop: true, ease: "linear" });
  animate(".orbit-inner", { rotate: -360, duration: 32000, loop: true, ease: "linear" });
}

if ("IntersectionObserver" in window && !reduceMotion.matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".intro-grid, .section-heading-row, .approach-grid, .contact-card").forEach((element) => {
    element.classList.add("reveal-ready");
    observer.observe(element);
  });
}

const hero = document.querySelector(".hero");
const heroScene = document.querySelector(".hero-art-scene");
const projectVisuals = [...document.querySelectorAll(".project-visual")];
const contactCard = document.querySelector(".contact-card");
const scrollStory = document.querySelector(".scroll-story");
const storyChapters = [...scrollStory.querySelectorAll(".story-chapter")];
const storyCount = scrollStory.querySelector(".story-count");
let depthFrame = 0;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(start, end, value) {
  const t = clamp((value - start) / (end - start), 0, 1);
  return t * t * (3 - 2 * t);
}

function updateScrollStory() {
  const rect = scrollStory.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  if (rect.bottom <= 0 || rect.top >= viewportHeight) return;

  const progress = clamp(-rect.top / Math.max(1, rect.height - viewportHeight), 0, 1);
  const weights = [
    1 - smoothstep(0.22, 0.39, progress),
    smoothstep(0.25, 0.42, progress) * (1 - smoothstep(0.60, 0.79, progress)),
    smoothstep(0.64, 0.82, progress),
  ];
  const active = progress < 0.34 ? 0 : progress < 0.70 ? 1 : 2;

  storyChapters.forEach((chapter, index) => {
    chapter.style.setProperty("--chapter-opacity", weights[index].toFixed(3));
    chapter.style.setProperty("--chapter-y", `${((1 - weights[index]) * 36).toFixed(1)}px`);
    chapter.style.pointerEvents = index === active ? "auto" : "none";
    chapter.inert = index !== active;
  });
  scrollStory.style.setProperty("--story-progress", progress.toFixed(4));
  scrollStory.style.setProperty("--seed-scale", (0.8 + progress * 1.3).toFixed(3));
  scrollStory.style.setProperty("--seed-rotate", `${(progress * 65).toFixed(1)}deg`);
  scrollStory.style.setProperty("--products-scale", (0.72 + smoothstep(0.23, 0.55, progress) * 0.35).toFixed(3));
  scrollStory.style.setProperty("--products-rotate", `${(-18 + smoothstep(0.23, 0.62, progress) * 25).toFixed(1)}deg`);
  scrollStory.style.setProperty("--brand-scale", (0.65 + smoothstep(0.62, 1, progress) * 0.43).toFixed(3));
  scrollStory.style.setProperty("--brand-rotate", `${(20 - smoothstep(0.62, 1, progress) * 20).toFixed(1)}deg`);
  storyCount.textContent = `${String(active + 1).padStart(2, "0")} — 03`;
}

function setScrollStoryMode() {
  document.body.classList.toggle("has-scroll-story", !reduceMotion.matches);
  if (reduceMotion.matches) {
    storyChapters.forEach((chapter) => {
      chapter.inert = false;
      chapter.style.removeProperty("pointer-events");
      chapter.style.removeProperty("--chapter-opacity");
      chapter.style.removeProperty("--chapter-y");
    });
  } else {
    updateScrollStory();
  }
}

function updateScrollDepth() {
  depthFrame = 0;
  if (reduceMotion.matches) return;

  const viewportHeight = window.innerHeight;
  updateScrollStory();
  const strength = window.innerWidth < 760 ? 0.55 : 1;
  const heroRect = hero.getBoundingClientRect();
  if (heroRect.bottom > 0 && heroRect.top < viewportHeight) {
    const progress = clamp(-heroRect.top / heroRect.height, 0, 1);
    heroScene.style.setProperty("--scene-x", `${(progress * 12 * strength).toFixed(2)}deg`);
    heroScene.style.setProperty("--scene-y", `${(-progress * 9 * strength).toFixed(2)}deg`);
    heroScene.style.setProperty("--scene-shift", `${(progress * 58 * strength).toFixed(1)}px`);
  }

  projectVisuals.forEach((visual) => {
    const rect = visual.getBoundingClientRect();
    if (rect.bottom < -60 || rect.top > viewportHeight + 60) return;
    const distance = (rect.top + rect.height / 2 - viewportHeight / 2) / (viewportHeight / 2 + rect.height / 2);
    const position = clamp(distance, -1, 1) * strength;
    visual.style.setProperty("--card-tilt", `${(-position * 9).toFixed(2)}deg`);
    visual.style.setProperty("--card-lift", `${(-position * 16).toFixed(1)}px`);
  });

  const contactRect = contactCard.getBoundingClientRect();
  if (contactRect.bottom > 0 && contactRect.top < viewportHeight) {
    const progress = clamp((viewportHeight - contactRect.top) / (viewportHeight + contactRect.height), 0, 1);
    contactCard.style.setProperty("--orb-shift", `${((0.5 - progress) * 90 * strength).toFixed(1)}px`);
  }
}

function requestScrollDepth() {
  if (!depthFrame && !reduceMotion.matches) depthFrame = requestAnimationFrame(updateScrollDepth);
}

window.addEventListener("scroll", requestScrollDepth, { passive: true });
window.addEventListener("resize", requestScrollDepth);
reduceMotion.addEventListener("change", () => {
  setScrollStoryMode();
  if (reduceMotion.matches) {
    heroScene.style.removeProperty("--scene-x");
    heroScene.style.removeProperty("--scene-y");
    heroScene.style.removeProperty("--scene-shift");
    projectVisuals.forEach((visual) => {
      visual.style.removeProperty("--card-tilt");
      visual.style.removeProperty("--card-lift");
    });
    contactCard.style.removeProperty("--orb-shift");
  } else {
    requestScrollDepth();
  }
});
setScrollStoryMode();
requestScrollDepth();
