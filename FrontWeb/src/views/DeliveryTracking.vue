<template>
    <div>
      <Header :username="username" />
      <div class="delivery-details">
        <h2>Suivi de livraison</h2>
        <!-- Ajoutez ici la description et l'heure estimée -->
      </div>
      <div class="delivery-address">
        <h2>Livreur</h2>
        <!-- Ajoutez ici le nom du livreur -->
        <h2>Adresse de livraison</h2>
        <!-- Ajoutez ici l'adresse de livraison du client -->
      </div>
    </div>
  </template>
  
  <script>
  import Header from './Header.vue';
  
  export default {
    components: {
      Header
    },
    data() {
      return {
        username: 'John Doe' // exemple de nom d'utilisateur
      };
    }
  };
  </script>
  
  <style scoped>
  /* styles spécifiques à la troisième page */
  .delivery-details {
    float: left;
    width: 50%;
  }
  .delivery-address {
    float: right;
    width: 50%;
  }
  </style>
  