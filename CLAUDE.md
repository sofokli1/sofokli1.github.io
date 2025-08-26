# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static portfolio website for Juxhin Bakalli Technologies, showcasing iOS apps. The site is built with vanilla HTML, CSS, and JavaScript with no build process or package manager dependencies.

## Project Structure

```
/
├── index.html              # Main landing page
├── css/styles.css          # Main stylesheet with CSS variables and responsive design
├── js/main.js             # Interactive functionality and animations
├── apps/                  # Individual app landing pages
│   ├── interval-timer.html
│   └── smoothly.html
├── assets/                # Static assets
│   ├── *.svg, *.png       # Images and icons
│   └── *.mp4              # App preview videos
├── privacy/               # Legal pages
└── terms/                 # Legal pages
```

## Development Approach

Since this is a static website with no build tools or package management:

- **No build commands** - Files can be edited directly
- **No package.json** - No dependencies to install
- **No testing framework** - Manual testing through browser
- **No linting tools** - Manual code review

## Code Architecture

### CSS Architecture
- Uses CSS custom properties (variables) defined in `:root` for consistent theming
- Mobile-first responsive design with breakpoints
- Utilizes modern CSS features: backdrop-filter, CSS Grid, Flexbox
- Component-based class naming (e.g., `.app-card`, `.hero-content`)

### JavaScript Architecture
- Single `main.js` file with all functionality
- Event-driven architecture using `DOMContentLoaded`
- Key features:
  - Smooth scrolling navigation
  - Intersection Observer for scroll animations
  - Mobile menu toggle functionality
  - Video fallback to slideshow
  - Performance optimizations (debounced scroll, lazy loading)

### HTML Structure
- Semantic HTML5 elements
- Consistent navigation across pages
- Mobile-responsive navigation with dropdowns
- App Store integration with direct download links

## Content Management

- **App information** is hardcoded in HTML files
- **App Store URLs** are embedded in the HTML
- **Images** are hosted both locally (assets/) and externally (App Store CDN)
- **Legal pages** are separate HTML files in their respective directories

## Development Workflow

1. Edit HTML/CSS/JS files directly
2. Test changes by opening HTML files in browser
3. Use browser dev tools for debugging
4. No compilation or build step required

## Common Development Tasks

Since there are no build tools, development is straightforward:
- Edit files directly in your preferred editor
- Open `index.html` in a browser to test changes
- Use browser developer tools for debugging and responsive testing
- Commit changes directly to git when ready