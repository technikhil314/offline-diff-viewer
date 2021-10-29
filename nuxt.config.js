const BASE_URL = "https://diffviewer.vercel.app";
const domainAliases = [
  "https://diffchecker.vercel.app/",
  "https://textdiff.vercel.app/"
]
const canonicalLinks = domainAliases.map(x => ({ rel: "canonical", href: x }))
const DESCRIPTION = "A privacy focused, secure, easy sharable and simple diff viewer";
export default {
  target: 'static',
  head: {
    title: 'Diff viewer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: "theme-color", content: "#2563EB" },
      { name: "og:url", property: "og:url", content: `${BASE_URL}` },
      { name: "og:image", property: "og:url", content: `${BASE_URL}/brand-430x495.png` },
      { name: "twitter:title", property: "og:url", content: DESCRIPTION },
      { name: "og:title", property: "og:url", content: DESCRIPTION },
      { name: "og:type", property: "og:url", content: "website" },
      { name: "description", property: "og:url", content: DESCRIPTION },
      { name: "og:description", property: "og:url", content: DESCRIPTION },
      { name: "twitter:description", property: "og:url", content: DESCRIPTION },
      { name: "twitter:card", property: "og:url", content: "summary" },
      { name: "twitter:creator", property: "og:url", content: "@technikhil314" },
      { name: "og:image", property: "og:url", content: `${BASE_URL}/128x128.png` },
      { name: "og:image", property: "og:url", content: `${BASE_URL}/brand-192x192.png` },
      { name: "og:image", property: "og:url", content: `${BASE_URL}/brand-200x200.png` },
      { name: "og:image", property: "og:url", content: `${BASE_URL}/brand-512x512.png` },
      { name: "og:image", property: "og:url", content: `${BASE_URL}/brand-800x800.png` },
      { name: "image", property: "og:url", content: `${BASE_URL}/brand-1200x600.png` },
      { name: "og:image:alt", property: "og:url", content: DESCRIPTION },
      { name: "twitter:image", property: "og:url", content: `${BASE_URL}/128x128.png` },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "manifest", href: "/manifest.json" },
      { rel: "shortcut icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "sitemap", type: "application/xml", title: "Sitemap", href: "/sitemap.xml" },
      { rel: "apple-touch-icon", sizes: "57x57", href: "/apple-touch-icon-57x57.png" },
      { rel: "apple-touch-icon", sizes: "72x72", href: "/apple-touch-icon-72x72.png" },
      { rel: "apple-touch-icon", sizes: "76x76", href: "/apple-touch-icon-76x76.png" },
      { rel: "apple-touch-icon", sizes: "114x114", href: "/apple-touch-icon-114x114.png" },
      { rel: "apple-touch-icon", sizes: "120x120", href: "/apple-touch-icon-120x120.png" },
      { rel: "apple-touch-icon", sizes: "144x144", href: "/apple-touch-icon-144x144.png" },
      { rel: "apple-touch-icon", sizes: "152x152", href: "/apple-touch-icon-152x152.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon-180x180.png" },
      ...canonicalLinks
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/static/global.scss"
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap'
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // sitemap autogeneration https://github.com/nuxt-community/sitemap-module
  sitemap: {
    hostname: BASE_URL
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true
  }
}
