<script setup>
import {ref, defineEmits} from 'vue';

const newFlatText = ref('');
const emit = defineEmits(['create-order']);

function emitAddFlat(){
  emit('create-order', newOrderText.value);
  newOrderText.value = '';
}

</script>

<template>
  <div class="d-flex flex-row">
    <input type="text" placeholder="ajouter un plat" class="form-control mx-2" v-model="newFlatText" @keyup.enter="emitAddFlat">
    <button class="btn btn-primary" @click="emitAddFlat">Add</button>
  </div>
</template>

<style scoped>

</style>  