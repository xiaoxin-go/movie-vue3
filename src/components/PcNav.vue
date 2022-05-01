<template>
  <div id="nav">
    <div id="header">
        <span class="header-menu">
          <span :class="activeNav === nav.title?'active':''" v-for="nav in navList" :key="nav.title"
                @click="clickNavLi(nav)">
            {{ nav.title }}
          </span>
        </span>
      <span class="search">
        <input type="text" v-model="keyword">
      </span>
      <button @click="search" class="search-btn">search</button>
      <button @click="clickLogin">login</button>
    </div>
  </div>
  <div style="width: 100%;background: beige">
    <div id="body">
      <router-view/>
    </div>
  </div>

</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";
import store from "@/store";
import {ref} from "vue";

const router = useRouter()

const keyword = ref("")

const activeNav = ref("电影")

const clickNavLi = (nav: { title: string, url: string }) => {
  activeNav.value = nav.title
  router.push("/pc" + nav.url)
}

const search = () =>{
  store.state.search = keyword.value
}
const clickLogin = () =>{
  console.log("---")
}

const navList = [
  {title: "电影", url: "/film"},
  {title: "演员", url: "/actress"},
  {title: "类别", url: "/genre"},
  {title: "收藏", url: "/favorite"},
  {title: "我的", url: "/user"},
]
</script>

<style scoped>
#nav {
  margin: 0;
  height: 64px;
  line-height: 64px;
  background-color: rgba(25, 26, 32, .8);
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
  box-sizing: border-box;
}

#header {
  width: 1200px;
  margin: 0 auto;
  text-align: left;
  box-sizing: border-box;
}

.search {
  display: inline-block;
  display: -webkit-box;
  display: -ms-flexbox;
  width: 200px;
  border-radius: 4px;
  padding-left: 10px;
}

.search > input {
  display: inline-block;
  width: 100%;
  height: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 0;
  outline: 0;
  font-size: 14px;
  padding: 10px 0;
  color: hsla(0, 0%, 100%, .9);
  background: hsla(0, 0%, 100%, .18);
  padding-left: 20px;
}
.search-btn{
  height: 36px;
  padding: 0 10px;
  border: none;
}
.search-btn:hover{
  cursor: pointer;
  border-radius: 2px;
}
.header-menu > span {
  font-size: 16px;
  display: inline-block;
  width: 76px;
  color: #fefefe;
}

.header-menu > span:hover {
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
}

.header-menu > span.active {
  font-size: 18px;
  font-weight: bold;
  color: #fff;
}

#body {
  width: 1200px;
  margin: 0 auto;
  padding-top: 70px;
  padding-bottom: 10px;
}
</style>