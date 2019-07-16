import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import CarDetail from '@/views/cardetail.vue'
import Img from '@/views/img.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/img',
      name: 'img',
      component: Img
    },{
      path: '/cardetail',
      name: 'cardetail',
      component: CarDetail
    },{
      path: '/',
      name: 'home',
      component: Home
    }
  ]
})
