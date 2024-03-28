<script setup>
import {ref} from "vue";
import {useUserStore} from "../../store/userStore";

let userStore = useUserStore();

let username = ref("");
let password = ref("");

function logIn() {
	userStore.logIn(username.value, password.value);
}
</script>

<template>
	<div>
		<form class="container" @submit.prevent="logIn">
			<input v-model="username" placeholder="Username" type="text">
			<input v-model="password" placeholder="Password" type="password">
			<button @click="logIn">Log In</button>
		</form>

		<button @click="userStore.logOut">Log Out</button>
	</div>
</template>

<style scoped>

</style>
