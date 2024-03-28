<template>
    <div>
      <!-- Header Component -->
      <div class="header">
        <h1>Welcome, {{ username }}</h1>
      </div>
  
      <!-- Restaurant Details Component -->
      <div class="restaurant-details">
        <h2>{{ restaurantName }}</h2>
        <!-- Insérez ici le contenu spécifique des détails du restaurant -->
      </div>
  
      <!-- Order Summary Component -->
      <div class="order-summary">
        <h2>Order Summary</h2>
        <!-- Insérez ici le contenu spécifique du résumé de la commande -->
      </div>
  
      <!-- Delivery Details Component -->
      <div class="delivery-details">
        <h2>Delivery Details</h2>
        <!-- Insérez ici le contenu spécifique des détails de livraison -->
      </div>
  
      <!-- Payment Methods Component -->
      <div class="payment-methods">
        <h2>Payment Methods</h2>
        <!-- Insérez ici le contenu spécifique des méthodes de paiement -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: 'John Doe', // Exemple de nom d'utilisateur
        restaurantName: 'Nom du Restaurant' // Exemple de nom de restaurant
      };
    }
  };
  </script>
  
  <style scoped>
  /* Styles spécifiques à la première page */
  </style>
  