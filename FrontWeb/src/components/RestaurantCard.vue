<template>
    <div class="restaurant-card">
      <img :src="restaurant.image" alt="Image du restaurant" />
      <h2>{{ restaurant.name }}</h2>
      <!-- Autres informations sur le restaurant si nécessaire -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'RestaurantCard',
    props: {
      restaurant: {
        type: Object,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  /* Styles CSS spécifiques à la carte du restaurant */
  </style>
  