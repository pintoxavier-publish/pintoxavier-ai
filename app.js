const fallbackResume = {
  candidate: { name: "Pinto Xavier", headline: "Applied AI & Agentic AI Developer" },
  summary: { primary: "", aiFocused: "" },
  transition: [],
  capabilities: [],
  projects: [],
  learning: { current: [], future: [] }
};

const $ = (selector) => document.querySelector(selector);
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);

function render(resume) {
  document.title = `${resume.candidate.name} — ${resume.candidate.headline}`;
  $("[data-summary]").textContent = resume.summary.primary;
  $("[data-primary-summary]").textContent = resume.summary.primary;
  $("[data-ai-summary]").textContent = resume.summary.aiFocused;
  $("[data-year]").textContent = new Date().getFullYear();

  $("[data-career-path]").innerHTML = resume.transition.map((step, index) => `
    <span class="path-step">${escapeHtml(step)}</span>${index < resume.transition.length - 1 ? '<span class="path-arrow">→</span>' : ""}
  `).join("");

  $("[data-capabilities]").innerHTML = resume.capabilities.map((item, index) => `
    <article class="capability-card">
      <div class="card-topline"><span>0${index + 1}</span><span class="card-arrow">↗</span></div>
      <h3>${escapeHtml(item.area)}</h3>
      <p>${escapeHtml(item.description)}</p>
      <div class="skill-list">${item.skills.map((skill) => `<span>${escapeHtml(skill)}</span>`).join("")}</div>
    </article>
  `).join("");

  $("[data-projects]").innerHTML = resume.projects.map((project, index) => `
    <article class="project-card">
      <div class="project-index">0${index + 1}</div>
      <div class="project-main">
        <div class="project-meta"><span>${escapeHtml(project.type)}</span><span class="status-dot"></span><span>${escapeHtml(project.status)}</span></div>
        <h3>${escapeHtml(project.name)}</h3>
        <p>${escapeHtml(project.description)}</p>
        <div class="project-features">${project.features.map((feature) => `<span>${escapeHtml(feature)}</span>`).join("")}</div>
      </div>
      <span class="project-arrow">↗</span>
    </article>
  `).join("");

  const renderTags = (selector, items) => { $(selector).innerHTML = items.map((item) => `<span>${escapeHtml(item)}</span>`).join(""); };
  renderTags("[data-learning-current]", resume.learning.current);
  renderTags("[data-learning-future]", resume.learning.future);
}

fetch("resume.json")
  .then((response) => response.ok ? response.json() : Promise.reject(new Error("Resume data unavailable")))
  .then(render)
  .catch(() => render(fallbackResume));

$("[data-print]").addEventListener("click", () => window.print());
$("[data-menu]").addEventListener("click", (event) => {
  const links = $(".nav-links");
  const open = links.classList.toggle("is-open");
  event.currentTarget.setAttribute("aria-expanded", String(open));
});
document.querySelectorAll(".nav-links a").forEach((link) => link.addEventListener("click", () => $(".nav-links").classList.remove("is-open")));
