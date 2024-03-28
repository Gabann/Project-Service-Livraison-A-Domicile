import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from '../stores/authStore';
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import ListRestaurants from "../views/ListRestaurants.vue";
import FlatsList from "../views/FlatsList.vue";
import DetailsOrder from  "../views/DetailsOrder.vue";
import DeliveryTracking from  "../views/DeliveryTracking.vue";
import NotFound from "../views/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/:pathMatch(.*)*', redirect: 'not-found'},
	{path: '/not-found', component: NotFound},
	{path: '/', redirect: 'login'},
    { path: "/", component: Home },
    { path: "/signup", component: Signup },
    { path: "/login", component: Login },
    { path: "/ListRestaurants", component: ListRestaurants },
    { path: "/FlatsList", component: FlatsList },
    { path: "/DetailsOrder", component: DetailsOrder },
    {path: "/DeliveryTracking", component: DeliveryTracking}
  ],
});

router.beforeEach((to, from) => {
  const authStore = useAuthStore()
  if (authStore.isLoggedIn) {
    return true
  } else if (to.fullPath.startsWith('/login')) return '/login'
  return true
})

const vueRouter = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior(to, from) {
		// always scroll to top on route change
		if (to.path !== from.path) {
			return {top: 0};
		}
	},
});

router.beforeEach(async (to, from, next) => {
	const userIsLoggedIn = await useAuthStore().checkIsLoggedIn();

	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (!userIsLoggedIn) {
			next({
				path: '/login',
			});
		} else {
			next();
		}
	} else if ((to.path === '/login' || to.path === '/signup') && userIsLoggedIn) {
		next('/Home'); // redirect to '/' if user is already logged in
	} else {
		next();
	}
});

export default router




