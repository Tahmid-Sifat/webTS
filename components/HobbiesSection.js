import { hobbies } from "../data/hobbies.js";
import { sectionHeader } from "./ui.js";
import { html, list } from "../lib/dom.js";

export function HobbiesSection() {
  return html`
    <section id="hobbies" class="section-shell human-layer" data-section>
      ${sectionHeader("08", "Human Layer", "The person behind the projects.", "Warm, social, curious, active, and creative outside the screen.")}
      <div class="moodboard">
        ${list(hobbies, item => `
          <article class="glass-card mood-card reveal">
            <h3>${item.title}</h3>
            <p>${item.detail}</p>
          </article>
        `)}
      </div>
    </section>
  `;
}
