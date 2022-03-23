<template>
  <div id="header">
    <ul>
      <li :class="activeNav === nav.title?'active':''" v-for="nav in navList" :key="nav.title" @click="clickNavLi(nav)">
        {{ nav.title }}
      </li>
    </ul>
  </div>
  <div id="body">
    <router-view :key="$route.fullPath"/>

  </div>
  <div style="position: fixed;bottom: 200px; color: #fff;font-size: 18px;z-index: 1000"> {{bottom}}</div>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";
import {ref, onMounted} from "vue";

const router = useRouter()

const activeNav = ref("电影")

const clickNavLi = (nav: { title: string, url: string }) => {
  activeNav.value = nav.title
  router.push("/wap" + nav.url)
}

const navList = [
  {title: "电影", url: "/film"},
  {title: "演员", url: "/actress"},
  {title: "类别", url: "/genre"},
  {title: "收藏", url: "/favorite"},
  {title: "我的", url: "/user"},
]

import store from "@/store";

const bottom = ref();

const handleScroll = () => {
  const scrollHeight = document.body.scrollHeight
  const clientHeight = document.body.clientHeight
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  const distance = scrollHeight - scrollTop - clientHeight;
  bottom.value = distance
  if(distance < 120){
    store.state.scroll = !store.state.scroll
  }
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll, false);
})

</script>

<style scoped>
#header {
  height: 50px;
  line-height: 50px;
  background-color: rgba(25, 26, 32, .8);
  border-radius: 4px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
}

#header > ul {
  width: 100%;
}

#header > ul > li {
  font-size: 16px;
  display: inline-block;
  width: 19%;
  color: #fefefe;
}

#header > ul > li:hover {

}

#header .active {
  font-size: 18px;
  font-weight: bold;
  color: #fff;
}

#body {
  margin: 0 auto;
  padding-top: 50px;
}
</style>