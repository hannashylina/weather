<script setup>
import axios from "axios";
import Chart from './Chart.vue'
import { onMounted, computed, reactive, ref, watch } from 'vue'
import { useCitiesStore } from './stores/cities'
import { storeToRefs } from "pinia";

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY
const HOURLY_FORECAST_API_URL = import.meta.env.VITE_OPEN_WEATHER_5DAY_3HOUR_FORECAST_API_URL

const citiesStore = useCitiesStore()
const { activeCity } = storeToRefs(citiesStore)

const chartDisplayMode = ref('one')

const forecastData = reactive({ data: [] })

let forecastOneDayDisplayData = computed(() => {
    return forecastData.data.length > 0 ? forecastData.data.slice(0, 8) : []; // t°C entries for the next day
})

let forecastFiveDaysDisplayData = computed(() => {
    return forecastData.data.length > 0 ? forecastData.data : []; // t°C entries for the next day
})

const isForecastData = computed(() => {
    return forecastData.data.length > 0
})

const isOneDayChart = computed(() => {
    return chartDisplayMode.value === 'one'
})

const isFiveDaysChart = computed(() => {
    return chartDisplayMode.value === 'five'
})

const labelsOneDay = computed(() => {
    return forecastOneDayDisplayData.value.map(item => {
        const date = new Date(item.dt * 1000); // convert seconds to milliseconds for unix date format
        const minutes = date.getMinutes() === 0 ? '00' : date.getMinutes()
        return `${date.getHours()}:${minutes}`
    });
})

const temperaturesOneDay = computed(() => {
    return forecastOneDayDisplayData.value.map(item => Math.round(item.main.temp))
})

const labelsFiveDays = computed(() => {
    return forecastFiveDaysDisplayData.value.map(item => {
        const date = new Date(item.dt * 1000); // convert seconds to milliseconds for unix date format
        const minutes = date.getMinutes() === 0 ? '00' : date.getMinutes()
        return `${date.getHours()}:${minutes}`
    });
})

const temperaturesFiveDays = computed(() => {
    return forecastFiveDaysDisplayData.value.map(item => Math.round(item.main.temp))
})

watch(activeCity, (newCity) => {
    getHourlyForecast(newCity)
}, { deep: true })

function getHourlyForecast(city) {
    axios.get(`${HOURLY_FORECAST_API_URL}?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${API_KEY}&units=metric`)
        .then(res => {
            //  console.log(res)
            forecastData.data = res.data.list
        })
}

onMounted(() => {
    getHourlyForecast(activeCity.value)
})
</script>

<template>
    <aside>
        <label class="period-label">
            Show forecast for
            <select v-model="chartDisplayMode"
                    class="period-select">
                <option selected value="one">1 day</option>
                <option value="five">5 days</option>
            </select>
        </label>

        <Chart v-show="isOneDayChart"
               v-if="isForecastData"
               :labels="labelsOneDay"
               id="one"
               :temperatures="temperaturesOneDay"></Chart>

        <Chart v-show="isFiveDaysChart"
               v-if="isForecastData"
               :labels="labelsFiveDays"
               id="five"
               :temperatures="temperaturesFiveDays"></Chart>
    </aside>
</template>

<style scoped>

</style>