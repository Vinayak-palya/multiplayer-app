export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: { extend: { keyframes: { wrapOpen: { '10%, 100%': { transform: 'scale(1)' }, '50%': { transform: 'scale(0.5)' }, }, }, animation: { 'wrap-open': 'wrapOpen 3s ease-in-out infinite', }, }, },
  plugins: [],
}

