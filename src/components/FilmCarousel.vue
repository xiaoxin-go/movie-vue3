<template>
  <carousel :autoplay="3000" :transition="800" :wrap-around="true">
    <slide v-for="item in source" :key="item.id" @click="router.push(`/${path}/film/${item.id}`)">
      <img style="height: 100%;width: 100%" :src="`${ImagePath}/${item.name}.jpg`"
           :alt="item.title">
<!--      <span class="carousel-title">{{item.title}}</span>-->
    </slide>
    <template #addons>
      <navigation/>
      <pagination/>
    </template>
  </carousel>
</template>
<script lang="ts" setup>
import "vue3-carousel/dist/carousel.css"
import {Carousel, Slide, Pagination, Navigation} from "vue3-carousel";
import {defineProps} from "vue";
import {useRouter} from "vue-router";
import {ImagePath} from "@/api";

const router = useRouter()

const props = defineProps({
  source: {
    type: Array,
    default: () => []
  },
  path: {
    type: String,
    default: ""
  }
})

</script>
<style>
/* For demo */
.carousel__prev {
  left: 20px !important;
}

.carousel__next {
  right: 20px !important;
}
.carousel-title{
  position: absolute;
  z-index: 100;
  color: #510eca;
  bottom: 10px;
  left: 20px;
}
</style>
