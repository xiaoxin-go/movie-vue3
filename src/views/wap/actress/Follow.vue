<template>
<div id="actress">
  <div class="actress-item" v-for="item in actressList" :key="item.id" @click="router.push(`/wap/actress/${item.id}`)">
    <div class="item-image">
      <img :src="`${LogoPath}/${item.image}.jpg`" alt="">
    </div>
    <div class="actress-info">
      <a href="">{{item.name}}</a>
    </div>
  </div>
</div>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref, watch} from "vue";
import {APIUri, list} from "@/api";
import store from "@/store";
import {useRouter} from "vue-router";
import {LogoPath} from "@/api";

const router = useRouter()

const actressList = ref([])

const pagination = reactive({
  page: 1,
  page_size: 24,
  total: 0
})

const getActress = async() =>{
  let resp = await list(APIUri.userFollow, pagination);
  pagination.total = resp.data.total
  resp.data.data_list.map((item: any) => {
    actressList.value.push(item)
  })
}
onMounted(() => {
  getActress()
})

watch(() => store.state.scroll, (value) => {
  if (pagination.page * pagination.page_size >= pagination.total) {
    return
  }
  pagination.page += 1
  getActress()
})

</script>

<style scoped>
#actress{

}
.actress-item{
  display: inline-block;
  background: #fefefe;
  width: 30%;
  color: #2c3e50;
  margin: 5px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 10%);
  vertical-align: top;
  font-size: 12px;
}
.item-image{
  margin: 3px 3px 0 3px;
  overflow: hidden;
  height: 120px;
}
.item-image>img{
  height: 170px;
}
</style>