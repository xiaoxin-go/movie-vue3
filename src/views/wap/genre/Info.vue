<template>
  <div class="film">
    <div class="film-item" v-for="film in filmList" :key="film.id" @click="router.push(`/wap/film/${film.id}`)">
      <div class="film-img">
        <img :src="`${ImagePath}/${film.name}.jpg`" alt="">
      </div>
      <div class="film-info">
        <p>{{film.name}}/{{ film.release_date.split("T")[0] }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {APIUri, list, ImagePath} from "@/api";
import {onMounted, reactive, ref, watch} from "vue";
import store from "@/store";
import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()

const pagination = reactive({
  page: 1,
  page_size: 8,
  total: 0
})

const filmList = ref([])
const getActressFilms = async () => {
  let resp = await list(APIUri.genreFilm.replace(":id", route.params.id.toString()), pagination)
  pagination.total = resp.data.total
  resp.data.data_list.map((item: any) => {
    filmList.value.push(item)
  })
}

onMounted(() => {
  getActressFilms()
})

watch(() => store.state.scroll, () => {
  if (pagination.page * pagination.page_size >= pagination.total) {
    return
  }
  pagination.page += 1
  getActressFilms()
})

</script>

<style scoped>
.film-item {
  display: inline-block;
  width: 45%;
  margin: 5px;
  background: rgba(255, 255, 255);
  /*box-shadow: 0 1px 3px rgb(255 255 255 / 10%);*/
}
.film-img{
  margin: 3px;
  overflow: hidden;
  height: 232px;
}

.film-img > img {
  position: relative;
  right: 166px;
  height: 100%
}
.film-info{
  text-align: left;
  font-size: 12px;
  padding: 2px 5px;
  color: #2c3e50;
}
</style>