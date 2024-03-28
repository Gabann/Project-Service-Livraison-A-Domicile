<script setup>
import {onMounted} from "vue";
import RestaurantCardComponent from "../../components/User/RestaurantCardComponent.vue";
import {useUserRestaurantStore} from "../../store/User/userRestaurantStore";

let restaurantStore = useUserRestaurantStore();

onMounted(() => {
	restaurantStore.getRestaurantList();
});
</script>

<template>
	<div v-for="(restaurant) in restaurantStore.restaurantList">
		<RestaurantCardComponent :restaurant="restaurant"></RestaurantCardComponent>
	</div>

</template>

<style scoped>

</style>
