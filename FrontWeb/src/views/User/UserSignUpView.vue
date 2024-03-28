<script setup>
import {ref} from "vue";
import {useUserAuthStore} from "../../store/User/userAuthStore";

let userStore = useUserAuthStore();

let username = ref("");
let password = ref("");
let email = ref("");
let phoneNumber = ref("");

function signUp() {
	userStore.signUp(username.value, password.value, email.value, phoneNumber.value);
}
</script>

<template>
	<div>
		<form class="container" @submit.prevent="signUp">
			<input v-model="username" placeholder="Username" type="text">
			<input v-model="password" placeholder="Password" type="password">
			<input v-model="email" placeholder="Email" type="text">
			<input v-model="phoneNumber" placeholder="Phone Number" type="tel">
			<button type="submit">Sign Up</button>
		</form>
	</div>
</template>

<style scoped>

</style>
