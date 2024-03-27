import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/authStore'

import SignInView from '../views/SignInView.vue'
import LoginView from '../views/LoginView.vue'
import MealView from '../views/MealView.vue'
import OrderView from '../views/OrderView.vue'
import DashboardView from '../views/DashboardView.vue'
import NotFoundView from '../views/NotFoundView.vue'


const router = createRouter({
    history: createWebHistory(),
    routes: [

        { path: '/', component: LoginView },
        { path: '/SignIn', component: SignInView },
        { path: '/Login', component: LoginView },
        { path: '/Meal', component: MealView, /*meta: { requiresAuth: true }*/},
        { path: '/Order', component: OrderView, /*meta: { requiresAuth: true }*/},
        { path: '/Dashboard', component: DashboardView, /*meta: { requiresAuth: true}*/},
        { path: '/not-found', component: NotFoundView },
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