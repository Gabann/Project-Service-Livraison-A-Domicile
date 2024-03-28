<script setup>
import {ref} from "vue";
import {useUserStore} from "../../store/userStore";

let userStore = useUserStore();

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
			<button @click="signUp">Sign Up</button>
		</form>
	</div>
</template>

<style scoped>

</style>
