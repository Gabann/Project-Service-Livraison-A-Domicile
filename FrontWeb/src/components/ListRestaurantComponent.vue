<script setup>
import { ref, onMounted } from 'vue';
import { useRestaurantStore } from '../store/restaurantStore.js';

const restaurantStore = useRestaurantStore();
let restaurants = restaurantStore.restaurants;

onMounted(async () => {
    restaurants.value = await restaurantStore.getRestaurants();
});

</script>

<template>

    <div>
        <div class="restaurantContainer">
            <h1 class="resto-title">Mes restaurants</h1>

            <div class="restaurantListContainer">

                <div class="character-card-container" v-if="restaurants" v-for="r in restaurants" >
                    <div class="resto-card">
                        <h2 class="textStyle">{{ r.name }}</h2>
                        <!-- <p>{{ restaurant.street }}</p>
                        <p>{{ restaurant.city }}</p>
                        <p>{{ restaurant.postalCode }}</p>
                        <p>{{ restaurant.country }}</p> -->
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<style scoped>
.restaurantContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
}

textStyle {
    color: black;
    text-align: center;
    margin-top: 100px;
}

/* .divStyle {
    flex: 0.5;
    background-color: var(--secondary-color);
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    align-content: center;
} */
</style>