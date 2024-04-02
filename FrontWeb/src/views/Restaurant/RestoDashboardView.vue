<script setup>
import AddRestaurantComponent from '../../components/Restaurant/AddRestaurantComponent.vue';
import ListRestaurantComponent from '../../components/Restaurant/ListRestaurantComponent.vue';

</script>

<template>
    <main class="mainContainer">
    <AddRestaurantComponent class="cardContainer" />
    <ListRestaurantComponent class="divStyle"  />
    </main>



</template>

<style scoped>

/* .mainContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
} */

.cardContainer {
    display: flex;
    flex: 0.5;
    justify-content: center;
    align-items: center;
}

.divStyle {
    flex: 0.5;
    background-color: var(--background-app);
    width: 100%;
    height: 100%;
    /* align-items: center;
    justify-content: center;
    align-content: center; */
}
</style>