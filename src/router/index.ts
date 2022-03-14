import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {path: '/', redirect: "/film"},
  {path: "/wap/film", component: () => import("@/views/wap/Film.vue"), name: "film"},
  {path: "/wap/film/:id", component: () => import("@/views/wap/FilmInfo.vue"), name: "filmInfo"},

  {path: "/pc/film", component: () => import("@/views/pc/Film.vue"), name: "pc_film"},
  {path: "/pc/film/:id", component: () => import("@/views/pc/FilmInfo.vue"), name: "pc_filmInfo"},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
