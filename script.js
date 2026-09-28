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
