export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0F172A",
        accent: "#63B36A",
        muted: "#94A3B8",
        brandBlue: "#2C74B3",
        brandGreen: "#63B36A",
      },
      animation: {
        "spin-slow": "spin 6s linear infinite",
      },
    }
  },
  plugins: [],
}
