import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';

const routes = [
	{
		path: '/',
		name: 'Login',
		component: Login,
	},
	{
		path: '/home',
		name: 'Home',
		component: () => import(/* webpackChunkName: "home" */ '../views/Home'),
	},
	{
		path: '/edit/:id',
		name: 'Edit',
		// lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "edit" */ '../views/Edit'),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
