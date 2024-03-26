<template>
    <div>
      <input type="text" v-model="address" placeholder="Entrez une adresse..." />
      <button @click="search">Rechercher</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AddressSearch',
    data() {
      return {
        address: ''
      };
    },
    methods: {
      search() {
        // Logique de recherche d'adresse
      }
    }
  }
  </script>
  
  <style scoped>
  /* Styles CSS spécifiques au champ d'adresse */
  </style>
  