import { profile } from "../data/profile.js";
import { buttonLink } from "./ui.js";
import { HeroPortraitCard } from "./HeroPortraitCard.js";
import { html } from "../lib/dom.js";

export function HeroSection() {
  return html`
    <section id="origin" class="hero section-shell" data-section>
      <div class="hero__content reveal">
        <p class="eyebrow">01 / Origin</p>
        <h1>${profile.heroSentence.replace("digital space", '<span>digital space</span>')}</h1>
        <p class="identity-line">${profile.identityLine}</p>
        <p class="hero__intro">${profile.intro}</p>
        <div class="hero__actions">
          ${buttonLink("#projects", "Explore My Work", "primary")}
          ${buttonLink("#about", "About Me")}
        </div>
      </div>
      ${HeroPortraitCard()}
      <div class="scroll-cue" aria-hidden="true">
        <span>Scroll to explore</span>
        <i></i>
      </div>
    </section>
  `;
}
