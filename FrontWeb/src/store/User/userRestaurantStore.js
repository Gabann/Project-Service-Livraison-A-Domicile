import axios from "axios";
import {defineStore} from "pinia";
import {ref} from "vue";

const baseUrl = 'http://localhost:3000/api';

export const useUserRestaurantStore = defineStore('userRestaurantStore', () => {

	let restaurantList = ref([]);
	let articleList = ref([]);

	function getRestaurantList() {
		restaurantList.value = [];
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

	function getRestaurantArticles(restaurantId) {
		articleList.value = [];
		axios.post(baseUrl + '/user/getAllArticlesFromRestaurant', {
			restaurantId: restaurantId,
		}).then((response) => {
			console.log(response);
			for (const article of response.data.articleList) {
				articleList.value.push(article);
			}
		}).catch((error) => {
			console.error(error);
		});
	}

	return {getRestaurantList, restaurantList, getRestaurantArticles, articleList};
});

