<script setup>
import {computed, ref} from "vue";
import {useAuthStore} from "../stores/authStore";

import router from "../router/router";

let username = ref('');
let phoneNumber = ref('');
let password = ref('');
let email = ref('');
let apiResponse = ref('');

//TODO fix dulpicate code with login.vue
async function submitForm(username, phone, email, password) {
	//TODO add feedback to user when form submition is prevented
	if (validUsername.value === 'invalid' || validPhoneNumber.value === 'invalid' || validPassword.value === 'invalid' || validEmail.value === 'invalid') {
		return;
	}

	apiResponse.value = await useAuthStore().post(`signup`, {username: username, phoneNumber: phoneNumber, email: email, password: password});

	//Auto login after signup
	apiResponse.value = await useAuthStore().post(`logIn`, {username: username, password: password});
	if (apiResponse.value.token) {
		Cookies.set('token', apiResponse.value.token);
		router.push('/ListRestaurants');
	}
}

let validUsername = computed(() => {
	// At least 3 char long
	// Only letters and numbers
	let regex = /^[a-zA-Z0-9]{3,}$/;
	return regex.test(username.value) ? 'valid' : 'invalid';

});

let validPhoneNumber = computed(() => {
  // Au moins 8 caractères de long
  // Only numbers
  let regex = /^[0-9]{8,}$/;
  return regex.test(phoneNumber.value) ? 'valid' : 'invalid';
});


let validPassword = computed(() => {
	// At least 8 characters long
	// Contains at least one uppercase letter
	// Contains at least one lowercase letter
	// Contains at least one digit
	// Contains at least one special character
	let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	return regex.test(password.value) ? 'valid' : 'invalid';
});

let validEmail = computed(() => {
	// At least 8 characters long
	// Contains at least one uppercase letter
	// Contains at least one lowercase letter
	// Contains at least one digit
	// Contains at least one special character
	let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return regex.test(email.value) ? 'valid' : 'invalid';
});
</script>

<template>

	<div class="row justify-content-center">
		<div class="col-md-4">
			<div class="card">
				<div class="card-body">
					<h5 class="card-title">Signup</h5>
					<h3 v-if="apiResponse" class="bg-warning p-2">{{ apiResponse.message }}</h3>

					<form class="needs-validation" novalidate @submit.prevent="submitForm(username, phoneNumber, email, password)">
						<div class="form-group">
							<label :class="validUsername === 'valid' ? 'text-success' : 'text-danger'" for="username">Username:</label>
							<input id="username" v-model="username"
							       :class="validUsername === 'valid' ? 'form-control is-valid' : 'form-control is-invalid'" required
							       type="text">
							<div v-if="validUsername === 'invalid'" class="invalid-feedback">
								Username must be at least 3 characters long and contain only letters and numbers.
							</div>
						</div>

                        <div class="form-group">
                          <label :class="validPhoneNumber === 'valid' ? 'text-success' : 'text-danger'" for="phoneNumber">Phone Number:</label>
                          <input id="phoneNumber" v-model="phoneNumber"
                                 :class="validPhoneNumber === 'valid' ? 'form-control is-valid' : 'form-control is-invalid'" required
                                 type="tel">
                          <div v-if="validPhoneNumber === 'invalid'" class="invalid-feedback">
                              Phone number must be at least 8 characters long and contain only numbers.
                          </div>
                        </div>

						<div class="form-group">
							<label :class="validEmail === 'valid' ? 'text-success' : 'text-danger'" for="email">Email:</label>
							<input id="email" v-model="email"
							       :class="validEmail === 'valid' ? 'form-control is-valid' : 'form-control is-invalid'" required
							       type="email">
							<div v-if="validEmail === 'invalid'" class="invalid-feedback">
								Email must be valid.
							</div>
						</div>

						<div class="form-group">
							<label :class="validPassword === 'valid' ? 'text-success' : 'text-danger'" for="password">Password:</label>
							<input id="password" v-model="password"
							       :class="validPassword === 'valid' ? 'form-control is-valid' : 'form-control is-invalid'" required
							       type="password">
							<div v-if="validPassword === 'invalid'" class="invalid-feedback">
								Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.
							</div>
						</div>

						<button class="btn btn-primary" type="submit">Signup</button>

                        <button class="btn btn-danger mt-2" type="button" @click="registerWithGoogle">
                         <img src="https://www.freepnglogos.com/images/google-logo-history-png-2598.html" alt="Google Logo" class="mr-2">S'inscrire avec Google
                        </button>
					</form>

					<Router-link class="card-link mt-3" to="login">
						You already have an account? Log in here
					</Router-link>
				</div>
			</div>
		</div>
	</div>
</template>


<style scoped>
.valid {
	background-color: green;
}

.invalid {
	background-color: red;
}

.form-group {
	margin-bottom: 1rem;
}
</style>

