<template>
  <div>
    <h1>Liste des Restaurants proches </h1>
    <div>
      <input type="text" v-model="searchAddress" placeholder="Entrez l'adresse">
      <button @click="searchRestaurants">Search</button>
    </div>
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
export default {
  data() {
    return {
      searchAddress: '',
      restaurants: []
    };
  },
  methods: {
    searchRestaurants() {
      // Call API to fetch restaurants based on searchAddress
      // Example:
      axios.get(`/api/restaurants?address=${this.searchAddress}`)
        .then(response => {
          this.restaurants = response.data;
        })
        .catch(error => {
          console.error('Error fetching restaurants:', error);
        });
      
      // For demonstration purposes, let's assume we have some mock data:
      this.restaurants = [
        { id: 1, name: 'Restaurant A', address: '123 Main St' },
        { id: 2, name: 'Restaurant B', address: '456 Elm St' },
        { id: 3, name: 'Restaurant C', address: '789 Oak St' }
      ];
    }
  }
};
</script>






<!-- <script setup>
import RestaurantCardComponent from "../../components/RestaurantCardComponent.vue";
import { useRestaurantsStore } from "../../stores/restaurants";
import { useAuthStore } from "../../stores/auth";

const restaurantsStore = useRestaurantsStore();
const authStore = useAuthStore()

</script>

<template>
  <h1>RestaurantsList</h1>
  <template v-if="restaurantsStore.restaurants.length > 0">
    <hr />
    <div class="restaurant-cards-container">
      <RestaurantCard v-for="g of restaurantsStore.restaurants" :restaurantId="r.id" />
    </div>
    <hr />
  </template>
  <div class="links">
    <RouterLink v-if="authStore.isLoggedIn" to="/restaurants/add">Add a Restaurant</RouterLink>
  </div>
</template>

<style scoped>
.restaurant-cards-container {
  display: flex;
  flex-wrap: wrap;
  height: 650px;
  padding-block: 2.5%;
  box-sizing: border-box;
  overflow-y: scroll;
}

.restaurant-cards-container::-webkit-scrollbar {
  width: 10px;
}

.restaurant-cards-container::-webkit-scrollbar-track {
  background: transparent;
}

.restaurant-cards-container::-webkit-scrollbar-thumb {
  background: rgb(155, 24, 24);
  border-radius: 5px;
}

.restaurant-cards-container::-webkit-scrollbar-thumb:hover {
  background: rgb(155, 57, 24);
  cursor: pointer;
}

.restaurant-cards-container > * {
  flex-basis: 18%;
  margin: 1%;
  box-sizing: border-box;
}

.restaurant-card {
  height: 300px;
}

.links {
  display: flex;
  justify-content: end;
}

.links > a {
  padding: 0.5ch 2ch;
  background-color: rgb(155, 24, 24);
  border-radius: 1ch;
  text-decoration: none;
  color: white;
  font-size: 1.1rem;
  transition: transform 200ms ease, background-color 200ms ease;
}

.links > a:hover {
  background-color: rgb(155, 57, 24);
  transform: scale(1.05);
}
</style> -->





<!-- <template>
    <ul class="restaurant-list">
      <li v-for="restaurant in restaurants" :key="restaurant.id">
        <!-- Mettez ici le contenu de chaque élément de la liste -->
        <router-link :to="'/restaurant/' + restaurant.id">{{ restaurant.name }}</router-link>
      </li>
    </ul>
  </template>
  
  <script>
  export default {
    name: "RestaurantList",
    props: {
      restaurants: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  /* Styles CSS pour la liste des restaurants */
  </style>
   -->