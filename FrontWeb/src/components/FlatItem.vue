<template>
    <li class="d-flex flex-row justify-content-between my-2">
      <div class="mx-2">{{ flat.text }}</div>
      <div>
        <button class="btn btn-danger mx-2" @click="$emit('remove-flat', index)">Remove</button>
        <button class="btn btn-secondary" @click="$emit('update-flat', index)">Update</button>
      </div>
    </li>
  </template>
  
  <script setup>
  import { defineProps} from 'vue';
  
  const props = defineProps({
  todo: {
    type: String,
    required: true,
  },
  index: {
    type: Number,
    required: true
  }
  });
  
  </script>