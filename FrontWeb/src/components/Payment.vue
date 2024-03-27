<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mon Application Vue</title>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.js"></script>
</head>
<body>
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

  <script>
    const app = Vue.createApp({
      data() {
        return {
          menuItems: [
            { id: 1, name: "Pizza Margherita", price: 10 },
            { id: 2, name: "Pâtes Carbonara", price: 12 },
            { id: 3, name: "Tiramisu", price: 6 }
            // Ajoutez d'autres plats et prix ici
          ],
          cart: []
        };
      },
      methods: {
        addToCart(item) {
          this.cart.push(item);
        }
      }
    });

    app.mount("#app");
  </script>
</body>
</html>
