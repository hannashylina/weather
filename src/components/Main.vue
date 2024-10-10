<script setup>
import { ref, watch, reactive, computed } from 'vue'
import axios from 'axios'
import CityCard from "./CityCard.vue"

const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY
const geoApiUrl = import.meta.env.VITE_OPEN_WEATHER_GEO_API_URL
const currentWeatherURL = import.meta.env.VITE_OPEN_WEATHER_CURRENT_WEATHER_URL

const cityQuery = ref('')

let citiesGeo = reactive([])
const activeCity = reactive({data: null})

const isDefaultCity = computed(() => {
    return !!activeCity.data;
})

function changeActiveCity(city){
    axios.get(`${currentWeatherURL}?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}`)
        .then(res => {
         //   console.log(res)
            activeCity.data = res.data
        })
}

watch(cityQuery, async (newCityQuery) => {
    if(newCityQuery.length > 0) {
        axios.get(`${geoApiUrl}?q=${newCityQuery}&limit=5&appid=${apiKey}`)
            .then(resp => {
         //       console.log(resp)
                citiesGeo = resp.data;
            })
    }

})

watch(activeCity, async (newActiveCity) => {
    console.log(newActiveCity);
})


</script>

<template>
    <section>
        <input type="text" placeholder="Enter city..." v-model="cityQuery" />
        <div>
            <div v-for="city in citiesGeo">
                <button @click="changeActiveCity(city)">
                    {{city.name}},
                    <span v-if="city.state">{{city.state}},</span>
                    {{city.country}}
                </button>
            </div>
        </div>
    </section>

    <section class="cities-wrapper">
        <CityCard :city="activeCity.data" v-if="isDefaultCity"></CityCard>
    </section>


</template>

<style scoped>

</style>