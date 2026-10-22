// не через @tailwindcss/vite, он не обрабатывает @apply в .scss
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
