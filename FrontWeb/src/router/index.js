import { createRouter, createWebHistory } from 'vue-router'
// import { useAuthStore } from '../stores/auth'

import SignInView from '../views/SignInView.vue'
import LoginView from '../views/LoginView.vue'
import MealView from '../views/MealView.vue'
import OrderView from '../views/OrderView.vue'
import DashboardView from '../views/DashboardView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import Signup from '../views/Signup.vue'


const router = createRouter({
    history: createWebHistory(),
    routes: [

        { path: '/', component: SignInView },
        { path: '/SignIn', component: SignInView },
        { path: '/Login', component: LoginView },
        { path: '/Meal', component: MealView },
        { path: '/Order', component: OrderView },
        { path: '/Dashboard', component: DashboardView },
        { path: '/not-found', component: NotFoundView },
        { path: '/userSignup', component: Signup },
    ],
});

export default router