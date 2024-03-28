<script setup>
import {ref} from "vue";
import {useUserAuthStore} from "../../store/User/userAuthStore";

let userStore = useUserAuthStore();

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
			<button type="submit">Log In</button>
		</form>

		<button @click="userStore.logOut">Log Out</button>
	</div>
</template>

<style scoped>

</style>
