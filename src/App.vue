<template>
  <Nav v-if="clientWidth<500"></Nav>
  <PcNav v-else></PcNav>
</template>

<script lang="ts" setup>
import Nav from "@/components/WapNav.vue"
import PcNav from "@/components/PcNav.vue"
import {computed} from "vue"

const clientWidth = computed(()=>{
  return document.body.clientWidth
})

</script>

<style>
*{
  margin: 0;
  padding: 0;
}
html{
  height: 100%;
}
body{
  height: 100%;
  background: black;
}
ul, li{
  list-style: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
