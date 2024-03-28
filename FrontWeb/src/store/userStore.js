import axios from "axios";
import {defineStore} from "pinia";

const baseUrl = 'http://localhost:3000/api/';

export const useUserStore = defineStore('userStore', () => {
	function logIn(userName, password) {
		console.log(userName, password);
		axios.post(baseUrl + 'user/logIn', {
			username: userName,
			password: password
		}).then((response) => {
			localStorage.setItem("token", response.data.token);
		}).catch((error) => {
			console.error(error);
		});
	}

	function logOut() {
		localStorage.removeItem("token");
	}

	return {logIn, logOut};
});

