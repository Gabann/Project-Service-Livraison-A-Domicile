<script setup>
import {onMounted} from "vue";
import {useRoute} from "vue-router";
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
</template>

<style scoped>
.card {
	width: 300px;
	border: 1px solid #ddd;
	border-radius: 10px;
	overflow: hidden;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-img {
	width: 100%;
	height: 200px;
	object-fit: cover;
}

.card-body {
	padding: 20px;
}

.card-title {
	margin: 0;
	margin-bottom: 10px;
	font-size: 24px;
	font-weight: bold;
}

.card-text {
	color: #666;
	line-height: 1.5;
}
</style>
