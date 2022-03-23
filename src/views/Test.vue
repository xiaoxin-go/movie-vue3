<template>
  <div style="white-space: nowrap">
    <photo-provider>
      <photo-consumer v-for="src in imgList" :intro="src.simpleUrl" :key="src.url" :src="src.url">
        <img :src="src.simpleUrl" class="view-box">
      </photo-consumer>
    </photo-provider>
  </div>
</template>

<script lang="ts" setup>
const imgList = [
  {url: "http://192.168.0.102/static/images/MDTM-340-1.jpg", simpleUrl: "http://192.168.0.102/static/images/MDTM-340-1-simple.jpg"},
  {url: "http://192.168.0.102/static/images/MDTM-340-2.jpg", simpleUrl: "http://192.168.0.102/static/images/MDTM-340-2-simple.jpg"},
  {url: "http://192.168.0.102/static/images/MDTM-340-3.jpg", simpleUrl: "http://192.168.0.102/static/images/MDTM-340-3-simple.jpg"},
  {url: "http://192.168.0.102/static/images/MDTM-340-4.jpg", simpleUrl: "http://192.168.0.102/static/images/MDTM-340-4-simple.jpg"},
  {url: "http://192.168.0.102/static/images/MDTM-340-5.jpg", simpleUrl: "http://192.168.0.102/static/images/MDTM-340-5-simple.jpg"},
  {url: "http://192.168.0.102/static/images/MDTM-340-6.jpg", simpleUrl: "http://192.168.0.102/static/images/MDTM-340-6-simple.jpg"},
]

</script>

<style scoped>

</style>