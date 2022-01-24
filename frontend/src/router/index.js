import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import NotFound from '../views/NotFound.vue';

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
	{ path: '/404', component: NotFound },
	{ path: '/:catchAll(.*)', redirect: '/404' },
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
