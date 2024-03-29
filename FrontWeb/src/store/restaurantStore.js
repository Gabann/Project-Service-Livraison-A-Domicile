import { ref } from "vue";
import { defineStore } from "pinia";
import axios from 'axios';

// const API_URL = 'http://10.125.52.56:3000/api/manager/';
const API_URL = 'http://localhost:3000/api/manager/';

export const useRestaurantStore = defineStore('restaurants', () => {
    const restaurants = ref([]);

    // const token = localStorage.getItem('token');
    // if (!token) {
    //     throw new Error('Authorization token is missing');
    // }

    async function getRestaurants() {
        // const token = localStorage.getItem('token')
        // console.log(token)
        const response = await axios
            .get(API_URL + 'getAllOwnedRestaurant', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            })
            .then((response) => {
                restaurants.value = response.data;
                localStorage.getItem('restaurant', JSON.stringify(response.data));
                console.log(restaurants.value);
            })
            .catch((error) => {
                console.error('Error:', error.response.data);
            })
            return restaurants.value;
    }

    async function addRestaurant(name, street, city, postalCode, country) {
        // const token = localStorage.getItem('token')
        // console.log(token);
        const response = await axios
            .post(API_URL + 'addRestaurant', {
                name: name,
                street: street,
                city: city,
                postalCode: postalCode,
                country: country,
            }, {headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }})
            .then((response) => {
                if(response){
                    getRestaurants();
                }
                })
            .catch((error) => {
                console.error('Error:', error.response.data);
            })
    }

    async function removeRestaurant(id){
        const response = await axios
            .delete(API_URL + 'deleteRestaurant', {
                id: id,
            }, {headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}})
            .then((response) => {
                console.log()
                if(response){
                localStorage.getItem('restaurant', JSON.stringify(response.data));

                    getRestaurants();
                }
            }
            )
            .catch((error) => {
                console.error('Error:', error.response.data)
            })
    }

    async function addArticle(restaurantId, name, ingredients, price, type, preparationTimeSec) {
        const response = await axios
            .post(API_URL + 'addArticle', {
                restaurantId: restaurantId,
                name: name,
                ingredients: ingredients,
                price: price,
                type: type,
                preparationTimeSec: preparationTimeSec
            })
            .catch((error) => {
                console.error('Error:', error.response.data);
            })
        return response.data;
    }



    return { restaurants, getRestaurants, addRestaurant, addArticle, removeRestaurant }
})