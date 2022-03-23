import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {path: '/', redirect: "/film"},
  {path: "/wap/film", component: () => import("@/views/wap/film/Film.vue"), name: "film"},
  {path: "/wap/film/:id", component: () => import("@/views/wap/film/Info.vue"), name: "filmInfo"},

  {path: "/wap/actress", component: () => import("@/views/wap/actress/Actress.vue"), name: "actress"},
  {path: "/wap/actress/:id", component: () => import("@/views/wap/actress/Info.vue"), name: "actressInfo"},

  {path: "/wap/genre", component: () => import("@/views/wap/genre/Genre.vue"), name: "genre"},
  {path: "/wap/genre/:id", component: () => import("@/views/wap/genre/Info.vue"), name: "genreInfo"},

  {path: "/pc/film", component: () => import("@/views/pc/Film.vue"), name: "pc_film"},
  {path: "/pc/film/:id", component: () => import("@/views/pc/FilmInfo.vue"), name: "pc_filmInfo"},
  {path: "/test", component: ()=>import("@/views/Test.vue"), name: "test"}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
