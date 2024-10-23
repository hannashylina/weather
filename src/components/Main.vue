<script setup>
import { onMounted, computed, ref } from 'vue'
import { useCitiesStore } from './stores/cities'
import CityCards from "./CityCards.vue"
import DisplayToggle from "./DisplayToggle.vue"
import TemperatureForecast from "./TemperatureForecast.vue"
import axios from "axios";

const CURRENT_WEATHER_URL = import.meta.env.VITE_OPEN_WEATHER_CURRENT_WEATHER_URL
const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY

const citiesStore = useCitiesStore()
const isCitiesListNotEmpty = computed(() => citiesStore.cities.length > 0)
const isActiveCity = computed(() => Object.keys(citiesStore.activeCity).length > 0)
let isGeolocationSuccess = ref(false)
let displayErrorMessage = ref('')

onMounted(() => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((location) => {
            isGeolocationSuccess.value = true
            const city = {
                lat: location.coords.latitude,
                lon: location.coords.longitude
            }
            axios.get(`${CURRENT_WEATHER_URL}?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}`)
                .then(res => {
                    citiesStore.setDefaultCity(res.data)
                    citiesStore.setActiveCity(res.data)
                })
        }, (error) => {
            isGeolocationSuccess.value = false
            if(error.message.toLowerCase().includes('user denied')){
                displayErrorMessage.value = 'Please allow website to use your location'
            }
            else {
                displayErrorMessage.value = error.message
            }
        })
    }
    citiesStore.getFavoriteCities()
    citiesStore.getCities()
})
</script>

<template>
    <section class="row">
        <div class="col col-60 col-sm-100">
            <div v-if="isGeolocationSuccess">
                <DisplayToggle></DisplayToggle>
                <div class="cities-wrapper">
                    <CityCards v-if="isCitiesListNotEmpty"></CityCards>
                </div>
            </div>
            <div v-else>
                {{ displayErrorMessage }}
            </div>
        </div>
        <div class="col col-40 col-sm-100">
            <TemperatureForecast v-if="isActiveCity"></TemperatureForecast>
        </div>
    </section>


</template>

<style scoped>

</style>