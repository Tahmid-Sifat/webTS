import { skillCategories } from "../data/skills.js";
import { sectionHeader, tag } from "./ui.js";
import { html, list } from "../lib/dom.js";

export function SkillsSection() {
  return html`
    <section id="skills" class="section-shell" data-section>
      ${sectionHeader("04", "Skills", "Technical range with a practical bias.", "Filter-style cards keep the stack readable without turning the site into a dashboard.")}
      <div class="skills-grid">
        ${list(skillCategories, category => `
          <article class="glass-card skill-card reveal">
            <h3>${category.title}</h3>
            <div class="tag-cloud">${list(category.skills, tag)}</div>
          </article>
        `)}
      </div>
    </section>
  `;
}
