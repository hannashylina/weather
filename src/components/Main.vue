<script setup>
import { ref, watch, reactive, computed } from 'vue'
import axios from 'axios'
import CityCard from "./CityCard.vue"
import TemperatureChart from "./TemperatureChart.vue";

const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY
const geoApiURL = import.meta.env.VITE_OPEN_WEATHER_GEO_API_URL
const currentWeatherApiURL = import.meta.env.VITE_OPEN_WEATHER_CURRENT_WEATHER_URL
const hourlyForecastApiURL = import.meta.env.VITE_OPEN_WEATHER_5DAY_3HOUR_FORECAST_API_URL

const cityQuery = ref('')
let isCitiesDropdownOpen = ref(false)

let citiesGeo = reactive([])
const activeCity = reactive({data: null})

const isDefaultCity = computed(() => {
    return !!activeCity.data;
})

function changeActiveCity(city){
    axios.get(`${currentWeatherApiURL}?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}`)
        .then(res => {
         //   console.log(res)
            activeCity.data = res.data
            isCitiesDropdownOpen = false
            getHourlyForecast(res.data)
        })
}

function getHourlyForecast(city){
    console.log(city);
    axios.get(`${hourlyForecastApiURL}?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${apiKey}`)
        .then(res => {
            console.log(res);
        })
}

watch(cityQuery, async (newCityQuery) => {
    if(newCityQuery.length > 0) {
        axios.get(`${geoApiURL}?q=${newCityQuery}&limit=5&appid=${apiKey}`)
            .then(resp => {
         //       console.log(resp)
                citiesGeo = resp.data;
                isCitiesDropdownOpen = true
            })
    }

})

watch(activeCity, async (newActiveCity) => {
    console.log(newActiveCity)
})


</script>

<template>
    <section>
        <form class="cities-form">
            <input class="cities-input" type="text" placeholder="Enter city..." v-model="cityQuery" />
            <div class="cities-input-dropdown" v-if="isCitiesDropdownOpen">
                <button @click.prevent="changeActiveCity(city)"
                        class="cities-input-button"
                        type="button"
                        v-for="city in citiesGeo">
                    {{ city.name }},
                    <span v-if="city.state">{{ city.state }},</span>
                    {{ city.country }}
                </button>
            </div>
        </form>
    </section>

    <section class="city-wrapper">
        <TemperatureChart></TemperatureChart>
        <CityCard :city="activeCity.data" v-if="isDefaultCity"></CityCard>
    </section>


</template>

<style scoped>

</style>