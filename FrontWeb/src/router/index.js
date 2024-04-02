import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/authStore'

import RestoSignInView from '../views/Restaurant/RestoSignInView.vue'
import RestoLoginView from '../views/Restaurant/RestoLoginView.vue'
import RestoMealView from '../views/Restaurant/RestoMealView.vue'
import RestoOrderView from '../views/Restaurant/RestoOrderView.vue'
import RestoDashboardView from '../views/Restaurant/RestoDashboardView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import UserRestaurantDetailsView from "../views/User/UserRestaurantDetailsView.vue";
import UserRestaurantListView from "../views/User/UserRestaurantListView.vue";
import UserLogIn from "../views/User/UserLogInView.vue";
import UserSignUp from "../views/User/UserSignUpView.vue";


const router = createRouter({
    history: createWebHistory(),
    routes: [

        { path: '/', component: RestoLoginView },
        { path: '/RestaurantSignIn', component: RestoSignInView },
        { path: '/RestaurantLogin', component: RestoLoginView },
        { path: '/RestaurantMeal/:id', component: RestoMealView, /*meta: { requiresAuth: true }*/},
        { path: '/RestaurantOrder', component: RestoOrderView, /*meta: { requiresAuth: true }*/},
        { path: '/RestaurantDashboard', component: RestoDashboardView, /*meta: { requiresAuth: true}*/},
        { path: '/not-found', component: NotFoundView },
	    {path: '/UserLogIn', component: UserLogIn},
	    {path: '/UserSignUp', component: UserSignUp},
	    {path: '/UserRestaurantList', component: UserRestaurantListView},
	    {path: '/UserRestaurantDetails/:id', component: UserRestaurantDetailsView},
    ],
});


// router.beforeEach((to, from, next) => {
//     const authStore = useAuthStore();

//     // Vérifier si l'utilisateur est connecté
//     const isLoggedIn = authStore.isLoggedIn;

//     if (to.path === '/logIn' || to.path === '/SignIn') {
//         if (isLoggedIn) {
//             next('/Dashboard');
//         } else {
//             next();
//         }
//     } else {
//         if (!isLoggedIn) {
//             next('/logIn');
//         } else {
//             next();
//         }
//     }
// });


export default router;
