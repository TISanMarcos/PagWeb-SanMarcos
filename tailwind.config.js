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
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        /* Sistema 2026 — profundidad por luz (sombras suaves, multicapa, difusas) */
        soft: '0 1px 2px rgba(0,48,32,0.04), 0 4px 12px -2px rgba(0,48,32,0.07)',
        premium:
          '0 1px 2px rgba(0,48,32,0.05), 0 8px 24px -6px rgba(0,48,32,0.12), 0 16px 48px -12px rgba(0,48,32,0.10)',
        lift: '0 2px 4px rgba(0,48,32,0.05), 0 18px 40px -12px rgba(0,48,32,0.22)',
        brand: '0 10px 30px -8px rgba(240,96,32,0.35), 0 2px 8px -2px rgba(240,96,32,0.25)',
        'inset-hair': 'inset 0 1px 0 0 rgba(255,255,255,0.6)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #003020 0%, #004d32 50%, #003020 100%)',
        'brand-hero': 'linear-gradient(105deg, rgba(0,48,32,0.94) 0%, rgba(0,48,32,0.78) 50%, rgba(0,48,32,0.6) 100%)',
        /* Mesh/aurora — manchas radiales suaves en colores de marca San Marcos */
        'aurora-dark':
          'radial-gradient(60% 80% at 15% 0%, rgba(240,96,32,0.10) 0%, transparent 60%), radial-gradient(55% 70% at 100% 20%, rgba(128,192,96,0.10) 0%, transparent 55%), radial-gradient(80% 90% at 50% 110%, rgba(240,96,32,0.08) 0%, transparent 60%)',
        'aurora-light':
          'radial-gradient(50% 60% at 10% 10%, rgba(240,96,32,0.08) 0%, transparent 55%), radial-gradient(45% 55% at 95% 0%, rgba(128,192,96,0.12) 0%, transparent 55%), radial-gradient(60% 70% at 60% 120%, rgba(240,96,32,0.06) 0%, transparent 60%)',
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
