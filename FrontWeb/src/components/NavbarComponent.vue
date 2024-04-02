<script setup>
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { useAuthStore } from '../store/authStore';

const authStore = useAuthStore();
const isLoggedIn = authStore.isLoggedIn;

const logOut = async () => {
    try {
        authStore.logOut();
    } catch (error) {
        alert(error.message);
    }
};


</script>

<template>
    <header>
        <nav class="navbar">
            <div class="entire-logo">
                <img class="logo" src="../assets/images/20231219_101802_0000.webp" alt="Logo" width="60">
                <span class="site-name">Interface Business</span>
            </div>
            <ul>
                <li>
                    <span >
                        <RouterLink to="/RestaurantSignIn">Créer un compte</RouterLink>
                    </span>
                </li>
                <li>
                    <span>
                        <RouterLink to="/RestaurantMeal">Menus</RouterLink>
                    </span>
                </li>
                <li>
                    <span >
                        <RouterLink to="/RestaurantOrder">Commandes</RouterLink>
                    </span>
                </li>
                <li>
                    <span >
                        <RouterLink to="/RestaurantDashboard">Dashboard</RouterLink>
                    </span>
                </li>
                <li>
                    <div class="is-logged-in-btn">
                        <RouterLink to="/RestaurantLogin" class="is-logged-in-btn-true">Se connecter</RouterLink>
                        <span >
                            <RouterLink to="/RestaurantLogin" @click="logOut" class="is-logged-in-btn-false">Déconnexion</RouterLink>
                        </span>
                    </div>
                </li>


            </ul>
        </nav>
    </header>
</template>

<style scoped>
header {
    width: 100%;
    color: var(--text-app);
}

.navbar {
    display: flex;
    flex-direction: row;
    background-color: rgb(14, 14, 14);
    margin: 0;
    padding: 0;
    height: 5em;
    font-size: 16px;
    /* width: 100%; */
}

nav ul {
    display: flex;
    margin-right: 3rem;
    margin-bottom: 0%;

}

nav ul li {
    flex-direction: row;
    list-style-type: none;
    font-size: 18px;
}

nav ul li a {
    color: var(--vt-c-white-mute);
    text-decoration: none;
    padding-left: 2rem;
    padding-right: 2rem;
}

.entire-logo {
    margin-left: 1rem;
}

.logo {
    margin-left: 2rem;
    margin-right: 2rem;
    border-radius: 50%;
}

.site-name {
    color: var(--vt-c-white-soft);
    font-size: 30px;
    font-weight: 500;
    margin-top: 2rem;
}
</style>