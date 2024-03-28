<script setup>
import { useOderStore } from "./stores/OrderStore";

const orderStore = useOrderStore();

const props = defineProps(["restaurantId"]);

const OrderFound = restaurantsStore.restaurants.find((r) => r.id === props.restaurantId);

</script>

<template>
    <RouterLink :to="`/restaurants/details/${restaurantFound.id}`" class="restaurant-card">
      <div class="card-picture">
        <img :src="restaurantFound ? restaurantFound.pictureURL : ''" alt="">
      </div>
      <div class="card-title">
        <span>{{ restaurantFound ? restaurantFound.title : "Unknown" }}</span>
      </div>
  
    </RouterLink>
</template>

<style scoped>
  .restaurant-card {
    text-decoration: none;
    border: solid 1px black;
    border-radius: 10px;
    overflow: hidden;

    display: grid;
    grid-template: 8fr 1fr / 1fr;

    background-color: black;
  }

  .card-title {
    display: block;
    color: transparent;
    padding: 1ch 2ch;
    position: relative;
    left: 120%;
    transition: left 400ms ease,
                color 400ms ease;
  }

  .restaurant-card:hover >.card-title {
    left: 0;
    color: yellowgreen
  }

  .card-picture > img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    transition: filter 200ms ease;
    filter: grayscale(1);
  }

  .restaurant-card:hover > .card-picture > img {
    filter: grayscale(0);
  }

</style>












  