import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBlue: '#90cdf4', // Azul claro para un diseño suave
        grayAccent: '#718096', // Gris para acentos
        bgDark: '#1a202c', // Fondo oscuro opcional
        textLight: '#e2e8f0', // Texto claro
      },
    },
  },
  plugins: [],
};
export default config;
