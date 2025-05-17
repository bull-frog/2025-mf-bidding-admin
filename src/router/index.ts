// router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/other',
    name: 'other',
    component: () => import('../views/OtherView.vue') // 遅延ロード
  },
  {
    path: '/warmup',
    name: 'warmup',
    component: () => import('../views/WarmupView.vue') // 遅延ロード
  },
  {
    path: '/control',
    name: 'control',
    component: () => import('../views/ControlView.vue') // 遅延ロード
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('../views/SigninView.vue') // 遅延ロード
  }
]

const router = createRouter({
  history: createWebHashHistory(), // GitHub Pages のような静的ホスティング環境での使用に適したハッシュモード
  routes
})

export default router
