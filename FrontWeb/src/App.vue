<script setup>
import { RouterLink, RouterView } from 'vue-router';
import FooterComponent from "./components/FooterComponent.vue";
import NavbarComponent from './components/NavbarComponent.vue';

</script>

<template>

<header class="header">
    <NavbarComponent />
  </header>

  <main class="mainContainer">
    <RouterView />
  </main>

	<footer>
		<!--		<FooterComponent/>-->
	</footer>
</template>

<style scoped>

.header {
  display: flex;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  justify-content: center;
}

.mainContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 100%;
	position: absolute;
}

</style>
