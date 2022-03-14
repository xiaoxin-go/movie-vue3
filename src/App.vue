<template>
  <Nav></Nav>
</template>

<script lang="ts" setup>
import Nav from "@/components/Nav.vue"
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

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
