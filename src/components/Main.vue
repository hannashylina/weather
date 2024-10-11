<script setup>
import axios from 'axios'
import { ref, watch, reactive, computed, onMounted } from 'vue'
import { useCitiesStore } from './stores/cities'
import CityCards from "./CityCards.vue"
import TemperatureChart from "./TemperatureChart.vue"
import SearchForm from "./SearchFrom.vue";


const hourlyForecastApiURL = import.meta.env.VITE_OPEN_WEATHER_5DAY_3HOUR_FORECAST_API_URL

// cities cards

const citiesStore = useCitiesStore()
const isCitiesListNotEmpty = computed(() => citiesStore.cities.length > 0)

const defaultCity = reactive({ data: null })
const defaultCityChart = reactive({ data: null })

const activeCity = reactive({ data: null })
const activeCityChart = reactive({ data: null })

const isActiveCity = computed(() => {
    return !!activeCity.data ?? !!defaultCity.data
})

const isActiveCityChart = computed(() => {
    return !!activeCityChart.data
})

function getHourlyForecast(city) {
    axios.get(`${hourlyForecastApiURL}?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${apiKey}`)
        .then(res => {
            //  console.log(res)
            defaultCityChart.data = res.data
        })
}



watch(defaultCity, async (newDefaultCity) => {
    citiesStore.replaceDefaultCity(newDefaultCity)
})


</script>

<template>
    <section>
        <SearchForm :action="'default'"></SearchForm>
    </section>

    <section class="city-wrapper">
        <TemperatureChart v-if="isActiveCityChart"
                          :data="defaultCityChart.data.list"></TemperatureChart>
        <CityCards v-if="isCitiesListNotEmpty"></CityCards>
    </section>


</template>

<style scoped>

</style>