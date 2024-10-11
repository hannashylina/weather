<script setup>
import { ref, watch, reactive, computed, onMounted } from 'vue'
import axios from 'axios'
import CityCards from "./CityCards.vue"
import TemperatureChart from "./TemperatureChart.vue"

const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY
const geoApiURL = import.meta.env.VITE_OPEN_WEATHER_GEO_API_URL
const currentWeatherApiURL = import.meta.env.VITE_OPEN_WEATHER_CURRENT_WEATHER_URL
const hourlyForecastApiURL = import.meta.env.VITE_OPEN_WEATHER_5DAY_3HOUR_FORECAST_API_URL

const cityQuery = ref('')
let isCitiesDropdownOpen = ref(false)

let citiesDropdownGeo = reactive([])

// cities cards
const citiesList = reactive({data: []})
const isCitiesListNotEmpty = computed(() => citiesList.data.length > 0)

const defaultCity = reactive({data: null})
const defaultCityChart = reactive({data: null})

const activeCity = reactive({data: null})
const activeCityChart = reactive({data: null})

const isActiveCity = computed(() => {
    return !!activeCity.data ?? !!defaultCity.data
})

const isActiveCityChart = computed(() => {
    return !!activeCityChart.data
})

function changeDefaultCity(city) {
    axios.get(`${currentWeatherApiURL}?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}`)
        .then(res => {
            defaultCity.data = res.data
            getHourlyForecast(res.data)
            isCitiesDropdownOpen.value = false
        })
}

function getHourlyForecast(city) {
    axios.get(`${hourlyForecastApiURL}?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${apiKey}`)
        .then(res => {
            //  console.log(res)
            defaultCityChart.data = res.data
        })
}

watch(cityQuery, async (newCityQuery) => {
    if (newCityQuery.length > 0) {
        axios.get(`${geoApiURL}?q=${newCityQuery}&limit=5&appid=${apiKey}`)
            .then(resp => {
                //       console.log(resp)
                citiesDropdownGeo = resp.data
                isCitiesDropdownOpen.value = true
            })
    }

})

watch(defaultCity, async (newDefaultCity) => {
    citiesList.data.pop()
    citiesList.data.splice(-1, 1, newDefaultCity.data)
})

onMounted(() => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((location) => {
            const city = {
                lat: location.coords.latitude,
                lon: location.coords.longitude
            }
            changeDefaultCity(city)
        })

    }
})


</script>

<template>
    <section>
        <form class="cities-form">
            <input class="cities-input" type="text" placeholder="Enter city..." v-model="cityQuery" />
            <div class="cities-dropdown" v-if="isCitiesDropdownOpen">
                <button @click.prevent="changeDefaultCity(city)"
                        class="cities-input-button"
                        type="button"
                        v-for="city in citiesDropdownGeo">
                    {{ city.name }},
                    <span v-if="city.state">{{ city.state }},</span>
                    {{ city.country }}
                </button>
            </div>
        </form>
    </section>

    <section class="city-wrapper">
        <TemperatureChart v-if="isActiveCityChart"
                          :data="defaultCityChart.data.list"></TemperatureChart>
        <CityCards v-if="isCitiesListNotEmpty"
                   :cities="citiesList.data"></CityCards>
    </section>


</template>

<style scoped>

</style>