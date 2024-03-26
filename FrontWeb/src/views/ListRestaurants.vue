<template>
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
  