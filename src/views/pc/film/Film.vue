<template>
<!--  <div class="search">-->
<!--    <div>-->
<!--      <input type="text" v-model="search">-->
<!--      <button @click="onSearch">搜索</button>-->
<!--      <button @click="create">添加</button>-->
<!--    </div>-->
<!--  </div>-->
<!--  <div style="margin: 5px 8px 0 10px">-->
<!--    <FilmCarousel style="width: 600px" :source="CarouselList" path="pc"></FilmCarousel>-->
<!--  </div>-->
  <div class="film-body">
    <div class="film-item" v-for="item in filmList" :key="item" @click="router.push(`/pc/film/${item.id}`)">
      <div class="film-image">
        <img :src="`${LogoPath}/${item.name}.jpg`"/>
      </div>
      <div class="film-info">
        <div>{{ item.name }}/{{ item.release_date.split("T")[0] }}</div>
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

<script lang="ts" setup>
import FilmCarousel from "@/components/FilmCarousel.vue";
import {APIUri, list, post} from "@/api";
import {onMounted, reactive, ref, watch, computed} from "vue";
import {useRouter} from "vue-router";
import {useRequest} from "vue-request";
import {LogoPath} from '@/api';
import store from "@/store";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

const router = useRouter()

const filmList = ref([])

onMounted(() => {
  getFilm()
})

const search = ref("")

const {data: CarouselList} = useRequest(list, {
  defaultParams: [APIUri.film, {page: 1, page_size: 6}],
  formatResult: res => res.data.data_list
})
const create = async() =>{
  alert("获取中...")
  let resp = await post(APIUri.film, {name: search.value})
  if(resp.code != 200){
    alert(resp.message)
  }else{
    onSearch()
  }
}

const pagination = reactive({
  page: 1,
  page_size: 24,
  total: 0,
})

const pages = computed(()=>{
  return Math.ceil(pagination.total/pagination.page_size)
})

const getFilm = async () => {
  let resp = await list(APIUri.film, {...pagination, search: search.value});
  pagination.total = resp.data.total
  filmList.value = resp.data.data_list
}
const onSearch = () => {
  filmList.value = []
  pagination.page = 1
  getFilm()
}
const updateHandler = (page: any) =>{
  pagination.page = page
  getFilm()
}
watch(() => store.state.scroll, (value) => {
  if (pagination.page * pagination.page_size >= pagination.total) {
    return
  }
  pagination.page += 1
  getFilm()
})
watch(() => store.state.search, (value) => {
  search.value = value
  getFilm()
})


</script>

<style scoped>
.search {
  width: 400px;
  height: 30px;
  line-height: 30px;
  padding: 10px;
}

.search > div > button {
  display: inline-block;
  height: 36px;
  line-height: 36px;
  margin-top: 12px;
  border: none;
  color: #ef4f87;
  font-size: 14px;
  background: transparent;
  float: right;
  margin-right: 10px;
}

.search > div > button:active{
  color: #fc4fff;
}

.search > div {
  display: inline-block;
  display: -webkit-box;
  display: -ms-flexbox;
  width: 300px;
  background-color: hsla(0, 0%, 100%, .18);
  border-radius: 4px;
  padding-left: 10px;
  text-align: left;
}

.search > div > input {
  display: inline-block;
  width: 200px;
  height: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-color: transparent;
  border: 0;
  outline: 0;
  font-size: 14px;
  padding: 10px 0;
  color: hsla(0, 0%, 100%, .9);
}

.film-body {
  margin-top: 10px;
}

.film-item {
  display: inline-block;
  width: 190px;
  margin: 5px;
  overflow: hidden;
  background: rgba(255, 255, 255);
  box-shadow: 0 1px 3px rgb(255 255 255 / 10%);
  /*border: 1px solid #fff;*/
}
.film-image{
  overflow: hidden;
  margin: 5px 5px -2px 5px;
}
.film-image:hover{
  cursor: pointer;
}

.film-image > img {
  height: 256px;
}

.film-info {
  text-align: left;
  font-size: 13px;
  margin-bottom: 2px;
  padding: 0 5px;
  color: coral;
}

.film-info > div {
  white-space: nowrap;
  overflow: hidden;
}
#pagination{
  margin-top: 10px;
}
</style>