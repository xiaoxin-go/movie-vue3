<template>
  <carousel autoplay="2000" transition="800" :wrap-around="true">
    <slide v-for="item in source" :key="item.id" @click="router.push(`/film/${item.id}`)">
      <img style="width: 100%;height:100%; border-radius: 5px" :src="`${APIUri.server}/static/${item.name}.jpg`"
           :alt="item.title">
      <span class="carousel-title">{{item.title}}</span>
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
import {APIUri} from "@/api";

const router = useRouter()

const props = defineProps({
  source: {
    type: Array,
    default: () => []
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
