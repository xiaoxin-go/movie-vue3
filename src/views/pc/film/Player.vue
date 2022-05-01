<template>
  <div>
    <videoPlay
        v-bind="options"
        @play="onPlay"
        @pause="onPause"
        @timeupdate="onTimeupdate"
        @canplay="onCanplay"/>
  </div>
</template>

<script lang="ts" setup>
import 'vue3-video-play/dist/style.css'
import {videoPlay} from "vue3-video-play"
import {computed} from "vue";
import {FilmPath, ImagePath} from "@/api";
import {useRoute} from "vue-router";

const route = useRoute()

const options = computed(() => {
  return {
    width: "100%",
    height: "600px",
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
    title: "", //视频名称
    src: `${FilmPath}/${route.params.name}.mp4`, //视频源
    poster: `${ImagePath}/${route.params.name}.jpg`, //封面
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

</style>