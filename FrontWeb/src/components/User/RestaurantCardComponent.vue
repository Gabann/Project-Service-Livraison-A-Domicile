<script setup>
defineProps({
	restaurant: Object,
});
</script>

<template>
	<router-link :to="`/UserRestaurantDetails/${restaurant.id}`">
		<div class="card">
			<!--		<img alt="Card image" class="card-img" src="https://via.placeholder.com/150">-->
			<div class="card-body">
				<h2 class="card-title">{{ restaurant.name }}</h2>
				<p class="card-text">{{ restaurant.Adresse.city }}</p>
				<p class="card-text">{{ restaurant.Adresse.street }}</p>
				<p class="card-text">{{ restaurant.Adresse.postalCode }}</p>
				<p class="card-text">{{ restaurant.Adresse.country }}</p>
			</div>
		</div>
	</router-link>
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
