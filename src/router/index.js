import Vue from "vue"
import VueRouter from "vue-router"
const Home = () => import("../views/home/Home")
// import Home from "../views/home/Home"
const Recommend = () => import("../views/recommend/Recommend")
// import Recommend from "../views/recommend/Recommend"

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
