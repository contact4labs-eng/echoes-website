// Tailwind v4 is loaded via @tailwindcss/vite in astro.config.mjs.
// This empty PostCSS config stops Vite from walking up to a parent
// postcss.config.js that might exist outside the project.
export default { plugins: {} };
