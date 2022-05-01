import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {path: '/', redirect: document.body.clientWidth > 500?"/pc/film": "/wap/film"},
  {path: "/wap/film", component: () => import("@/views/wap/film/Film.vue"), name: "film"},
  {path: "/wap/film/:id", component: () => import("@/views/wap/film/Info.vue"), name: "filmInfo"},

  {path: "/wap/actress", component: () => import("@/views/wap/actress/Actress.vue"), name: "actress"},
  {path: "/wap/actress/:id", component: () => import("@/views/wap/actress/Info.vue"), name: "actressInfo"},

  {path: "/wap/genre", component: () => import("@/views/wap/genre/Genre.vue"), name: "genre"},
  {path: "/wap/genre/:id", component: () => import("@/views/wap/genre/Info.vue"), name: "genreInfo"},

  {path: "/pc/film", component: () => import("@/views/pc/film/Film.vue"), name: "pcFilm"},
  {path: "/pc/film/:id", component: () => import("@/views/pc/film/Info.vue"), name: "pcFilmInfo"},
  {path: "/pc/film/:name/player", component: () => import("@/views/pc/film/Player.vue"), name: "player"},

  {path: "/pc/actress", component: () => import("@/views/pc/actress/Actress.vue"), name: "pcActress"},
  {path: "/pc/actress/:id", component: () => import("@/views/pc/actress/Info.vue"), name: "pcActressInfo"},

  {path: "/pc/genre", component: () => import("@/views/pc/genre/Genre.vue"), name: "pcGenre"},
  {path: "/pc/genre/:id", component: () => import("@/views/pc/genre/Info.vue"), name: "pcGenreInfo"},

  {path: "/test", component: ()=>import("@/views/Test.vue"), name: "test"}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
