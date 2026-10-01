# Marsland Properties Redesign

This is a complete redesign and rebuild of the Marsland Properties website, a premium real estate developer in Trichy, Tamil Nadu.

## Features

- **Modern Luxury Design:** Deep navy, gold accents, and clean off-white backgrounds.
- **Mobile First:** Fully responsive on all devices (mobile, tablet, desktop).
- **Fast & Optimized:** Uses Vanilla JS and CSS, no heavy frameworks. Lazy loaded images.
- **Animations:** Smooth scroll reveals (IntersectionObserver), animated counters, and interactive hover effects.
- **SEO & Accessibility:** Semantic HTML, Meta tags, Open Graph tags, and LocalBusiness Schema markup included. Honors `prefers-reduced-motion`.
- **Dynamic Projects Section:** Filtering (All, Ongoing, Completed, Farmland) and interactive modals for project details with brochure downloads.
- **Quick Contact Options:** Floating WhatsApp and Call buttons, plus an enquiry form that auto-generates a WhatsApp message.
- **Site Visit Booking:** Dedicated form to schedule guided site visits with date/time selection.
- **PWA Ready:** Web App Manifest for installability, offline-capable with service worker ready.
- **SEO Files:** sitemap.xml and robots.txt included.

## How to Run Locally

You can open this project simply by double-clicking the `index.html` file in your browser. 

For the best experience and to avoid any CORS issues (though vanilla JS here doesn't fetch external local JSONs), run a local server:

1. **Using VS Code:** Install the "Live Server" extension, right-click `index.html`, and select "Open with Live Server".
2. **Using Python:** Run `python -m http.server` in the project folder and visit `http://localhost:8000`.
3. **Using Node.js:** Run `npx serve` in the project folder.

## How to Edit Content

### 1. Updating Projects
- **Images:** Add new project images to the `assets/` folder.
- **HTML Cards:** In `index.html`, locate the `<!-- Featured Projects -->` section. Copy an existing `.project-card` block and update the text, image `src`, and the `onclick="openProjectModal('NEW_ID')"` attribute.
- **Modal Data:** Open `js/main.js`. Locate the `projectData` object. Add a new entry matching your `NEW_ID` with the title, location, image path, specs, description, features, and brochures.

### 2. Updating Contact Information
- **Phone Numbers:** Search `index.html` for `+919894980940` and update it in the Top Bar, Navbar, Footer, and Floating buttons. 
- **WhatsApp Links:** Search for `https://wa.me/919894980940` and update the number.
- **Email/Address:** Update text in the `<!-- Contact Section -->` and `<!-- Footer -->`.

### 3. Adding Brochures
- Place PDF brochures in the `assets/` folder (e.g., `brochure-krs.pdf`, `pricelist-krs.pdf`, `siteplan-krs.pdf`).
- Update the `brochures` array in `projectData` for each project in `js/main.js`.

### 4. Updating Styling (Colors/Fonts)
- Open `css/styles.css`.
- The very first block `:root { ... }` contains all the design tokens (colors, fonts, border-radius). Changing a color here updates it across the entire site instantly.

## Folder Structure

```
/
├── index.html        # Main HTML file
├── README.md         # Documentation
├── sitemap.xml       # SEO sitemap
├── robots.txt        # SEO robots file
├── manifest.json     # PWA manifest
├── css/
│   └── styles.css    # All styling and design tokens
├── js/
│   └── main.js       # Animations, modal logic, and form handling
└── assets/           # Images, SVG logos, and PDF brochures
    ├── hero.jpg
    ├── logo.svg
    ├── logo-light.svg
    ├── about-office.jpg
    ├── founder.jpg
    ├── project-krs.jpg
    ├── project-rasi.jpg
    ├── project-tamil.jpg
    └── *.pdf         # Brochure files (add your PDFs here)
```

## New Sections Added

### Site Visit Booking (`#site-visit`)
A dedicated section allowing visitors to book guided site visits with:
- Project selection dropdown
- Date picker (defaults to tomorrow, prevents past dates)
- Time slot selection
- Number of visitors
- Optional notes
- Submits via WhatsApp with all details pre-filled

### Brochure Downloads in Project Modals
Each project modal now includes a "Download Brochure" section with buttons for:
- Project Brochure
- Price List
- Site Plan

Add your PDF files to `assets/` and update the `brochures` array in `projectData` (js/main.js) to enable this feature.

## Browser Support
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Performance Notes
- All images use `loading="lazy"` for deferred loading
- CSS uses custom properties for easy theming
- Vanilla JS (no framework overhead)
- Minimal third-party dependencies (FontAwesome, Google Fonts only)