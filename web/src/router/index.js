import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/blogDetail',
    name: 'blogDetail',
    component: () => import('../views/detail.vue')
  },
  {
    path: '/author',
    name: 'author',
    component: () => import('../views/author.vue')
  },
  {
    path: '/blogManage',
    name: 'blogManage',
    component: () => import('../views/blogManage.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/editBlog',
    name: 'editBlog',
    component: () => import('../views/editBlog.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
