/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          /* Primarios — Brand Book San Marcos (swatches visuales p.14) */
          'verde-oscuro': '#003020',
          'verde-claro': '#80c060',
          naranja: '#f06020',
          beige: '#f0e0d0',
          /* Derivados */
          'verde-oscuro-hover': '#004d32',
          'naranja-hover': '#d9541a',
          'verde-claro-oscuro': '#4a8f38',
          neutral: '#f7f2ec',
          crema: '#faf6f1',
          rojo: '#e5243a',
          charcoal: '#1a1a1a',
        },
      },
      fontFamily: {
        collier: ['Collier', 'Georgia', 'serif'],
        amsi: ['"Amsi Pro"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 6px -1px rgba(0, 48, 32, 0.06), 0 2px 4px -1px rgba(0, 48, 32, 0.04)',
        premium: '0 10px 25px -5px rgba(0, 48, 32, 0.1), 0 8px 10px -6px rgba(0, 48, 32, 0.04)',
        brand: '0 12px 32px -8px rgba(240, 96, 32, 0.25)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #003020 0%, #004d32 50%, #003020 100%)',
        'brand-hero': 'linear-gradient(105deg, rgba(0,48,32,0.94) 0%, rgba(0,48,32,0.78) 50%, rgba(0,48,32,0.6) 100%)',
      },
      animation: {
        marquee: 'marquee 45s linear infinite',
        'marquee-reverse': 'marquee-reverse 50s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
