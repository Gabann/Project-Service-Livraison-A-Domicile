<script setup>
import {onMounted} from "vue";
import RestaurantCard from "../../components/User/RestaurantCardComponent.vue";
import {useUserRestaurantStore} from "../../store/User/userRestaurantStore";

let restaurantStore = useUserRestaurantStore();

onMounted(() => {
	restaurantStore.getRestaurantList();
});
</script>

<template>
	<div v-for="(restaurant) in restaurantStore.restaurantList">
		<restaurant-card :restaurant="restaurant"></restaurant-card>
	</div>

</template>

<style scoped>

</style>
