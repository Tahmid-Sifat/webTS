import { profile } from "../data/profile.js";
import { sectionHeader } from "./ui.js";
import { html } from "../lib/dom.js";

export function PhilosophySection() {
  return html`
    <section id="philosophy" class="section-shell philosophy" data-section>
      ${sectionHeader("09", "My Philosophy", 'The <span>Human</span> Side of Building')}
      <article class="philosophy-card reveal">
        <p>${profile.philosophy}</p>
      </article>
    </section>
  `;
}
