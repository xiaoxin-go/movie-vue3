<template>
  <div class="title">样品图像</div>
  <div class="images">
    <photo-provider>
      <photo-consumer v-for="item in images"
                      :intro="`${ImagePath}/${item.name}-simple.jpg`"
                      :key="item.id"
                      :src="`${ImagePath}/${item.name}.jpg`">
        <img :src="`${ImagePath}/${item.name}-simple.jpg`" class="view-box">
      </photo-consumer>
    </photo-provider>
    <button @click="saveImage">save</button>
  </div>
</template>

<script lang="ts" setup>
import {defineProps, ref} from "vue";
import {useRequest} from "vue-request";
import {APIUri, get, ImagePath, post, put} from "@/api";
import {useRoute} from "vue-router";

const route = useRoute()

const props = defineProps({
  filmId: Number
})
const {data: images} = useRequest(get, {
  defaultParams: [APIUri.filmImage, {film_id: props.filmId}],
  formatResult: res => res.data.data_list
})

const addImage = async() =>{
  let resp = await post(APIUri.addFilmImage.replace(":id", route.params.id.toString()), {})
  alert(resp.message)
}
const saveImage = async() =>{
  let resp = await put(APIUri.saveFilmImage.replace(":id", route.params.id.toString()), {})
  alert(resp.message)
}

</script>

<style scoped>
.title{
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  margin-top: 20px;
  padding-left: 10px;
}
.images {
  margin-top: 10px;
  width: 100%;
  text-align: left;
}

.images > span {
  display: inline-block;
  margin: 5px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgb(0 0 0 / 10%);
}
.images > span > img{
  height: 90px;
}
</style>