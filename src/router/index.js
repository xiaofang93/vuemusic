import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/home/Home"
import Recommend from "../views/recommend/Recommend"

Vue.use(VueRouter)

const routes = [
  
  {
    path: "",
    redirect: "/home",
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/recommend",
    component: Recommend,
  },
]

const router = new VueRouter({
  routes,
})

export default router
