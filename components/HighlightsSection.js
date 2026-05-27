import { highlights } from "../data/highlights.js";
import { sectionHeader } from "./ui.js";
import { html, list } from "../lib/dom.js";

export function HighlightsSection() {
  return html`
    <section id="highlights" class="section-shell" data-section>
      ${sectionHeader("03", "Highlights", "Signals recruiters can scan quickly.", "A compact view of current direction, technical range, and personality.")}
      <div class="highlight-grid">
        ${list(highlights, (item, index) => `
          <article class="glass-card highlight-card reveal">
            <span>${String(index + 1).padStart(2, "0")}</span>
            <p>${item}</p>
          </article>
        `)}
      </div>
    </section>
  `;
}
