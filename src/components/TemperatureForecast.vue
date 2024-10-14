<script setup>
import axios from "axios";
import Chart from './Chart.vue'
import { onMounted, computed, reactive, ref, watch } from 'vue'
import { useCitiesStore } from './stores/cities'
import { storeToRefs } from "pinia";

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY
const HOURLY_FORECAST_API_URL = import.meta.env.VITE_OPEN_WEATHER_5DAY_3HOUR_FORECAST_API_URL
const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

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

const allDates = computed(() => {
    const allDays = forecastFiveDaysDisplayData.value.map(item => {
        return item.dt_txt.split(' ')[0]
    })
    let days = [];
    allDays.forEach(day => {
        if(days.indexOf(day) === -1){
            days.push(day)
        }
    })
    return days
})

const labelsFiveDays = computed(() => {
    return allDates.value.map(date => {
        let day = new Date(date).getDay()
        return WEEK_DAYS[day]
    })
})

const temperaturesFiveDays = computed(() => {
    let result = []
    allDates.value.forEach(date => {
        let temps = forecastFiveDaysDisplayData.value.filter(val => val.dt_txt.startsWith(date))
            .map(val => val.main.temp)
        let tempsSum = 0;
        let sum = temps.reduce((sum, current) => sum + current, tempsSum)
        let average = sum / temps.length
        result.push(average)
    })
    return result
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
        <h2>{{activeCity.name}}</h2>
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