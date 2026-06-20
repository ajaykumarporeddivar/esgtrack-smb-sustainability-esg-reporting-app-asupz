/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: '#0A84FF', // A vibrant blue for primary actions and branding
        accent: '#28CC9E', // A fresh green for sustainability highlights and success states
        carbon: '#4A5568', // A dark grey for text and carbon-related metrics
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}