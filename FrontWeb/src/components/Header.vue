<script setup>
import {useApiStore} from "@/stores/apiStore";
import {onMounted, ref} from "vue";

//TODO fix isLoggedIn not being reactive
const isLoggedIn = ref(false);
onMounted(async () => {
	isLoggedIn.value = await useApiStore().checkIsLoggedIn();
});
</script>

<template>
	<header class="d-flex align-items-center">
		<nav class="navbar navbar-expand-sm navbar-light bg-primary">
			<a class="navbar-brand" href="#">Commandez votre repas facilement</a>
			<button aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler"
			        data-bs-target="#navbarTogglerDemo02" data-bs-toggle="collapse" type="button">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div id="navbarTogglerDemo02" class="collapse navbar-collapse">
				<ul class="navbar-nav" style="margin-left: auto">
					<template v-if="!isLoggedIn">
						<RouterLink to="/login">
							<li class="nav-item">
								<a aria-current="page" class="nav-link " href="#">Log in</a>
							</li>
						</RouterLink>

						<RouterLink to="/signup">
							<li class="nav-item">
								<a aria-current="page" class="nav-link " href="#">Sign up</a>
							</li>
						</RouterLink>
					</template>
					<template v-else>

						<RouterLink to="/ListRestaurants">
							<li class="nav-item">
								<a aria-current="page" class="nav-link ">Liste des Restaurants proches</a>
							</li>
						</RouterLink>

						<RouterLink to="/FlatList">
							<li class="nav-item">
								<a aria-current="page" class="nav-link " href="#">Liste des plats </a>
							</li>
						</RouterLink>

						<li class="nav-item">
							<a aria-current="page" class="nav-link " href="#" @click="useApiStore().logOut()">Log out</a>
						</li>
					</template>
				</ul>
			</div>
		</nav>
	</header>
</template>

<style>
nav {
	width: 100%;
	height: 100%;

	padding: 0 30px 0 30px !important;
}
</style>



















<!-- <template>
  <header>
    <img src="@/assets/logo.png" alt="Logo" />
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li v-if="!loggedIn"><router-link to="/login">Login</router-link></li>
        <li v-if="!loggedIn"><router-link to="/register">Register</router-link></li>
        <li v-if="loggedIn"><router-link to="/add-restaurant">Add Restaurant</router-link></li>
        <li v-if="loggedIn"><button @click="logout">Logout</button></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
  computed: {
    loggedIn() {
      // Mettez ici la logique pour vérifier si l'utilisateur est connecté
      return false; // Pour l'exemple, toujours faux
    },
  },
  methods: {
    logout() {
      // Mettez ici la logique de déconnexion
    },
  },
};
</script>

<style>
/* Styles CSS pour le header */
</style> -->
