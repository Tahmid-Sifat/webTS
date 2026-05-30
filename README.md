# Tahmid Al Sifat - Digital Portfolio

A cinematic, frontend-only personal portfolio for **Tahmid Al Sifat**: Computer Science student at Brunel University London, full-stack builder, AI explorer, robotics enthusiast, and Cybersecurity Intern Associate at SMBC Group.

This is not only a portfolio page. It is a data-driven digital space built to present projects, experience, achievements, skills, personality, and philosophy through a polished interactive walkthrough.

## Live Concept

The site is designed around a premium creative-developer identity:

- Dark-first visual system with a Sahara-inspired light mode
- Interactive animated background and cursor/touch-responsive visuals
- Cinematic hero section with custom portrait integration
- Scroll-driven About journey with profile summary, signals, skills, recognition, and philosophy
- Project case studies with filterable cards and mobile-friendly detail sheets
- Experience timeline for technical, leadership, university, and society roles
- Human Layer section for hobbies, travel, sport, photography, music, and creativity
- Contact section with validation-ready frontend form
- Fully responsive desktop, tablet, and mobile experience

## Built With

- **HTML5**
- **CSS3**
- **Vanilla JavaScript**
- **ES Modules**
- **Canvas-based interactive visuals**
- **Responsive CSS Grid and Flexbox**
- **Custom data files for editable content**
- **Local static server for development**

No backend, database, CMS, or admin panel is required. The project is easy to deploy on Vercel, Netlify, GitHub Pages, or any static hosting platform.

## Project Structure

```text
.
|-- index.html
|-- app.js
|-- components/
|   |-- sections and UI components
|   `-- visuals/
|-- data/
|   |-- profile.js
|   |-- projects.js
|   |-- experience.js
|   |-- skills.js
|   |-- achievements.js
|   |-- hobbies.js
|   `-- socials.js
|-- lib/
|   `-- DOM/template helpers
|-- styles/
|   `-- main.css
|-- images/
|-- fonts/
|-- Files/
`-- tools/
    `-- static-server.js
```

## Data-Driven Content

Most editable content lives inside the `data/` directory. This keeps the UI clean and makes future updates simple.

Update these files to change portfolio content:

- `data/profile.js` - name, intro, hero copy, about text, stats, philosophy, links
- `data/projects.js` - project cards, filters, case study content, images, tech stacks
- `data/experience.js` - roles, dates, summaries, bullets, skills
- `data/skills.js` - skill categories and tags
- `data/achievements.js` - awards, hackathons, recognition, creative milestones
- `data/hobbies.js` - human layer content
- `data/socials.js` - social/contact links

## Key Sections

### Origin

Hero section introducing the portfolio as a personal digital space, with identity, intro, call-to-action buttons, portrait interaction, and theme-aware imagery.

### About

A scroll-driven profile journey containing:

- Summary and identity
- Recruiter-friendly quick signals
- Skill system
- Recognition wall
- My philosophy

### Experience

A compact timeline of technical, university, consultancy, ambassador, teaching, leadership, and society roles.

### Projects

Filterable selected projects with case study detail views. Project content includes:

- Problem
- Solution
- Features
- Impact
- Tech stack
- GitHub/demo links where available

### Human Layer

A warmer personal section covering travel, photography, movies, music, guitar, badminton, target shooting, fencing, cycling, swimming, food, teamwork, and creativity.

### Contact

A frontend-only contact section with input validation and direct social/email links.

## Running Locally

Because the project uses ES modules, run it through a local static server rather than opening `index.html` directly.

```bash
node tools/static-server.js
```

Then open:

```text
http://localhost:5173
```

## Deployment

This project is static and deploy-ready.

Recommended Vercel setup:

- Framework Preset: **Other**
- Build Command: leave empty
- Output Directory: `.`
- Install Command: leave empty

For GitHub Pages or Netlify, deploy the repository root as a static site.

## Accessibility and Responsiveness

The portfolio includes:

- Semantic HTML structure
- Keyboard-accessible navigation and buttons
- Skip link
- Visible focus states
- Reduced-motion support
- Responsive mobile layouts
- Touch-friendly interactions
- Readable contrast in dark and light themes

## Contact

**Tahmid Al Sifat**

- GitHub: [Tahmid-Sifat](https://github.com/Tahmid-Sifat)
- LinkedIn: [tahmidsifat889](https://www.linkedin.com/in/tahmidsifat889/)
- Email: `tahmid66cs@gmail.com`

## Copyright

(c) 2026 Tahmid Al Sifat. Designed and built by Tahmid Al Sifat, all rights reserved.
