<script setup>
import {ref} from "vue";
import {useApiStore} from "@/stores/apiStore";
import Cookies from 'js-cookie';
import router from '../router/vueRouter';

let username = ref("");
let password = ref("");
let apiResponse = ref('');

async function submitForm(username, password) {
	//TODO make the route a constant across all files
	apiResponse.value = await useApiStore().post(`logIn`, {username: username, password: password});
	if (apiResponse.value.token) {
		//TODO fix Cookie “token” does not have a proper “SameSite” attribute value. Soon, cookies without the “SameSite” attribute or with an invalid value will be treated as “Lax”. This means that the cookie will no longer be sent in third-party contexts. If your application depends on this cookie being available in such contexts, please add the “SameSite=None“ attribute to it. To know more about the “SameSite“ attribute, read https://developer.mozilla.org/docs/Web/HTTP/Headers/Set-Cookie/SameSite
		Cookies.set('token', apiResponse.value.token);
		router.push('/ListRestaurants');
	}
}
</script>

<template>
	<div class="row justify-content-center">
		<div class="col-md-4">
			<div class="card">
				<div class="card-body">
					<h5 class="card-title">Login</h5>
					<h3 v-if="apiResponse.message" class="bg-warning" style="padding: 10px">{{ apiResponse.message }}</h3>
					<form @submit.prevent="submitForm(username, password)">
						<div class="form-group">
							<label for="username">Username:</label>
							<input id="username" v-model="username" class="form-control" required type="text">
						</div>

						<div class="form-group">
							<label for="password">Password:</label>
							<input id="password" v-model="password" class="form-control" required type="password">
						</div>

						<button class="btn btn-primary" type="submit">Login</button>
					</form>

					<Router-link to="signup">
						Don't have an account yet? Sign up here
					</Router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.form-group {
	margin-bottom: 1rem;
}
</style>