# Tahmid Al Sifat Portfolio

A frontend-only, data-driven personal portfolio for Tahmid Al Sifat. The site is built with plain HTML, CSS, and modular JavaScript so it can be deployed easily to GitHub Pages, Netlify, or Vercel without a backend or build step.

## Structure

- `index.html` - app shell and asset entry point
- `app.js` - app renderer and interactions
- `components/` - UI and section renderers
- `data/` - editable portfolio content
- `lib/` - small DOM helpers
- `styles/main.css` - visual system, layout, responsive rules, animations
- `images/`, `fonts/`, `Files/` - local assets, fonts, and CV/docs

## Updating Content

Most portfolio content lives in:

- `data/profile.js`
- `data/skills.js`
- `data/projects.js`
- `data/experience.js`
- `data/achievements.js`
- `data/hobbies.js`
- `data/socials.js`

Edit those files to update the site without touching the UI components.

## Running Locally

Because the site uses ES modules, serve it through a local static server:

```bash
node tools/static-server.js
```

Then open `http://localhost:5173`.

## Contact Form

The contact form currently validates input and shows a frontend-only status message. Email sending is intentionally not connected so no API keys are exposed in client code.
