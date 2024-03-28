import {defineStore} from "pinia";
import {ref} from "vue";

export const useUserBasketStore = defineStore('userBasketStore', () => {
	let articlesList = ref([]);

	function addArticleToBasket(article) {
		articlesList.value.push(article);
		console.log(articlesList.value);
	}

	function clearBasket() {
		articlesList.value = [];
	}

	return {articlesList, addArticleToBasket, clearBasket};
});

