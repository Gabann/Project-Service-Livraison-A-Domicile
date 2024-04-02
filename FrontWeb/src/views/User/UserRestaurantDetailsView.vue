<script setup>
import {onMounted} from "vue";
import {useRoute} from "vue-router";
import BasketComponent from "../../components/User/BasketComponent.vue";
import RestaurantArticleCard from "../../components/User/RestaurantArticleCardComponent.vue";
import {useUserRestaurantStore} from "../../store/User/userRestaurantStore";

const route = useRoute();

let restaurantStore = useUserRestaurantStore();

onMounted(() => {
	restaurantStore.getRestaurantArticles(route.params.id);
});
</script>

<template>
	<div v-for="(article) in restaurantStore.articleList">
		<RestaurantArticleCard :article="article"></RestaurantArticleCard>
	</div>

	<BasketComponent></BasketComponent>
</template>

<style scoped>

</style>
