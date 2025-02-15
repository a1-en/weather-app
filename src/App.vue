<template>
  <div class="container">
    <!-- Conditionally show the WeatherList only on the Home route -->
    <WeatherList v-if="isHomePage" />

    <!-- Dynamically load content based on routing -->
    <div class="dynamic-content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import WeatherList from './components/WeatherList.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// Check if the current route is the home page
const isHomePage = route.name === 'Home';
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  text-align: center;
  padding: 20px;
}

.dynamic-content {
  margin-top: 20px;
}
</style>
