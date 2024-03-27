import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from '../stores/auth';
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import AddRestaurant from "../views/AddRestaurant.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: HomeView },
    { path: "/restaurants", component: ListRestaurants },
    { path: "/restaurants/add", component: DetailsOrder },
    { path: "/restaurants/details/:restaurantId", component: DetailsRestaurants },
    // {path: "/zip", component: ZipView}
  ],
});

router.beforeEach((to, from) => {
  const authStore = useAuthStore()
  if (authStore.isLoggedIn) {
    return true
  } else if (to.fullPath.startsWith('/restaurants/add')) return '/'
  return true
})

export default router



// ?