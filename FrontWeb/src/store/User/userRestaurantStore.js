import axios from "axios";
import {defineStore} from "pinia";
import {ref} from "vue";

const baseUrl = 'http://localhost:3000/api';

export const useUserRestaurantStore = defineStore('userRestaurantStore', () => {

	let restaurantList = ref([]);

	function getRestaurantList() {
		axios.get(baseUrl + '/user/getAllRestaurant', {}).then((response) => {
			console.log(response.data);
			for (const restaurant of response.data.restaurantLIst) {
				restaurantList.value.push(restaurant);
			}
			console.log(restaurantList.value);
		}).catch((error) => {
			console.error(error);
		});
	}

	return {getRestaurantList, restaurantList};
});

