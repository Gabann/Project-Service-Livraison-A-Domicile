<<<<<<< HEAD
<template>
	<div id="app">
	  <Header />
	  <router-view />
	</div>
  </template>
  
  <script>
  import Header from "./components/Header.vue";
  
  export default {
	name: "App",
	components: {
	  Header,
	},
  };
  </script>
  
=======
<script setup>
import { RouterLink, RouterView } from 'vue-router';

</script>

<template>
<main>
  <RouterView/>
</main>
</template>

<style scoped>

</style>
>>>>>>> ccdbaff7f680f25d58bf9ffeabb62d87839db136
