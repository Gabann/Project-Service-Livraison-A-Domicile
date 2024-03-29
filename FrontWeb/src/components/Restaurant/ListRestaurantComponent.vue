<script setup>
import { ref, onMounted, onUpdated } from 'vue';
import { useRestaurantStore } from '../../store/restaurantStore.js';


const restaurantStore = useRestaurantStore();
let restaurants = restaurantStore.restaurants;

onMounted(async () => {
    restaurants = await restaurantStore.getRestaurants();
    console.log('Liste', restaurants.restaurantLIst);
});

const deleteRestaurant = async (id) => {
    try {
        await restaurantStore.removeRestaurant(id);
    } catch (error) {
        alert(error.message);
    }
};

</script>

<template>
    <div>
        <div class="restaurantContainer">
            <h1 class="resto-title">Mes restaurants</h1>
            <div class="restaurantListContainer">
                <div class="restaurant-card-container" v-for="r in restaurantStore.restaurants.restaurantLIst"
                    :key="r.id">
                    <router-link :to="`/RestaurantMeal/${r.id}`">
                    <div class="resto-card" @click="">
                        <h2 class="textStyleTitle">{{ r.name }}</h2>
                        <p class="textStyle">{{ r.Adresse.street }}</p>
                        <p class="textStyle">{{ r.Adresse.city }}</p>
                        <p class="textStyle">{{ r.Adresse.postalCode }}</p>
                        <p class="textStyle">{{ r.Adresse.country }}</p>
                        <!-- <button type="button" @click.stop="deleteRestaurant(r.id)">Supprimer</button> -->
                    </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.resto-title {
    color: var(--color-title);
    text-align: center;
    margin: 1rem;
    font-weight: bolder;
}

.restaurantContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.restaurantListContainer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
}

.resto-card {
    border: none;
    width: 12rem;
    height: fit-content;
    text-align: center;
    border-radius: 10px;
    padding: 10px;
    background-color: var(--background-cards);
}

.textStyleTitle {
    color: black;
    font-weight: bolder;
    font-size: 25px;
}

.textStyle {
    color: black;
    font-size: 16px;
    margin-bottom: 6px;
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