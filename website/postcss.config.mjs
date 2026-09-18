// Tailwind v4 is here for utilities and for the brand tokens (D22); the design system itself is
// app/design.css, ported from the mocks (D94). Nothing in the pages depends on Tailwind classes today.
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
