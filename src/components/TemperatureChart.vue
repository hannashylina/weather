<script setup>
import Chart from 'chart.js/auto';
import axios from "axios";
import { onMounted, computed, reactive } from 'vue'
import { useCitiesStore } from './stores/cities'

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY
const HOURLY_FORECAST_API_URL = import.meta.env.VITE_OPEN_WEATHER_5DAY_3HOUR_FORECAST_API_URL

const citiesStore = useCitiesStore()
const activeCity = citiesStore.activeCity

const forecastData = []//reactive({ data: [] })

let forecastDisplayData = computed(() => {
    return [];//forecastData.data.length > 0 ? forecastData.data.slice(0, 8) : []; // t°C entries for the next day
})

const labels = forecastDisplayData.value.map(item => {
    const date = new Date(item.dt * 1000); // convert seconds to milliseconds for unix date format
    const minutes = date.getMinutes() === 0 ? '00' : date.getMinutes()
    return `${date.getHours()}:${minutes}`;
});

const temperatures = forecastDisplayData.value.map(item => Math.round(item.main.temp - 273.15)) // convert Kelvin to Celsius

function getHourlyForecast(city) {
    axios.get(`${HOURLY_FORECAST_API_URL}?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${API_KEY}`)
        .then(res => {
            //  console.log(res)
            forecastData.data = res.data
        })
}

onMounted(() => {
  //  getHourlyForecast(activeCity)
    const ctx = document.getElementById('temperatureChart')
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperatures',
                data: temperatures,
                borderWidth: 1
            }]
        }
    });
})


</script>

<template>
    <div>
        <canvas id="temperatureChart"
                class="temperature-chart"
                width="400"
                height="400"></canvas>
    </div>

</template>

<style scoped>

</style>