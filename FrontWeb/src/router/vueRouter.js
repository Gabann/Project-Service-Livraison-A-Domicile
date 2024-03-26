import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import AddRestaurant from "../views/AddRestaurant.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/add-restaurant", component: AddRestaurant },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
