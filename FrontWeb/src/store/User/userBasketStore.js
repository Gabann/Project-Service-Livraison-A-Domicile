import axios from "axios";
import {defineStore} from "pinia";
import {ref} from "vue";

const baseUrl = 'http://localhost:3000/api';

export const useUserBasketStore = defineStore('userBasketStore', () => {
	let articlesList = ref([]);

	function addArticleToBasket(article) {
		articlesList.value.push(article);
		console.log(articlesList.value);
	}

	function clearBasket() {
		articlesList.value = [];
	}

	function confirmOrder(street, city, postalCode, country) {
		let articleIdList = articlesList.value.map((article) => {
			return article.id;
		});
		
		console.log(localStorage.getItem('token'));

		axios.post(baseUrl + '/user/makeOrder', {
			articleIdArray: articleIdList,
			street: street,
			city: city,
			postalCode: postalCode,
			country: country,
		}, {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}).then((response) => {
			console.log(response);
		}).catch((error) => {
			console.error(error);
		});
	}

	return {articlesList, addArticleToBasket, clearBasket, confirmOrder};
});

