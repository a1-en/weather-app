<template>
  <div class="weather-container">
    <h1 class="title">Weather</h1>
    <div class="profile-icon" @click="goToProfile">
      <span class="material-icons">person</span>
    </div>
    <div class="search-bar">
      <input 
        v-model="searchQuery" 
        placeholder="Search for a city or airport" 
        @keyup.enter="addCity"
        @input="showSuggestions"
      />
      <ul v-if="suggestions.length" class="suggestions-list">
        <li 
          v-for="(suggestion, index) in suggestions" 
          :key="index" 
          @click="redirectToForecast(suggestion)"
        >
          {{ suggestion }}
        </li>
      </ul>
      <p v-if="message" class="message">{{ message }}</p>
    </div>
    
    <div v-for="(weather, city) in weatherData" :key="city" class="weather-card" @click="goToForecast(city)">
      <div class="weather-info">
        <h2 class="location">{{ city }}</h2>

        <p class="time">{{ weather.time }}</p>
        <p class="condition">{{ weather.description }}</p>
      </div>
      <div class="temp-info">
        <h1 class="temperature">{{ weather.temp }}°</h1>
        <p class="high-low">H:{{ weather.high }}° L:{{ weather.low }}°</p>
      </div>
    </div>
    
    <ProfileEdit v-if="isProfileOpen" :user="user" @close="isProfileOpen = false" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import ProfileEdit from "./profile/ProfileEdit.vue";

const router = useRouter();
const searchQuery = ref("");
const weatherData = ref<Record<string, any>>({});
const suggestions = ref<string[]>([]);
const message = ref("");
const isProfileOpen = ref(false);
const user = ref({
  name: "Jane Doe",
  email: "jane@gmail.com",
  phone: "+01 234 567 89",
});

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

// const openProfile = () => {
//   isProfileOpen.value = true;
// };
const goToProfile = () => {
  // Navigate to a profile edit page or component
  router.push({ name: "ProfileEdit" });
};

