import { achievements } from "../data/achievements.js";
import { sectionHeader } from "./ui.js";
import { html, list } from "../lib/dom.js";

export function AchievementsSection() {
  return html`
    <section id="achievements" class="section-shell" data-section>
      ${sectionHeader("07", "Achievements", "Recognition, momentum, and proof of delivery.", "A concise award wall for hackathons, university recognition, volunteering, science, writing, and photography.")}
      <div class="award-grid">
        ${list(achievements, (item, index) => `
          <article class="glass-card award-card reveal">
            <span>${String(index + 1).padStart(2, "0")}</span>
            <h3>${item.title}</h3>
            <p>${item.detail}</p>
          </article>
        `)}
      </div>
    </section>
  `;
}
