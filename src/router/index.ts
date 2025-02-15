import { createRouter, createWebHistory } from 'vue-router';
import WeatherList from '../components/WeatherList.vue';
import ForecastDetails from '../components/ForecastDetails.vue';
import ProfileEdit from '../components/profile/ProfileEdit.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: WeatherList, // WeatherList is the main component on the home page
  },
  {
    path: '/forecast/:city',
    name: 'ForecastDetails',
    component: ForecastDetails,
    props: true, // Allows passing parameters like :city as props
  },
  {
    path: '/profile-edit',
    name: 'ProfileEdit',
    component: ProfileEdit,
    props: true, // Allows passing parameters like :city as props

  }
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((_to, _from, next) => {
  next();
});

export default router;
