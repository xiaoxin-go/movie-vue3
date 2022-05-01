<template>
  <div style="text-align: left">
    <div class="actress">
      <div class="actress-img">
        <img :src="`${LogoPath}/${data?.image}.jpg`" alt="">
      </div>
      <div class="actress-info">
        <p style="font-size: 14px">{{data?.name}} <span class="operator"><button class="add" @click="addFilms">+</button>
          <button class="del" @click="remove">-</button></span> </p>
        <p v-if="data?.height !== ''">身高: {{data?.height}}</p>
        <p v-if="data?.cup !== ''">Cup: {{data?.cup}}</p>
        <p v-if="data?.birthday !== ''">生日: {{data?.birthday}}</p>
        <p v-if="data?.age !== ''">年龄: {{data?.age}}</p>
      </div>
    </div>
    <div class="film-item" v-for="film in filmList" :key="film.id" @click="router.push(`/pc/film/${film.id}`)" >
      <div>
        <div class="film-img">
          <img :src="`${LogoPath}/${film.name}.jpg`" alt="">
        </div>
        <div class="film-info">
          <p>{{film.name}}/{{ film.release_date.split("T")[0] }}</p>
        </div>
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
import {useRoute, useRouter} from "vue-router";
import {APIUri, get, list, del, post, LogoPath} from "@/api";
import {computed, onMounted, reactive, ref, watch} from "vue";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import store from "@/store";
import {useRequest} from "vue-request";

const route = useRoute()
const router = useRouter()

const {data} = useRequest(get, {
  defaultParams: [APIUri.actressInfo.replace(":id", route.params.id.toString()), {}],
  formatResult: res => res.data
})

const remove = async()=>{
  let resp = await del(APIUri.actress, route.params.id)
  if(resp.code === 200){
    router.go(-1)
  }else{
    alert(resp.message)
  }
}
const addFilms = async()=>{
  alert("获取中...")
  let resp = await post(APIUri.actressFilms.replace(":id", route.params.id.toString()), {})
  console.log(resp)
  if(resp.code === 200){
    router.go(0)
  }else{
    alert(resp.message)
  }
}

const pagination = reactive({
  page: 1,
  page_size: 23,
  total: 0
})

const pages = computed(()=>{
  return Math.ceil(pagination.total/pagination.page_size)
})

const filmList = ref([])
const getActressFilms = async () => {
  let resp = await list(APIUri.actressFilm.replace(":id", route.params.id.toString()), pagination)
  pagination.total = resp.data.total
  filmList.value = resp.data.data_list
}

const updateHandler = (page: any) =>{
  pagination.page = page
  getActressFilms()
}

onMounted(() => {
  getActressFilms()
})

</script>

<style scoped>
.actress{
  background: #fff;
  padding: 5px;
  margin: 5px;
  text-align: left;
  display: inline-block;
  width: 180px;
  vertical-align: top;
}
.actress-info{
  vertical-align: top;
  margin-left: 10px;
  font-size: 12px;
}
.actress-info>p{
  height: 20px;
  line-height: 20px;
}
.actress-img{
  height: 200px;
  overflow: hidden;
  border-right: 1px solid #ccc;
}
.actress-img>img{
  /*position: relative;*/
  /*right: 212px;*/
  height: 270px;
}
.film-item {
  display: inline-block;
  width: 190px;
  margin: 5px;
  background: rgba(255, 255, 255);
  vertical-align: top;
}

.film-img {
  height: 256px;
  margin: 5px;
  overflow: hidden;
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
.operator{
  float: right;
}
.operator>button{
  height: 18px;
  width: 30px;
  line-height: 18px;
  border: none;
  margin-right: 10px;
  color: #fefefe;
  border-radius: 2px;
  cursor: pointer;
}
.operator>.add{
  background: greenyellow;
}
.operator>.del{
  background: red;
}
#pagination{
  margin-top: 10px;
}
</style>