import axios from "axios";
import {defineStore} from "pinia";

const baseUrl = 'http://localhost:3000/api';

export const useUserStore = defineStore('userStore', () => {
	function logIn(username, password) {
		axios.post(baseUrl + '/user/logIn', {
			username: username,
			password: password
		}).then((response) => {
			localStorage.setItem("token", response.data.token);
		}).catch((error) => {
			console.error(error);
		});
	}

	function signUp(username, email, password, phoneNumber) {
		axios.post(baseUrl + '/user/signUp', {
			username: username,
			password: password,
			email: email,
			phoneNumber: phoneNumber
		}).then((response) => {
			console.log(response);
		}).catch((error) => {
			console.error(error);
		});
	}

	function logOut() {
		localStorage.removeItem("token");
	}

	return {logIn, logOut, signUp};
});

