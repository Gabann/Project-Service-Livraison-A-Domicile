<script setup>
import {useUserBasketStore} from "../../store/User/userBasketStore";
import BasketItemCardComponent from "./BasketItemCardComponent.vue";

let basketStore = useUserBasketStore();
</script>

<template>
	<div v-if="basketStore.articlesList.length <= 0">
		<p>Votre panier est vide</p>
	</div>
	<div v-else>
		<div v-for="(article) in basketStore.articlesList">
			<BasketItemCardComponent :article="article"></BasketItemCardComponent>

		</div>
		<button @click="basketStore.clearBasket()"></button>
	</div>
</template>

<style scoped>

</style>
