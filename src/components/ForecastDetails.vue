<template>
  <div class="weather-container" v-if="forecast">
    <div class="top-section">
      <h3 class="city">{{ city }}</h3>
      <p class="date">{{ formattedDate }}</p>
      <div class="current-weather">
        <img :src="forecast.current.condition.icon" alt="Weather Icon" class="weather-icon" />
        <h2 class="temperature">{{ forecast.current.temp_c }}°C</h2>
        <p class="condition">{{ forecast.current.condition.text }}</p>
        <p class="last-update">Last Update: {{ forecast.current.last_updated }}</p>
      </div>
    </div>

    <div class="forecast-section">
      <h3 class="forecast-title">Hourly Forecast</h3>
      <div class="hourly-forecast">
        <div v-for="hour in forecast.forecast.forecastday[0].hour.slice(12, 16)" :key="hour.time" class="hourly-item">
          <img :src="hour.condition.icon" alt="Weather Icon" class="weather-icon" />
          <p>{{ hour.temp_c }}°C</p>
          <p>{{ new Date(hour.time).getHours() }}:00</p>
        </div>
      </div>

      <h3 class="forecast-title">Weekly Forecast</h3>
      <div class="weekly-forecast">
        <div v-for="day in forecast.forecast.forecastday" :key="day.date" class="weekly-item">
          <img :src="day.day.condition.icon" alt="Weather Icon" class="weather-icon" />
          <div class="weekly-details">
            <p class="day">{{ getDayName(day.date) }}</p>
            <p class="condition">{{ day.day.condition.text }}</p>
          </div>
          <p class="temperature">{{ day.day.maxtemp_c }}°C</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="loading">Loading...</div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import axios from "axios";

const props = defineProps(["city"]);
const forecast = ref(null);

// Get API key from env 
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

const formattedDate = computed(() => {
  if (forecast.value) {
    const date = new Date(forecast.value.location.localtime);
    return date.toDateString();
  }
  return "";
});

const getDayName = (date) => {
  return new Date(date).toLocaleDateString("en-US", { weekday: "long" });
};

// Fetch weather data from API
const fetchWeatherData = async () => {
  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${props.city}&days=3&aqi=no&alerts=no`
    );
    forecast.value = response.data;
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    forecast.value = null;
  }
};

watch(
  () => props.city,
  () => {
    forecast.value = null;
    fetchWeatherData();
  },
  { immediate: true }
);
</script>

<style scoped>
.weather-container {
  font-family: Arial, sans-serif;
  display: flex;
  background-color: white;
  flex-direction: column;
  width: 100%;
  max-width: 450px; /* Ensures it looks good on small screens */
  align-items: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
}

/* Top section styling */
.top-section {
  background: linear-gradient(135deg, #4A90E2, #1E3A8A);
  color: white;
  padding: 08px 20px; /* Reduced top padding */
  width: 100%;
  text-align: center;
  border-radius: 10px 10px 0 0;
}
.city {
  font-size: 1.5rem;
}
.date {
  font-size: 0.9rem;
}

/* Hourly forecast */
.forecast-section {
  margin-top: 10px;
  width: 100%;
}

.forecast-title {
  font-weight: bold;
  text-align: left;
  padding-left: 10px;
  font-size: 1.2rem;
  color: black;
}

/* Responsive hourly forecast */
.hourly-forecast {
  display: flex;
  gap: 10px;
  overflow-x: auto; 
  padding: 10px;
  white-space: nowrap; /* Prevent wrapping */
}
.hourly-item {
  background: #f2f3f3;
  color: rgb(8, 8, 8);
  padding: 10px;
  border-radius: 7px;
  text-align: center;
  min-width: 80px;
  height: 120px;
  flex: 0 0 auto;
}
.hourly-item p {
  margin-top: 2px;
  font-size: 0.8rem;
}

/* Weekly forecast with responsive grid */
.weekly-forecast {
  display: flex;
  flex-direction: column; 
  gap: 10px;
  width: 100%;
  padding: 10px 0;
}
.weekly-item .weekly-details p {
  margin-right: 220px; 
}
.weekly-item {
  background: #d2dfff; 
  color: rgb(0, 0, 0);
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 120px;
  width: 100%;
  box-sizing: border-box; 
}
.weather-icon {
  width: 50px;
}
/* Weather icons */
.weather-icon {
  width: 40px;
}

/* Responsive Design */
@media screen and (max-width: 768px) {
  .weather-container {
    max-width: 100%;
  }
  .city {
    font-size: 1.3rem;
  }
  .date {
    font-size: 0.8rem;
  }
  .hourly-item {
    min-width: 70px;
    height: 100px;
  }
  .weekly-item {
    height: 100px;
  }
}
</style>
