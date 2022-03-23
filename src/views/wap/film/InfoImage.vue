<template>
  <div class="images">
    <photo-provider>
      <photo-consumer v-for="item in images"
                      :intro="`${ImagePath}/${item.name}-simple.jpg`"
                      :key="item.id"
                      :src="`${ImagePath}/${item.name}.jpg`">
        <img :src="`${ImagePath}/${item.name}-simple.jpg`" class="view-box">
      </photo-consumer>
    </photo-provider>
  </div>
</template>

<script lang="ts" setup>
import {defineProps, ref} from "vue";
import {useRequest} from "vue-request";
import {APIUri, get, ImagePath} from "@/api";

const props = defineProps({
  filmId: Number
})
const {data: images} = useRequest(get, {
  defaultParams: [APIUri.filmImage, {film_id: props.filmId}],
  formatResult: res => res.data.data_list
})

</script>

<style scoped>
.images {
  margin-top: 10px;
  width: 100%;
  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
}

.images > span {
  display: inline-block;
  margin: 3px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgb(0 0 0 / 10%);
}
.images > span > img{
  height: 90px;
  width: 120px;
}
</style>