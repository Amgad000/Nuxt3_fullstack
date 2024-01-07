<template>
  <!-- the date Picker -->
  <VueDatePicker v-model="date" auto-apply placeholder="Select date" />
  <span class="text-lg mt-4 mb-24 block p-2 bg-pink-400 rounded">
    You selected: {{ date || "......." }}
  </span>

  <!-- the slider of imgaes (vue carousel)-->
  <div class="max-w-[700px] m-auto">
    <h3 class="text-3xl text-center p-4">vue carousel package</h3>
    <Carousel :wrap-around="true">
      <Slide v-for="slide in images" :key="slide">
        <div class="carousel__item bg-slate-800 dark:bg-slate-700 shadow-md">
          <img
            :src="`/img/${slide}`"
            class="inline-block shadow-md border-solid border-2 border-slate-800 dark:border-slate-700" />
        </div>
      </Slide>

      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
  </div>
  <!-- ............... -->

  <div class="p-6 text-6xl text-sky-700 flex justify-center items-center">
    <IconLoading />
  </div>
</template>

<script setup>
// the date picker
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
const date = ref();

// the carousel from vue3-carousel
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
const images = ref([
  "user-1.png",
  "user-2.png",
  "user-3.png",
  "user-4.png",
  "user-5.png",
  "user-6.png",
]);
</script>

<style>
.carousel__item {
  min-height: 200px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  color: #525252;
}
</style>
