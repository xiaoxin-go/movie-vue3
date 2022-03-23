<template>
<div id="genre">
  <div class="genre-item" v-for="item in genreList" :key="item.id" @click="router.push(`/wap/genre/${item.id}`)">
    <div class="genre-info">
      <a>{{item.name}}</a>
    </div>
  </div>
</div>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref, watch} from "vue";
import {APIUri, list} from "@/api";
import store from "@/store";
import {useRouter} from "vue-router";

const router = useRouter()

const genreList = ref([])

const pagination = reactive({
  page: 1,
  page_size: 48,
  total: 0
})

const getGenre = async() =>{
  let resp = await list(APIUri.genre, pagination);
  pagination.total = resp.data.total
  resp.data.data_list.map((item: any) => {
    genreList.value.push(item)
  })
}
onMounted(() => {
  getGenre()
})

watch(() => store.state.scroll, (value) => {
  if (pagination.page * pagination.page_size >= pagination.total) {
    return
  }
  pagination.page += 1
  getGenre()
})

</script>

<style scoped>
.genre-item{
  display: inline-block;
  height: 40px;
  line-height: 40px;
  min-width: 100px;
  margin: 5px;
}
.genre-info>a{
  color: #fc4dab;
}
</style>