<template>
  <div>
    <h1>Liste des Restaurants proches </h1>
    <AddressSearch @search-address="searchRestaurants" />
    <div v-if="restaurants.length > 0">
      <ul>
        <li v-for="restaurant in restaurants" :key="restaurant.id">
          {{ restaurant.name }} - {{ restaurant.address }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Pas de Restaurant trouvé.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AddressSearch from './AddressSearch.vue';

export default {
  components: {
    AddressSearch
  },
  data() {
    return {
      restaurants: []
    };
  },
  methods: {
    async searchRestaurants(address) {
      try {
        const response = await axios.get(`http://10.125.52.56:3000/api/user/getAllRestaurant?address=${address}`);
        this.restaurants = response.data;
      } catch (error) {
        console.error('Error fetching restaurants:', error);
        "Erreur"
      }
    }
  }
};
</script>









