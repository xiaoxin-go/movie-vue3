<template>
  <div class="actress">
    <div class="actress-img">
      <img :src="`${ImagePath}/${data?.image}.jpg`" alt="">
    </div>
    <div class="actress-info">
      <p style="font-size: 14px">{{data?.name}}</p>
      <p v-if="data?.height !== ''">身高: {{data?.height}}</p>
      <p v-if="data?.cup !== ''">Cup: {{data?.cup}}</p>
      <p v-if="data?.birthday !== ''">生日: {{data?.birthday}}</p>
      <p v-if="data?.age !== ''">年龄: {{data?.age}}</p>
      <p class="operator">
        <button class="add" @click="addFilms">+</button>
        <button class="del" @click="remove">-</button>
      </p>
    </div>
  </div>

  <div>
    <div class="film-item" v-for="film in filmList" :key="film.id" @click="router.push(`/wap/film/${film.id}`)" >
      <div>
        <div class="film-img">
          <img :src="`${ImagePath}/${film.name}.jpg`" alt="">
        </div>
        <div class="film-info">
          <p>{{film.name}}/{{ film.release_date.split("T")[0] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {APIUri, get, list, ImagePath, del, post} from "@/api";
import {onMounted, reactive, ref, watch} from "vue";
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
  page_size: 24,
  total: 0
})

const filmList = ref([])
const getActressFilms = async () => {
  let resp = await list(APIUri.actressFilm.replace(":id", route.params.id.toString()), pagination)
  pagination.total = resp.data.total
  resp.data.data_list.map((item: any) => {
    filmList.value.push(item)
  })
}

onMounted(() => {
  getActressFilms()
})

watch(() => store.state.scroll, (value) => {
  if (pagination.page * pagination.page_size >= pagination.total) {
    return
  }
  pagination.page += 1
  getActressFilms()
})

</script>

<style scoped>
.actress{
  background: #fff;
  padding: 5px;
  margin: 10px;
  text-align: left;
}
.actress-info{
  display: inline-block;
  vertical-align: top;
  margin-left: 10px;
  font-size: 12px;
}
.actress-info>p{
  height: 25px;
  line-height: 25px;
}
.actress-img{
  height: 200px;
  width: 210px;
  display: inline-block;
  overflow: hidden;
  border-right: 1px solid #ccc;
}
.actress-img>img{
  position: relative;
  right: 226px;
  height: 290px;
}
.film-item {
  display: inline-block;
  width: 31%;
  margin: 3px;
  background: rgba(255, 255, 255);
}

.film-img {
  height: 173px;
  margin: 3px;
  overflow: hidden;
}
.film-img>img{
  position: relative;
  /* width: 100%; */
  right: 135px;
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
.operator>button{
  height: 18px;
  width: 30px;
  line-height: 18px;
  border: none;
  margin-right: 10px;
  color: #fefefe;
  border-radius: 2px;
}
.operator>.add{
  background: greenyellow;
}
.operator>.del{
  background: red;
}
</style>