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
      <button class="login-btn" @click.stop="clickLogin" v-if="store.state.username===''">login</button>
      <div class="user" v-if="store.state.username!==''" @mouseenter="userShow=true">
        {{store.state.username}}
        <div class="user-model" v-if="userShow" @mouseleave="userShow=false">
          <p @click="router.push('/pc/collect')">我的收藏</p>
          <p @click="router.push('/pc/follow')">我的关注</p>
        </div>
      </div>
    </div>
  </div>
  <div style="width: 100%;background: beige" @click="loginShow=false;registerShow=false">
    <div id="body">
      <router-view :key="$route.fullPath"/>
    </div>
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

</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";
import store from "@/store";
import {reactive, ref, onMounted} from "vue";
import {APIUri, post} from "@/api";

const router = useRouter()

const keyword = ref("")
const loginShow = ref(false)
const registerShow = ref(false)
const userShow = ref(false)
const userData = reactive({
  username: "",
  password: ""
})

const activeNav = ref("电影")

const clickNavLi = (nav: { title: string, url: string }) => {
  activeNav.value = nav.title
  router.push("/pc" + nav.url)
}

const search = () =>{
  store.state.search = keyword.value
}
const clickLogin = () =>{
  loginShow.value = true
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
onMounted(()=>{
  let username = localStorage.getItem("username")
  if (username === null){
    return
  }
  store.state.username = username.toString()
})
const register = async() =>{
  console.log(userData)
  let resp = await post(APIUri.register, userData)
  if(resp.code === 200){
    registerShow.value = false
    alert(resp.message)
  }
}

const navList = [
  {title: "电影", url: "/film"},
  {title: "演员", url: "/actress"},
  {title: "类别", url: "/genre"},
  {title: "可播放", url: "/player"},
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
.login-btn{
  float: right;
  margin-right: 20px;
  margin-top: 15px;
  padding: 0 5px;
  height: 30px;
}
.login-btn:hover{
  cursor: pointer;
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
.login .login-submit{

}
.user{
  position: absolute;
  top: 0;
  right: 100px;
  color: #ffffff;
}
.user:hover{
  cursor: pointer;
}
.user-model{
  position: absolute;
  top: 60px;
  background: #ffffff;
  color: black;
  width: 100px;
  text-align: center;
}
.user-model>p{
  height: 40px;
  line-height: 40px;
}
.user-model>p:hover{
  background: rgba(0, 0, 0, 0.1);
}
</style>