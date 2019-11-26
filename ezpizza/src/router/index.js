import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Confirmacao from '../components/confirmacao';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/confirmacao',
    name: 'confirmcao',
    component: Confirmacao,
  },
]

const router = new VueRouter({
  routes
})

export default router
