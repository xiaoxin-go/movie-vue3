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
      <span>老王打虎 老王打虎之酒醉无敌</span>
      <button>+ 关注</button>
    </div>
    <div>
      上映日期: <span>2022-03-14</span>
    </div>
    <div class="actress">
      演员:
      <span>范冰冰</span>
      <span>刘涛</span>
      <span>黄晓明</span>
    </div>
    <div class="genre">
      类型:
      <span>动作</span>
      <span style="color: #ababab">/</span>
      <span>爱情</span>
      <span style="color: #ababab">/</span>
      <span>科幻</span>
      <span style="color: #ababab">/</span>
      <span>魔幻</span>
      <span style="color: #ababab">/</span>
      <span>枪战</span>
    </div>
  </div>
  <div class="links">
    <div class="link-item" v-for="item in links" :key="item.id">
      {{item}}
    </div>
  </div>
  <div class="images">
    <div class="image-item" v-for="item in images" :key="item.id">
      <img :src="`${APIUri.server}/static/images/${item.name}-simple.jpg`" alt="">
    </div>
  </div>
</template>

<script lang="ts" setup>
import 'vue3-video-play/dist/style.css'
import {videoPlay} from "vue3-video-play"
import {useRoute} from "vue-router";
import {computed, reactive} from "vue";
import {useRequest} from "vue-request";
import {APIUri, get} from "@/api";

const route = useRoute()

const {data} = useRequest(get, {
  defaultParams: [APIUri.filmInfo.replace(":id", route.params.id.toString()), {}],
  formatResult: res=>res.data
})
const {data: links} = useRequest(get, {
  defaultParams: [APIUri.filmLink, {film_id: route.params.id}],
  formatResult: res=>res.data.data_list
})
const {data: images} = useRequest(get, {
  defaultParams: [APIUri.filmImage, {film_id: route.params.id}],
  formatResult: res=>res.data.data_list
})

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
    src: `${APIUri.server}/static/${data.value?.name}.mp4`, //视频源
    poster: `${APIUri.server}/static/${data.value?.name}.jpg`, //封面
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
  font-size: 16px;
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
.info{
  background: rgba(248, 246, 246, 0.91);
  text-align: left;
  padding:0 20px;
  font-size: 12px;
}
.genre>span, .actress>span{
  margin: 0 6px;
  color: #121212;
}
.images{

}
.image-item{
  display: inline-block;
  margin: 3px;
  padding: 3px;
  width: 30%;
  height: 90px;
  line-height: 90px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
}
.image-item>img{
  height: 100%;
}
</style>