import * as VueRouter from "vue-router";
import HomePage from "@/views/HomePage.vue";
import LoginPage from "../views/LoginPage.vue";
import { auth } from '../firebase'

const router = VueRouter.createRouter({
	routes: [
	{
		path: "/",
		component: HomePage,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: "/login",
		name: 'Login',
		component: LoginPage
	}

	],
	history: VueRouter.createWebHashHistory(),
});

router.beforeEach((to,from,next)=>{
	if(to.path === '/login' && auth.currentUser){
		next('/')
		return;
	}

	if(to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser){
		 next('/login');
		 return;
	}
	next();
})
export default router;
