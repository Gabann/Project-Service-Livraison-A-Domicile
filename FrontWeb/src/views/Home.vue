<template>
    <div class="home">
      <input type="text" v-model="search" placeholder="Enter Address" />
      <button @click="searchRestaurants">Search</button>
      <RestaurantList :restaurants="restaurants" />
    </div>
  </template>
  
  <script>
  import RestaurantList from "@/components/RestaurantList.vue";
  
  export default {
    name: "Home",
    components: {
      RestaurantList,
    },
    data() {
      return {
        search: "",
        restaurants: [], // À remplir avec les restaurants récupérés de l'API
      };
    },
    methods: {
      searchRestaurants() {
        // Mettez ici la logique pour rechercher les restaurants
      },
    },
  };
  </script>
  
  <style scoped>
  /* Styles CSS pour la vue Home */
  </style>
  