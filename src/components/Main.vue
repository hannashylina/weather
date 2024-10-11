<script setup>
import { ref, watch, reactive, computed, onMounted } from 'vue'
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
const activeCityChart = reactive({data: null})

const isActiveCity = computed(() => {
    return !!activeCity.data;
})

const isActiveCityChart = computed(() => {
    return !!activeCityChart.data;
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
          //  console.log(res);
            activeCityChart.data = res.data
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

onMounted(() => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((location) => {
            const city = {
                lat: location.coords.latitude,
                lon: location.coords.longitude
            }
            changeActiveCity(city)
        })

    }
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
        <TemperatureChart v-if="isActiveCityChart"
                          :data="activeCityChart.data.list"></TemperatureChart>
        <CityCard v-if="isActiveCity" 
                  :city="activeCity.data" ></CityCard>
    </section>


</template>

<style scoped>

</style>