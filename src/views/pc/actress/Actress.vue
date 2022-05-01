<template>
<div id="actress">
  <div class="actress-item" v-for="item in actressList" :key="item.id" @click="router.push(`/pc/actress/${item.id}`)">
    <div class="item-image">
      <img :src="`${LogoPath}/${item.image}.jpg`" alt="">
    </div>
    <div class="actress-info">
      <a href="">{{item.name}}</a>
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
import {computed, onMounted, reactive, ref, watch} from "vue";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
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

const pages = computed(()=>{
  return Math.ceil(pagination.total/pagination.page_size)
})

const getActress = async() =>{
  let resp = await list(APIUri.actress, pagination);
  pagination.total = resp.data.total
  actressList.value = resp.data.data_list
}
onMounted(() => {
  getActress()
})

const updateHandler = (page: any) =>{
  pagination.page = page
  getActress()
}

</script>

<style scoped>
#actress{

}
.actress-item{
  display: inline-block;
  background: #fefefe;
  width: 190px;
  color: #2c3e50;
  margin: 5px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 10%);
  vertical-align: top;
  font-size: 14px;
}
.item-image{
  margin: 5px 5px 0 5px;
  overflow: hidden;
  height: 200px;
}
.item-image:hover{
  cursor: pointer;
}
.item-image>img{
  height: 258px;
}
.actress-info{
  text-align: center;
  height: 26px;
  line-height: 26px;
}
#pagination{
  margin-top: 10px;
}
</style>