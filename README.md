# Vue Atelier

A small Vue 3 starter inspired by [MartinKierkegaard/Vue3-Template](https://github.com/MartinKierkegaard/Vue3-Template). It keeps the reference's approachable Options API (`data`, `methods`, and `computed`) and adds single-file components, Vite, responsive styling, and working examples. This is a fresh implementation, not a copy of the reference.

## Getting started

Use Node.js 20.19+ or 22.12+ (Node 24 recommended) and npm.

```sh
npm ci
npm run dev -- --host 0.0.0.0
```

Run these commands in the repository root. Vite prints the development server port (5173 by default).

```sh
npm test          # Production build + two DOM interaction tests
npm run build    # Build into dist/
npm run preview -- --host 0.0.0.0  # Serve the production build
```

## Make it yours

- `src/App.vue`: page layout, counter, task list, and reactive state.
- `src/style.css`: colors, typography, responsive layout, and focus styles.
- `src/main.js`: application entry point.
- `tests/app.test.js`: tests the built app's counter and task interactions using jsdom.

The task list demonstrates `v-model`, `v-for`, event handlers, filters, and computed progress. The counter demonstrates reactive state and click events. Data lives in memory and resets on reload; no backend, secrets, or database are required.

Google Fonts is optional; system sans-serif fallbacks work without external access. All JavaScript dependencies are installed locally through npm. DOM tests exercise behavior but do not replace visual browser testing.
