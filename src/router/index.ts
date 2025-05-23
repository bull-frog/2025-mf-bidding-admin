// router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import InitCompanies from '@/views/InitCompanies.vue'

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomeView
	},
	{
		path: '/init',
		name: 'init',
		component: InitCompanies
	},
	{
		path: '/edit/:id',
		name: 'edit',
		component: () => import('../views/EditView.vue'),
	},
	{
		path: '/show/:id',
		name: 'show',
		component: () => import('../views/ShowResultView.vue'),
	},
	{
		path: '/current',
		name: 'current',
		component: () => import('../views/CurrentView.vue'),
	}
]

const router = createRouter({
	history: createWebHashHistory(), // GitHub Pages のような静的ホスティング環境での使用に適したハッシュモード
	routes
})

export default router
