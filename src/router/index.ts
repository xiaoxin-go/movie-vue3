import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {path: '/', redirect: "/film"},
  {path: "/film", component: () => import("@/views/Film.vue"), name: "film"},
  {path: "/film/:id", component: () => import("@/views/FilmInfo.vue"), name: "filmInfo"},
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
