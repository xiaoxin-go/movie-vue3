<template>
  <div>
    <videoPlay
        v-bind="options"
        @play="onPlay"
        @pause="onPause"
        @timeupdate="onTimeupdate"
        @canplay="onCanplay"/>
  </div>
  <div class="info">
    <div class="title">
      <span>{{ data?.title }}</span>
      <button>+ 关注</button>
    </div>
    <div>
      上映日期: <span>{{ data.release_date.split("T")[0] }}</span>
    </div>
    <div class="actress">
      演员:
      <span v-for="item in data.actresses" :key="item.id" @click="router.push(`/wap/actress/${item.id}`)">{{item.name}}</span>
    </div>
    <div class="genre">
      类型:
      <span v-for="item in data.genres" :key="item.id" @click="router.push(`/wap/genre/${item.id}`)">{{item.name}}</span>
      <span @click="remove" style="color: red">del</span>
      <span @click="cover" style="color: antiquewhite">cover</span>
    </div>
  </div>
  <FilmInfoImage :film-id="route.params.id"></FilmInfoImage>
  <FilmInfoLink :film-id="route.params.id"></FilmInfoLink>
  <InfoLike></InfoLike>
</template>

<script lang="ts" setup>
import 'vue3-video-play/dist/style.css'
import {videoPlay} from "vue3-video-play"
import {useRoute, useRouter} from "vue-router";
import {computed} from "vue";
import {useRequest} from "vue-request";
import {APIUri, get, post, ImagePath, FilmPath, del} from "@/api";
import FilmInfoLink from "@/views/wap/film/InfoLink.vue"
import FilmInfoImage from "@/views/wap/film/InfoImage.vue"
import InfoLike from "@/views/wap/film/InfoLike.vue"

const route = useRoute()
const router = useRouter()


const {data} = useRequest(get, {
  defaultParams: [APIUri.filmInfo.replace(":id", route.params.id.toString()), {}],
  formatResult: res=>res.data
})

const remove = async() =>{
  let resp = await del(APIUri.film, route.params.id)
  if(resp.code === 200){
    router.go(-1)
  }else{
    alert(resp.message)
  }
}
const cover = async() =>{
  let resp = await post(APIUri.filmCover.replace(":id", route.params.id.toString()), {})
  alert(resp.message)
}

const options = computed(() => {
  return {
    width: "100%",
    height: "232px",
    color: "#409eff", //主题色
    muted: false, //静音
    webFullScreen: false,
    speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
    autoPlay: false, //自动播放
    loop: false, //循环播放
    mirror: false, //镜像画面
    ligthOff: false,  //关灯模式
    volume: 0.3, //默认音量大小
    control: true, //是否显示控制器
    title: data.value?.title, //视频名称
    src: `${FilmPath}/${data.value?.name}.mp4`, //视频源
    poster: `${ImagePath}/${data.value?.name}.jpg`, //封面
  }
})
const onPlay = (ev) => {
  console.log('播放')
}
const onPause = (ev) => {
  console.log(ev, '暂停')
}

const onTimeupdate = (ev) => {
  console.log(ev, '时间更新')
}
const onCanplay = (ev) => {
  console.log(ev, '可以播放')
}

</script>

<style scoped>
.title{
  margin-bottom: 5px;
}
.title>span{
  font-size: 12px;
  font-weight: bold;
}
.title>button{
  background: #fc4dab;
  border: none;
  color: #fff;
  padding:2px 8px;
  float: right;
  border-radius: 2px;
  margin-right: 10px;
  margin-top: 3px;
}
.info, .links{
  background: rgba(0, 0, 0, 0.8);
  text-align: left;
  padding:0 20px;
  font-size: 12px;
  color: #fff;
}
.genre>span, .actress>span{
  margin: 0 6px;
}
.actress>span{
  display: inline-block;
}
.genre>span{

}
</style>