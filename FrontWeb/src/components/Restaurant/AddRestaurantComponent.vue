<script setup>
import { useRestaurantStore } from '../../store/restaurantStore.js';
import { ref } from 'vue';

const restaurantStore = useRestaurantStore();

let name = ref('');
let street = ref('');
let city = ref('');
let postalCode = ref('');
let country = ref('');

function createNameInput(event) {
    name = event.target.value
};

function createStreetInput(event) {
    street = event.target.value
};

function createCityInput(event) {
    city = event.target.value
};

function createPostalCodeInput(event) {
    postalCode = event.target.value
};

function createCountryInput(event) {
    country = event.target.value
};

const submitForm = async () => {
    try {
        restaurantStore.addRestaurant(name, street, city, postalCode, country);
    } catch (error) {
        alert(error.message);
    }
};
</script>

<template>

        <div class="cardContainer">
            <div class="card">
                <form class="resto-form" action="#" @submit.prevent="submitForm">

                    <label for="restaurantName">Nom du restaurant</label>
                    <input type="text" @input="createNameInput" id="restaurantName"
                        placeholder="Entrez le nom du restaurant">

                    <label for="restaurantStreet">Adresse</label>
                    <input type="text" @input="createStreetInput" id="restaurantStreet" placeholder="Rue">

                    <label for="restaurantCity">Ville</label>
                    <input type="text" @input="createCityInput" id="restaurantCity" placeholder="Ville">

                    <label for="restaurantPostalCode">Code Postal</label>
                    <input type="text" @input="createPostalCodeInput" id="restaurantPostalCode"
                        placeholder="Code Postal">

                    <label for="restaurantCountry">Pays</label>
                    <input type="text" @input="createCountryInput" id="restaurantCountry" placeholder="Pays">

                    <button type="submit" class="btn">Ajouter un restaurant</button>
                </form>

            </div>
        </div>

</template>

<style scoped>
.resto-form {
    text-align: center;
    margin-top: 2rem;
    font-size: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

form input {
    width: 15rem;
    margin: 1rem;
    font-family: 'Helvetica Neue';
    border: 1px solid var(--color-title);
    border-radius: 5px;
}

.card {
    width: fit-content;
    text-align: center;
    border: none;
    background-color: var(--background-app);
}

.btn {
    background-color: var(--background-buttons);
    color: white;
    border: none;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    cursor: pointer;
}

/* .cardContainer {
    display: flex;
    flex: 0.5;
    justify-content: center;
    align-items: center;
} */

</style>