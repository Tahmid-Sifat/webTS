import { profile } from "../data/profile.js";
import { socials } from "../data/socials.js";
import { html, list } from "../lib/dom.js";

export function Footer() {
  return html`
    <footer class="footer">
      <a class="brand" href="#origin"><span>${profile.initials}</span></a>
      <p>&copy;  2026 Tahmid . Designed and built by Tahmid Al Sifat, all rights reserved.</p>
      <div>${list(socials, item => `<a href="${item.href}" target="_blank" rel="noreferrer">${item.label}</a>`)}</div>
    </footer>
  `;
}
