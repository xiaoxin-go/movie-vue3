<template>
  <div class="film">
    <div class="film-item" v-for="film in filmList" :key="film.id" @click="router.push(`/pc/film/${film.id}`)">
      <div class="film-img">
        <img :src="`${LogoPath}/${film.name}.jpg`" alt="">
      </div>
      <div class="film-info">
        <p>{{film.name}}/{{ film.release_date.split("T")[0] }}</p>
      </div>
    </div>
  </div>
  <div id="pagination">
    <v-pagination
        v-model="pagination.page"
        :pages="pages"
        :range-size="1"
        active-color="#DCEDFF"
        @update:modelValue="updateHandler"
    />
  </div>
</template>

<script setup lang="ts">
import {APIUri, list, LogoPath} from "@/api";
import {computed, onMounted, reactive, ref, watch} from "vue";
import store from "@/store";
import {useRoute, useRouter} from "vue-router";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

const route = useRoute()
const router = useRouter()

const pagination = reactive({
  page: 1,
  page_size: 24,
  total: 0
})

const pages = computed(()=>{
  return Math.ceil(pagination.total/pagination.page_size)
})

const filmList = ref([])
const getGenreFilms = async () => {
  let resp = await list(APIUri.genreFilm.replace(":id", route.params.id.toString()), pagination)
  pagination.total = resp.data.total
  resp.data.data_list.map((item: any) => {
    filmList.value.push(item)
  })
}
const updateHandler = (page: any) =>{
  pagination.page = page
  getGenreFilms()
}

onMounted(() => {
  getGenreFilms()
})

watch(() => store.state.scroll, () => {
  if (pagination.page * pagination.page_size >= pagination.total) {
    return
  }
  pagination.page += 1
  getGenreFilms()
})

</script>

<style scoped>
.film{
  text-align: left;
}
.film-item {
  display: inline-block;
  width: 190px;
  margin: 5px;
  background: rgba(255, 255, 255);
  /*box-shadow: 0 1px 3px rgb(255 255 255 / 10%);*/
}
.film-img{
  margin: 5px;
  overflow: hidden;
  height: 256px;
}
.film-img:hover{
  cursor: pointer;
}

.film-img > img {
  height: 100%
}
.film-info{
  text-align: left;
  font-size: 12px;
  padding: 2px 5px;
  color: #2c3e50;
}
</style>