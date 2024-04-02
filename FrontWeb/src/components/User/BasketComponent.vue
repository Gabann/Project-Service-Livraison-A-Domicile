<script setup>
import {ref} from "vue";
import {useUserBasketStore} from "../../store/User/userBasketStore";
import BasketItemCardComponent from "./BasketItemCardComponent.vue";

let basketStore = useUserBasketStore();

let street = ref('');
let city = ref('');
let postalCode = ref('');
let country = ref('');
</script>

<template>
	<div v-if="basketStore.articlesList.length <= 0">
		<p>Votre panier est vide</p>
	</div>
	<div v-else>
		<div v-for="(article) in basketStore.articlesList">
			<BasketItemCardComponent :article="article"></BasketItemCardComponent>
		</div>

		<form @submit.prevent="basketStore.confirmOrder(street, city, postalCode, country)">
			<label for="street">Street:</label>
			<input id="street" v-model="street" placeholder="Enter street" required type="text">

			<label for="city">City:</label>
			<input id="city" v-model="city" placeholder="Enter city" required type="text">

			<label for="postalCode">Postal Code:</label>
			<input id="postalCode" v-model="postalCode" placeholder="Enter postal code" required type="text">

			<label for="country">Country:</label>
			<input id="country" v-model="country" placeholder="Enter country" required type="text">

			<button type="submit">Confirm order</button>

			<button @click="basketStore.clearBasket()">Clear basket</button>
		</form>
	</div>
</template>

<style scoped>

</style>
