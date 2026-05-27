import { profile } from "../data/profile.js";
import { html, list } from "../lib/dom.js";

const links = [
  ["origin", "Origin"],
  ["about", "About"],
  ["projects", "Projects"],
  ["experience", "Experience"],
  ["hobbies", "Human Layer"],
  ["contact", "Contact"]
];

export function Navbar() {
  return html`
    <header class="site-header" id="siteHeader">
      <nav class="navbar" aria-label="Primary navigation">
        <a class="brand" href="#origin" aria-label="Tahmid Al Sifat home">
          <span>${profile.initials}</span>
        </a>
        <button class="nav-toggle" id="navToggle" type="button" aria-expanded="false" aria-controls="navLinks" aria-label="Open navigation">
          <span></span><span></span>
        </button>
        <div class="nav-links" id="navLinks">
          ${list(links, ([id, label]) => `<a href="#${id}" data-nav="${id}">${label}</a>`)}
        </div>
        <button class="theme-toggle" id="themeToggle" type="button" aria-label="Toggle theme">
          <span class="theme-toggle__dot"></span>
        </button>
      </nav>
    </header>
  `;
}
