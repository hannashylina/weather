<script setup>
import axios from "axios";
import { onMounted, reactive, ref, watch } from "vue";
import { useCitiesStore } from './stores/cities'

const citiesStore = useCitiesStore()

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY
const CURRENT_WEATHER_URL = import.meta.env.VITE_OPEN_WEATHER_CURRENT_WEATHER_URL
const GEO_API_URL = import.meta.env.VITE_OPEN_WEATHER_GEO_API_URL
const MAX_SEARCH_RESULTS_NUMBER = 5

const activeCity = citiesStore.activeCity

const cityQuery = ref('')
let isCitiesDropdownOpen = ref(false)
let citiesDropdownGeo = reactive({ data: [] })

const props = defineProps({
    action: String
})

function getCityData(city) {
    axios.get(`${CURRENT_WEATHER_URL}?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}`)
        .then(res => {
            switch (props.action){
                case 'add':
                    citiesStore.addCity(res.data)
                    break
                case 'default':
                    citiesStore.replaceDefaultCity(res.data)
                    citiesStore.setActiveCity(res.data)
                    break
                default:
            }
            isCitiesDropdownOpen.value = false
        })
}

watch(cityQuery, async (newCityQuery) => {
    if (newCityQuery.length > 0) {
        axios.get(`${GEO_API_URL}?q=${newCityQuery}&limit=${MAX_SEARCH_RESULTS_NUMBER}&appid=${API_KEY}`)
            .then(resp => {
                //       console.log(resp)
                citiesDropdownGeo.data = resp.data
                isCitiesDropdownOpen.value = true
            })
    }

})

onMounted(() => {
    if (props.action === 'default' && "geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((location) => {
            const city = {
                lat: location.coords.latitude,
                lon: location.coords.longitude
            }
            getCityData(city)
        })

    }
})
</script>

<template>
    <form class="cities-form">
        <input class="cities-input" type="text" placeholder="Enter city..." v-model="cityQuery" />
        <div class="cities-dropdown" v-if="isCitiesDropdownOpen">
            <button @click.prevent="getCityData(city)"
                    class="cities-input-button"
                    type="button"
                    v-for="city in citiesDropdownGeo.data">
                {{ city.name }},
                <span v-if="city.state">{{ city.state }},</span>
                {{ city.country }}
            </button>
        </div>
    </form>
</template>

<style scoped>

</style>