/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}", // Thêm đường dẫn đến các file React của bạn
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    extend: {
      zIndex: {
        '1300': '1300',
        '1500': '1500',
      },
    },
  },
}
