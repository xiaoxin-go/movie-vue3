<template>
  <div class="links">
    磁力:
    <div class="operator">
      <template v-if="links?.length === 0">
        <button @click="addLink">+ 获取</button>
      </template>
      <template v-else>
        <button  v-if="!active" @click="active=true">+ 展开</button>
        <button v-else @click="active=false">- 收起</button>
      </template>
    </div>
    <template v-if="active">
      <div class="link-item" v-for="item in links" :key="item.id">
        <a :href="item.magnet" class="link-item-name">{{item.name}}</a>
        <a :href="item.magnet" class="link-item-size">{{item.size}}</a>
        <a :href="item.magnet" class="link-item-date">{{item.share_date.split("T")[0]}}</a>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import {defineProps, ref} from "vue";
import {useRequest} from "vue-request";
import {APIUri, get, post} from "@/api";
import {useRoute} from "vue-router";
const props = defineProps({
  filmId: Number,
})

const route = useRoute()

const {data: links} = useRequest(get, {
  defaultParams: [APIUri.filmLink, {film_id: props.filmId}],
  formatResult: res=>res.data.data_list
})

const addLink = async() =>{
  let resp = await post(APIUri.addFilmLink.replace(":id", route.params.id.toString()), {})
  alert(resp.message)
}

const active = ref(false)

</script>

<style scoped>
.links{
  margin-top: 10px;
  text-align: left;
  padding:0 20px;
  font-size: 12px;
  color: #fff;
}
.link-item{
  margin-top: 5px;
}
.link-item>a{
  display: inline-block;
  color: #000;
}
.link-item-name{
  width: 150px;
}
.link-item-size{
  width: 100px;
}
.link-item-date{
  width: 100px;
}
.operator{
  float: right;
}
.operator>button{
  width: 60px;
  border: none;
  background: #ababab;
}
</style>