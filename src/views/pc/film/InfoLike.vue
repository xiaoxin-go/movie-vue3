<template>
  <div style="text-align: left;color: #fff; padding-left: 20px">同类影片：</div>
  <div class="film">
    <div class="film-item" v-for="film in filmList" :key="film.id" @click="toFilm(film.id)">
      <div class="film-img">
        <img :src="`${LogoPath}/${film.name}.jpg`" alt="">
      </div>
      <div class="film-info">
        <p>{{film.name}}/{{ film.release_date.split("T")[0] }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useRequest} from "vue-request";
import {APIUri, list, LogoPath} from "@/api";
import {useRoute, useRouter} from "vue-router";
const router = useRouter()
const route = useRoute()

const {data:filmList} = useRequest(list, {
  defaultParams: [APIUri.filmLike.replace(":id", route.params.id.toString()), {}],
  formatResult: res=>res.data.data_list
})

const toFilm = (filmId:any) => {
  router.push(`/pc/film/${filmId}?` + Math.random())
}

</script>

<style scoped>
.film{
  margin-top: 5px;
}
.film-item {
  display: inline-block;
  width: 182px;
  margin: 5px;
  overflow: hidden;
  background: rgba(255, 255, 255);
  box-shadow: 0 1px 3px rgb(0 0 0 / 10%);
  border: 4px solid #fff;
}

.film-img {
  height: 256px;
}
.film-img>img{
  height: 100%;
}

.film-info {
  text-align: left;
  font-size: 12px;
  margin: 2px 0;
  padding: 0 2px;
}

.film-info > div {
  white-space: nowrap;
}
.film-info>p{
  white-space: nowrap;
}
</style>