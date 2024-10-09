<script setup>
import { ref, watch, reactive, computed } from 'vue'
import axios from 'axios'
import CityDefault from "./CityDefault.vue"

const apiKey = 'efb209fdfc249a7ec9c029897568d52f'
const geoApiUrl = 'http://api.openweathermap.org/geo/1.0/direct'
const currentWeatherURL = 'https://api.openweathermap.org/data/2.5/weather'

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
        <CityDefault :city="activeCity.data" v-if="isDefaultCity"></CityDefault>
    </section>


</template>

<style scoped>

</style>