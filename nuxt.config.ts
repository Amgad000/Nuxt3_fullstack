// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // runtimeConfig
  runtimeConfig: {
    secret: "",
    mongoUri: "",
    authSecret: "",
    public: {
      apiBase: "",
    },
  },

  // global styles
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/_colors.scss" as *;',
        },
      },
    },
  },
  // Modules
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "nuxt-headlessui",
    "@sidebase/nuxt-auth",
  ],
  build: {
    transpile: ["@vuepic/vue-datepicker"],
  },
});
