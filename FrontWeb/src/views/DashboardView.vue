<script setup>
import AddRestaurantComponent from '../components/AddRestaurantComponent.vue';
import ListRestaurantComponent from '../components/ListRestaurantComponent.vue';

</script>

<template>
    <main class="mainContainer">
    <AddRestaurantComponent class="cardContainer" />
    <ListRestaurantComponent class="divStyle"  />
    </main>



</template>

<style scoped>

.mainContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
}

.cardContainer {
    display: flex;
    flex: 0.5;
    justify-content: center;
    align-items: center;
}

h1 {
    color: black;
    text-align: center;
    margin-top: 100px;
}

.divStyle {
    flex: 0.5;
    background-color: var(--secondary-color);
    width: 100%;
    height: 100%;
    /* align-items: center;
    justify-content: center;
    align-content: center; */
}
</style>