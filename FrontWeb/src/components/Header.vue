<template>
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
</style>
