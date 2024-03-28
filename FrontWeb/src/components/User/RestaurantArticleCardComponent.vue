<script setup>
defineProps({
	article: Object,
});
</script>

<template>
	<div class="card">
		<!--		<img alt="Card image" class="card-img" src="https://via.placeholder.com/150">-->
		<div class="card-body">
			<h2 class="card-title">{{ article.name }}</h2>
			<p class="card-text">Type: {{ article.type }}</p>
			<p class="card-text">Ingrédients: {{ article.ingredients }}</p>
			<p class="card-text">Prix: {{ article.price }}</p>
		</div>
	</div>
</template>

<style scoped>

</style>