const showSuggestions = async () => {
  if (!searchQuery.value.trim()) {
    suggestions.value = [];
    return;
  }
  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${searchQuery.value}`
    );
    suggestions.value = response.data.map((city: { name: string, country: string }) => `${city.name}, ${city.country}`);
  } catch (error) {
    console.error("Error fetching city suggestions:", error);
  }
};

const addCity = async () => {
  if (!searchQuery.value.trim()) return;
  const city = searchQuery.value.trim();
  searchQuery.value = "";
  await addCityByName(city, true);
};

const addCityByName = async (city: string, showMessage: boolean = false) => {
  if (weatherData.value[city]) {
    if (showMessage) {
      message.value = `${city} is already added!`;
      setTimeout(() => { message.value = ""; }, 2000);
    }
    return;
  }
  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
    );
    
    weatherData.value = {
      [city]: {
        temp: response.data.current.temp_c,
        high: response.data.forecast?.forecastday[0]?.day.maxtemp_c || response.data.current.temp_c,
        low: response.data.forecast?.forecastday[0]?.day.mintemp_c || response.data.current.temp_c,
        description: response.data.current.condition.text,
        time: new Date(response.data.location.localtime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      ...weatherData.value,
    };
    if (showMessage) {
      message.value = `${city} has been added!`;
      setTimeout(() => { message.value = ""; }, 2000);
    }
  } catch (error) {
    console.error(`Error fetching weather data for ${city}:`, error);
  }
};

const redirectToForecast = (city: string) => {
  suggestions.value = []; // Clear suggestions
  searchQuery.value = ""; // Reset search bar
  router.push({ name: "ForecastDetails", params: { city } }); // Navigate to forecast page
};


const goToForecast = (city: string) => {
  router.push({ name: "ForecastDetails", params: { city } });
};

onMounted(() => {
      addCityByName("London", false);

  addCityByName("Singapore", false);
  addCityByName("Kuala Lumpur", false);

});

</script>
<style scoped>
.weather-container {
  max-width: 1400px;
  width: 100%;
  margin: 20px auto;
  padding: 2rem;
  background-color: white;
  border-radius: 10px;
  min-height: 600px;
   position: relative; 
}

.title {
  font-size: 28px;
  font-weight: bold;
  text-align: left;
  margin-bottom: 07px;
  color: black;
}

.search-bar input {
  width: 90%;
  padding: 10px;
  border-radius: 10px;
  background-color: whitesmoke;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  color: black;
}

.suggestions-list {
  list-style-type: none;
  padding: 0;
  margin-top: 10px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.suggestions-list li {
  padding: 10px;
  cursor: pointer;
  color: black;
}

.suggestions-list li:hover {
  background-color: #f1f1f1;
}

.weather-card {
  display: flex;
  justify-content: space-between;
  background: linear-gradient(to right, #1e3c72, #2a5298);
  color: white;
  width: 100%;
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  height: 120px;

  align-items: flex-start; /* Align all items at the top */
    cursor: pointer; /* Ensure card is clickable */
  z-index: 10; /* Ensure it'
}

.weather-info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Ensure elements are aligned to the top */
}


.location {
  font-size: 18px;
  font-weight: bold;
  margin-top: -10px; /* Push the time element upwards */
}

.time {
  font-size: 14px;
  opacity: 0.8;
  margin-top: -10px; /* Push the time element upwards */
}

.condition {
  font-size: 16px;
  margin-top: 5px; /* Push the time element upwards */
}

.temp-info {
  text-align: right;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Align temp info upwards */
}

.temperature {
  font-size: 36px;
  font-weight: bold;
  margin-top: -12px;
}

.high-low {
  font-size: 14px;
  opacity: 0.8;
}
.material-icons {
  font-size: 35px;
  color: #333;
   margin-right: 30px;
   position: absolute; /* Positioning it absolutely */
  top: 47px;
  right: 6px; /* Adjust top spacing */
  cursor: pointer; /* Change the color as per your preference */
}
.message {
  margin-top: 10px;
  color: green;
  font-size: 14px;
}
@media (max-width: 1024px) {
  .weather-container {
    padding: 1rem;
  }

  .weather-card {
    flex-direction: row;
    justify-content: space-between;
    height: 120px;
    align-items: flex-start;
  }

  .temp-info {
    text-align: right;
  }

  .location, .time, .condition {
    font-size: 16px;
  }

  .temperature {
    font-size: 30px;
  }

  .high-low {
    font-size: 12px;
    margin-top: 25px;
  }
    .material-icons {
  font-size: 35px;
  color: #333;
   margin-right: 30px;
   position: absolute; /* Positioning it absolutely */
  top: 34px;
  right: -8px; /* Adjust top spacing */
  cursor: pointer; /* Change the color as per your preference */
}
}

@media (max-width: 768px) {
  .title {
    font-size: 22px;
        margin-left: 8px;

  }

  .search-bar input {
    width: 85%;
  }

  .weather-card {
    /* padding: 15px; */
    flex-direction: row;
    justify-content: space-between;
  }

  .temperature {
    font-size: 28px;
  }

  .high-low {
    font-size: 12px;
  }

  .location {
    font-size: 16px;
  }

  .time {
    font-size: 12px;
  }

  .condition {
    font-size: 14px;
  }
  .material-icons {
  font-size: 35px;
  color: #333;
   margin-right: 30px;
   position: absolute; /* Positioning it absolutely */
  top: 24px;
  right: -8px; /* Adjust top spacing */
  cursor: pointer; /* Change the color as per your preference */
}
}

@media (max-width: 480px) {
  .title {
    font-size: 20px;
    margin-left: 8px;
  }

  .weather-card {
    /* padding: 10px; */
    flex-direction: row;
    justify-content: space-between;
  }

  .weather-info,
  .temp-info {
    text-align: left;
  }

  .location {
    font-size: 14px;
  }

  .time {
    font-size: 12px;
  }

  .condition {
    font-size: 12px;
  }

  .temperature {
    font-size: 26px;
  }

  .high-low {
    font-size: 10px;
  }
    .material-icons {
  font-size: 35px;
  color: #333;
   margin-right: 30px;
   position: absolute; /* Positioning it absolutely */
  top: 20px;
  right: -8px; /* Adjust top spacing */
  cursor: pointer; /* Change the color as per your preference */
}
}
</style>
