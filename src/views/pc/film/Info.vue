<template>
  <div class="title">
    <span>{{ data?.title }}</span>
  </div>
  <div class="info">
    <div class="info-logo">
      <img :src="`${ImagePath}/${data?.name}.jpg`" alt="">
    </div>
    <div class="split"></div>
    <div class="info-text">
      <div>
        <span class="info-label">识别码:</span> <span>{{ data?.name }}</span>
      </div>
      <div>
        <span class="info-label">上映日期:</span> <span>{{ data?.release_date.split("T")[0] }}</span>
      </div>
      <div>
        <span class="info-label">
          时长:
        </span><span>{{ data?.length }}</span>
      </div>
      <div>
        <span class="info-label">演员:</span>
      </div>
      <div>
        <span class="actress"
              v-for="item in data?.actresses"
              :key="item.id"
              @click="router.push(`/pc/actress/${item.id}`)"
              @mouseenter="actressActive=item.name"
              @mouseleave="actressActive=''"
        >
          {{ item.name }}
          <span class="actress-logo" v-if="actressActive === item.name">
            <div style="overflow: hidden; height: 100%;width: 100%">
              <img style="width: 100%;border-radius: 3px" :src="`${LogoPath}/${item.image}.jpg`" alt="">
            </div>
          </span>
        </span>

      </div>
      <div>
        <span class="info-label">
          类型:
        </span>
      </div>
      <div>
        <span class="genre" v-for="item in data?.genres" :key="item.id"
              @click="router.push(`/pc/genre/${item.id}`)">{{ item.name }}</span>
      </div>
      <div>
        <button v-if="isCollect===0" class="collect-btn" @click="collect">+ 收藏</button>
        <button v-else class="collect-btn" @click="unCollect">- 取消收藏</button>
        <button class="del" @click="remove">del</button>
        <button class="cover" @click="cover">cover</button>
      </div>
      <div v-if="isPlayer>0">
        <button class="player-btn" @click="router.push(`/pc/film/${data?.name}/player`)">play</button>
      </div>
    </div>
  </div>
  <FilmInfoImage :film-id="route.params.id"></FilmInfoImage>
  <FilmInfoLink :film-id="route.params.id"></FilmInfoLink>
  <InfoLike></InfoLike>
</template>

<script lang="ts" setup>
import {useRoute, useRouter} from "vue-router";
import {useRequest} from "vue-request";
import {APIUri, get, post, ImagePath, LogoPath, del} from "@/api";
import FilmInfoLink from "@/views/pc/film/InfoLink.vue"
import FilmInfoImage from "@/views/pc/film/InfoImage.vue"
import InfoLike from "@/views/pc/film/InfoLike.vue"
import {ref} from "vue";

const route = useRoute()
const router = useRouter()

const actressActive = ref("")


const {data} = useRequest(get, {
  defaultParams: [APIUri.filmInfo.replace(":id", route.params.id.toString()), {}],
  formatResult: res => res.data
})
const {data: isPlayer} = useRequest(get, {
  defaultParams: [APIUri.isPlayer.replace(":id", route.params.id.toString()), {}],
  formatResult: res => res.data
})
const {data: isCollect, run: runIsCollect} = useRequest(get, {
  defaultParams: [APIUri.isCollect.replace(":id", route.params.id.toString()), {}],
  formatResult: res => res.data
})
const collect = async () => {
  let resp = await post(APIUri.collect.replace(":id", route.params.id.toString()), {})
  console.log(resp)
  if (resp.code === 200) {
    alert(resp.message)
    runIsCollect(APIUri.isCollect.replace(":id", route.params.id.toString()), {})
  }
}
const unCollect = async () => {
  let resp = await post(APIUri.unCollect.replace(":id", route.params.id.toString()), {})
  console.log(resp)
  if (resp.code === 200) {
    alert(resp.message)
    runIsCollect(APIUri.isCollect.replace(":id", route.params.id.toString()), {})
  }
}
const remove = async () => {
  let resp = await del(APIUri.film, route.params.id)
  if (resp.code === 200) {
    router.go(-1)
  } else {
    alert(resp.message)
  }
}
const cover = async () => {
  let resp = await post(APIUri.filmCover.replace(":id", route.params.id.toString()), {})
  alert(resp.message)
}

</script>

<style scoped>
.info {
  background: #ffffff;
  padding: 10px;
}

.title {
  text-align: left;
  margin-bottom: 5px;
}
.title > span {
  font-size: 18px;
  font-weight: bold;
}

.collect-btn, .player-btn {
  background: #fc4dab;
  border: none;
  color: #fff;
  padding: 2px 8px;
  border-radius: 2px;
  margin-right: 10px;
  margin-top: 3px;
}

.player-btn {
  background: slategrey;
  font-size: 14px;
}

.player-btn:hover, .collect-btn:hover {
  cursor: pointer;
}

.info {
  text-align: left;
  padding: 10px;
  font-size: 14px;
  color: #000;
}

.info-logo {
  display: inline-block;
}

.info-label {
  font-weight: bold;
}

.split {
  border-right: 1px solid #ccc;
  height: 539px;
  display: inline-block;
  margin: 0 10px;
}

.info-text {
  display: inline-block;
  min-width: 200px;
  max-width: 300px;
  vertical-align: top;
}

.info-text > div {
  line-height: 35px;
}

.cover, .del {
  border: none;
  border-radius: 1px;
  padding: 2px 5px;
  color: #fff;
  margin: 0 8px;
  font-size: 12px;
}

.cover {
  background: cadetblue;
}

.del {
  background: red;
}

.genre, .actress {
  margin-right: 15px;
  position: relative;
}

.genre:hover, .actress:hover {
  cursor: pointer;
}
.actress-logo {
  width: 200px;
  /*height: 250px;*/
  overflow: hidden;
  position: absolute;
  z-index: 100;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.3);
  padding: 3px;
  display: block;
}
</style>