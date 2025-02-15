<template>
  <input 
    v-model="searchQuery" 
    placeholder="Search for a city..." 
    @keyup.enter="searchCity"
  />
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";

const searchQuery = ref("");
const emit = defineEmits(["search"]);

const searchCity = () => {
  if (searchQuery.value.trim() !== "") {
    emit("search", searchQuery.value.trim());
    searchQuery.value = "";
  }
};
</script>

<style scoped>
input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
