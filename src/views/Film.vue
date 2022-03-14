<template>
  <div style="position: fixed;top: 60px"> {{bottom}}</div>
  <div style="margin: 5px 10px 0 10px">
    <FilmCarousel :source="CarouselList"></FilmCarousel>
  </div>
  <div class="wrapper">
    <div class="film-body" ref="leftScroll">
      <div class="film-item" v-for="item in filmList" :key="item" @click="router.push(`/film/${item.id}`)">
        <img :src="`${APIUri.server}/static/${item.name}.jpg`" />
        <div class="film-info">
          <div>{{item.name}}/{{item.release_date.split("T")[0]}}</div>
          <div class="film-title">{{item.title}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import FilmCarousel from "@/views/FilmCarousel.vue";
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

const current = ref(1)

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
  width: 30%;
  margin: 4px;
  overflow: hidden;
  border-radius: 6px;
  background: rgba(248, 246, 246, 0.91);
  border: 1px solid #fff;
}
.film-item > img{
  position: relative;
  right: 144px;
  height: 180px;
}
.film-info{
  text-align: left;
  font-size: 12px;
  margin-bottom: 3px;
  padding: 0 5px;
}
.film-info>div{
  white-space: nowrap;
}
.film-title{
  color: #ababab;
  white-space: nowrap;
}
</style>