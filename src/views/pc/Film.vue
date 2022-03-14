<template>
  <div style="position: fixed;top: 60px"> {{bottom}}</div>
  <div style="margin: 5px 10px 0 10px">
    <FilmCarousel :source="CarouselList" path="pc"></FilmCarousel>
  </div>
    <div class="film-body" ref="leftScroll">
      <div class="film-item" v-for="item in filmList" :key="item" @click="router.push(`/pc/film/${item.id}`)">
        <div class="film-item-img">
          <img :src="`${APIUri.server}/static/images/${item.name}.jpg`" />
        </div>
        <div class="film-info">
          <div>{{item.name}}/{{item.release_date.split("T")[0]}}</div>
          <div class="film-title">{{item.title}}</div>
        </div>
      </div>
  </div>
</template>

<script lang="ts" setup>
import FilmCarousel from "@/components/FilmCarousel.vue";
import {APIUri, list} from "@/api";
import {onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import {useRequest} from "vue-request";

const router = useRouter()

const filmList = reactive([])

const bottom = ref();

const handleScroll = () => {
  const scrollHeight = document.body.scrollHeight
  const clientHeight = document.body.clientHeight
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  const distance = scrollHeight - scrollTop - clientHeight;
  bottom.value = distance
  if(distance < 120){
    if(pagination.page*pagination.page_size >= pagination.total){
      return
    }
    bottom.value = "加载数据"
    pagination.page += 1
    getFilm()
  }
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll, false);
  getFilm()
})

const {data: CarouselList} = useRequest(list, {
  defaultParams: [APIUri.film, {page: 1, page_size: 6}],
  formatResult: res=>res.data.data_list
})

const pagination = reactive({
  page: 1,
  page_size: 12,
  total: 0,
})

const getFilm = async () =>{
  let resp = await list(APIUri.film, pagination);
  pagination.total = resp.data.total
  resp.data.data_list.map((item: any)=>{
    filmList.push(item)
  })
}

</script>

<style scoped>
.film-body{
  height: 300px;
  margin-top: 10px;
}
.film-item{
  display: inline-block;
  margin: 6px;
  overflow: hidden;
  border-radius: 3px;
}
.film-item-img{
  width: 186px;
  height: 257px;
}
.film-item-img > img{
  width: 100%;
  height: 100%;
}
.film-info{
  text-align: left;
  font-size: 14px;
  margin-bottom: 3px;
  padding: 0 5px;
}
.film-info>div{
  white-space: nowrap;
}
.film-title{
  color: #c4beb4;
  white-space: nowrap;
}
</style>