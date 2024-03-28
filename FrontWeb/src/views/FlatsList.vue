<template>
  <div id="app">
    <h1>Menu du Restaurant</h1>
    <ul>
      <li v-for="item in menuItems" :key="item.id">
        {{ item.name }} - {{ item.price }}€
        <button @click="addToCart(item)">Ajouter au panier</button>
      </li>
    </ul>

    <h2>Panier</h2>
    <ul>
      <li v-for="cartItem in cart" :key="cartItem.id">
        {{ cartItem.name }} - {{ cartItem.price }}€
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      menuItems: [],
      cart: []
    };
  },
  mounted() {
    // Récupérer l'ID du restaurant à partir des paramètres d'URL
    // Utilisation de Vue Router et que l'ID du restaurant est passé dans les paramètres d'URL
    const restaurantId = this.$route.params.restaurantId;

    // Requête à l'API REST ici pour récupérer les plats du restaurant
    axios.get(`http://10.125.52.56:3000/api/restaurant/${restaurantId}/menu`)
      .then(response => {
        this.menuItems = response.data;
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des plats du restaurant :', error);
      });
  },
  methods: {
    addToCart(item) {
      this.cart.push(item);
    }
  }
};
</script>

<style>

</style>












