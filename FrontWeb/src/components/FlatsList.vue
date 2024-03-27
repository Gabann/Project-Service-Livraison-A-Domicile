<template>
    <div>
      <AddFlat @add-flat="addFlat" />
      <h3 v-if="flats.length" class="mt-4">Liste des plats :</h3>
      <ul>
        <FlatItem
          v-for="(flat, index) in flats"
          :key="index"
          :flat="flat"
          :index="index"
          @remove-flat="removeFlat"
          @update-flat="prepareUpdate"
        />
      </ul>
      <div class="d-flex flex-row" v-if="editingIndex !== null">
        <input  class="form-control form-control mx-2" v-model="newText" @keyup.enter="updateFlat">
        <button class="btn btn-primary" @click="updateFlat">Save</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import FlatItem from './FlatItem.vue'   
  import AddFlat from './AddFlat.vue' 
  
  const flats = ref([])
  const editingIndex = ref(null)
  const newText = ref('')
  
  const addFlat = newFlatText => {
  todos.value.push({ text: newFlatText})
  }
  
  const removeFlat = index => {
  todos.value.splice(index, 1)
  }
  
  const prepareUpdate = index => {
  if (index !== undefined && flatss.value[index]) {
    editingIndex.value = index
    newText.value = flats.value[index].text
  } else {
    console.error('Plat introuvable à l\'indice:', index)
  }
  }
  
  const updateFlat = () => {
  if (editingIndex.value !== null && flats.value[editingIndex.value]) {
    flats.value[editingIndex.value].text = newText.value
    //console.log(flats.value[editingIndex.value].text);
    editingIndex.value = null
    newText.value = ''
  } else {
    console.error('Tentative de mise à jour d\'un plat non valide')
    editingIndex.value = null
  }
  }
  </script>