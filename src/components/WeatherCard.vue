<template>
  <div class="weather-card">
    <h2>{{ city }}</h2>
    <p>{{ weather.description }}</p>
    <h1>{{ weather.temp }}°C</h1>
    <p>H: {{ weather.high }}° L: {{ weather.low }}°</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

interface WeatherData {
  temp: number;
  high: number;
  low: number;
  description: string;
}

defineProps<{
  city: string;
  weather: WeatherData;
}>();
</script>

<style scoped>
.weather-card {
  background: #2c3e50;
  color: white;
  padding: 1rem;
  margin: 0.5rem;
  border-radius: 8px;
}
</style>
