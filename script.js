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

const english = {
  skipLink: "Skip to content",
  brandTop: "Hundredapps, back to top",
  navLabel: "Main navigation",
  navAbout: "About",
  navWork: "Work",
  navApproach: "Approach",
  navContact: 'Contact us <span aria-hidden="true">↗</span>',
  languageLabel: "Choose language",
  heroDescription: "We build apps and games that turn simple ideas into meaningful experiences. One home, many possibilities.",
  heroAboutLink: 'Get to know Hundredapps <span aria-hidden="true">↓</span>',
  introLabel: "01 / ABOUT US",
  introOverline: "FROM ONE IDEA TO MANY EXPERIENCES",
  introTitle: "We believe small ideas can make <em>a big impact.</em>",
  introDescription: "Hundredapps is a home for digital products that keep growing. Each app and game is made to help, entertain, and bring value to everyday life.",
  statsLabel: "Portfolio overview",
  statsProducts: "products in our portfolio",
  statsPlatforms: "mobile platforms",
  storyLabel: "From an idea to many apps",
  storyOneLabel: "01 / THE START",
  storyOneTitle: "It all starts with <em>one idea.</em>",
  storyOneDescription: "A small idea can grow far when it has room to move.",
  storyTwoLabel: "02 / IN MOTION",
  storyTwoTitle: "Ideas become <em>experiences.</em>",
  storyTwoDescription: "Different apps and games, each with its own purpose and character.",
  storyThreeLabel: "03 / ONE HOME",
  storyThreeTitle: "Many creations. <em>One home.</em>",
  storyThreeDescription: "Hundredapps brings these ideas together and keeps opening up new possibilities.",
  portfolioLabel: "02 / PORTFOLIO",
  portfolioOverline: "MADE FOR DIFFERENT MOMENTS",
  portfolioTitle: "One ecosystem.<br /><em>Many stories.</em>",
  portfolioDescription: "From productivity to play, every product has its own purpose and personality.",
  filterLabel: "Filter products",
  filterAll: "All <span>12</span>",
  filterApps: "Apps",
  filterGames: "Games",
  approachLabel: "03 / OUR APPROACH",
  approachTitle: "It starts with curiosity. <em>It grows through making.</em>",
  approachOneTitle: "Find the opportunity",
  approachOneDescription: "We start with everyday needs and look for ways technology can make them easier to meet.",
  approachTwoTitle: "Build with focus",
  approachTwoDescription: "Each product is shaped to feel clear, enjoyable, and easy to use.",
  approachThreeTitle: "Keep evolving",
  approachThreeDescription: "Good ideas always leave room to learn, improve, and grow.",
  contactLabel: "04 / LET'S CONNECT",
  contactOverline: "HAVE AN IDEA TO BRING TO LIFE?",
  contactDescription: "We're open to the next idea and collaboration.",
  contactPending: 'Official contact details coming soon <span aria-hidden="true">↗</span>',
  footerAbout: "About",
  footerWork: "Work",
  footerContact: "Contact",
  metaDescription: "Hundredapps is home to a growing collection of mobile apps and games. Explore small ideas that become meaningful digital experiences.",
  projectTypes: {
    Produktivitas: "Productivity",
    Keuangan: "Finance",
    Game: "Game",
    Bisnis: "Business",
    Aplikasi: "App",
    Belanja: "Shopping",
    Lifestyle: "Lifestyle",
  },
};

const languageButtons = [...document.querySelectorAll(".language-switch button")];
const localizedText = [...document.querySelectorAll("[data-i18n]")].map((element) => ({ element, original: element.textContent }));
const localizedHtml = [...document.querySelectorAll("[data-i18n-html]")].map((element) => ({ element, original: element.innerHTML }));
const localizedAria = [...document.querySelectorAll("[data-i18n-aria]")].map((element) => ({ element, original: element.getAttribute("aria-label") }));
const descriptionMeta = document.querySelector('meta[name="description"]');
const originalDescription = descriptionMeta.content;
let currentLanguage = "id";
try {
  if (localStorage.getItem("hundredapps-language") === "en") currentLanguage = "en";
} catch { /* Storage may be unavailable in private browsing. */ }

function projectTypeLabel(type) {
  return currentLanguage === "en" ? english.projectTypes[type] || type : type;
}

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
      <div><span class="project-type">${projectTypeLabel(project.type)}</span><h3>${project.name}</h3>${project.subtitle ? `<p>${project.subtitle}</p>` : ""}</div>
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
function menuLabel(open) {
  return currentLanguage === "en" ? (open ? "Close menu" : "Open menu") : (open ? "Tutup menu" : "Buka menu");
}

function applyLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language;
  localizedText.forEach(({ element, original }) => {
    element.textContent = language === "en" ? english[element.dataset.i18n] : original;
  });
  localizedHtml.forEach(({ element, original }) => {
    element.innerHTML = language === "en" ? english[element.dataset.i18nHtml] : original;
  });
  localizedAria.forEach(({ element, original }) => {
    element.setAttribute("aria-label", language === "en" ? english[element.dataset.i18nAria] : original);
  });
  [...grid.children].forEach((card, index) => {
    card.querySelector(".project-type").textContent = projectTypeLabel(projects[index].type);
  });
  descriptionMeta.content = language === "en" ? english.metaDescription : originalDescription;
  menuToggle.setAttribute("aria-label", menuLabel(menuToggle.getAttribute("aria-expanded") === "true"));
  languageButtons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.lang === language)));
  try { localStorage.setItem("hundredapps-language", language); } catch { /* Keep the selection for this page only. */ }
}

languageButtons.forEach((button) => button.addEventListener("click", () => applyLanguage(button.dataset.lang)));
menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", menuLabel(open));
  nav.classList.toggle("is-open", open);
});
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", menuLabel(false));
  nav.classList.remove("is-open");
}));

applyLanguage(currentLanguage);
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
