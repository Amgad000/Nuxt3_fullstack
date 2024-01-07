import { defineNuxtPlugin } from "#app";
import Toast, { POSITION, useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";

const toast = useToast();

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, {
    position: POSITION.TOP_RIGHT,
  });
  nuxtApp.provide("showToast", (msg, type, time = 4000) =>
    toast[type](msg, { timeout: time })
  );
});
