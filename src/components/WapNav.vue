<template>
  <div id="header">
    <ul>
      <li :class="activeNav === nav.title?'active':''" v-for="nav in navList" :key="nav.title" @click="clickNavLi(nav)">
        {{ nav.title }}
      </li>
    </ul>
  </div>
  <button class="login-btn" @click.stop="clickLogin" v-if="store.state.username===''">login</button>
  <div class="user" v-if="store.state.username!==''" @click="clickUser">
    {{store.state.username}}
    <div class="user-model" v-if="userShow">
      <p @click="router.push('/wap/collect')">我的收藏</p>
      <p @click="router.push('/wap/follow')">我的关注</p>
    </div>
  </div>
  <div id="body" @click="userShow=false;loginShow=false">
    <router-view :key="$route.fullPath"/>
  </div>
  <div class="login" v-if="loginShow">
    <p>用户名</p>
    <p><input v-model="userData.username" type="text"></p>
    <p>密码</p>
    <p><input v-model="userData.password" type="password"></p>
    <p>
      <button class="login-submit" @click="login">submit</button>
      <button style="margin-left: 10px" @click.stop="clickRegister">register</button>
    </p>
  </div>
  <div class="login" v-if="registerShow">
    <p>用户名</p>
    <p><input v-model="userData.username" type="text"></p>
    <p>密码</p>
    <p><input v-model="userData.password" type="password"></p>
    <p><button class="login-submit" @click="register">submit</button></p>
  </div>
  <div style="position: fixed;bottom: 200px; color: #fff;font-size: 18px;z-index: 1000"> {{bottom}}</div>
</template>

<script lang="ts" setup>
import {useRoute, useRouter} from "vue-router";
import {ref, onMounted, reactive} from "vue";

const router = useRouter()
const route = useRoute()

const activeNav = ref("电影")

const clickNavLi = (nav: { title: string, url: string }) => {
  activeNav.value = nav.title
  router.push("/wap" + nav.url)
}

const navList = [
  {title: "电影", url: "/film"},
  {title: "演员", url: "/actress"},
  {title: "类别", url: "/genre"},
]

import store from "@/store";
import {APIUri, post} from "@/api";

const loginShow = ref(false)
const registerShow = ref(false)
const userShow = ref(false)

const bottom = ref();
const userData = reactive({
  username: "",
  password: ""
})

const clickLogin = () =>{
  loginShow.value = !loginShow.value
}
const clickRegister = () =>{
  registerShow.value = true
}
const login = async() =>{
  let resp = await post(APIUri.login, userData)
  if(resp.code === 200){
    store.state.username = resp.data
    localStorage.setItem("username", resp.data)
    loginShow.value = false
    alert(resp.message)
  }
}
const register = async() =>{
  console.log(userData)
  let resp = await post(APIUri.register, userData)
  if(resp.code === 200){
    registerShow.value = false
    alert(resp.message)
  }
}
const clickUser = () =>{
  userShow.value = !userShow.value
}

const handleScroll = () => {
  const scrollHeight = document.body.scrollHeight
  const clientHeight = document.body.clientHeight
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  const distance = scrollHeight - scrollTop - clientHeight;
  bottom.value = distance
  if(distance < 200){
    store.state.scroll = !store.state.scroll
  }
}

onMounted(() => {
  let username = localStorage.getItem("username")
  if (username === null){
    return
  }
  store.state.username = username.toString()
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
  text-align: left;
  padding-left: 20px;
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
  background: #000000;
}
#app{
  background: beige;
  overflow: auto;
}
.login{
  position: absolute;
  z-index: 100;
  background: #ffffff;
  top: 60px;
  right: 10px;
  padding: 20px;
  text-align: left;
  box-shadow: 0 1px 3px rgb(0 0 0 / 10%);
  border-radius: 3px;
}
.login>p{
  height: 30px;
  line-height: 30px;
}
.login input{
  outline: none;
}
.login-btn{
  position: absolute;
  top: 14px;
  right: 30px;
  padding: 0 5px;
  height: 22px;
  background-color: #bdbdbd;
  z-index: 101;
  border: none;
}
.user{
  position: absolute;
  top: 20px;
  right: 20px;
  color: #ffffff;
  z-index: 101;
}
.user:hover{
  cursor: pointer;
}
.user-model{
  position: absolute;
  top: 40px;
  right: 0;
  background: #ffffff;
  color: black;
  width: 100px;
  text-align: center;
  font-size: 12px;
}
.user-model>p{
  height: 40px;
  line-height: 40px;
}
.user-model>p:hover{
  background: rgba(0, 0, 0, 0.1);
}
</style>