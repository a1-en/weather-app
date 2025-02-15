# Vue.js Weather App

This is a simple weather forecast application built with Vue.js. It fetches real-time weather data from WeatherAPI and displays current, hourly, and weekly forecasts.

## Features
- Fetches real-time weather data
- Displays current weather conditions
- Shows an hourly and weekly forecast
- Responsive design for mobile and desktop

## Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14 or later)
- [Vue.js](https://vuejs.org/)

## Getting Started

### 1. Clone the Repository
```sh
git clone https://github.com/your-username/vue-weather-app.git
cd vue-weather-app
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Set Up Environment Variables
- Go to [weatherapi.com](https://weatherapi.com/) and sign in to get your API key.
- Create a `.env` file in the root directory and add your API key:

```sh
VITE_WEATHER_API_KEY=your_api_key_here
```

### 4. Run the Development Server
```sh
npm run dev
```

The application should now be running on `http://localhost:5173/` or another available port.

## Build for Production
```sh
npm run build
```

## Deploy
To deploy the application, you can use services like Vercel, Netlify, or Firebase Hosting.

## License
This project is open-source and available under the MIT License.

