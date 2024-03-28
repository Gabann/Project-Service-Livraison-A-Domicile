<script setup>
defineProps({
	article: Object,
});
</script>

<template>
	<div class="card">
		<div class="card-body">
			<h2 class="card-title">{{ article.name }}</h2>
			<p class="card-text">Type: {{ article.type }}</p>
			<p class="card-text">Ingrédients: {{ article.ingredients }}</p>
			<p class="card-text">Prix: {{ article.price }}</p>
		</div>
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
