<script setup>
import axios from "axios";
import { onMounted, reactive, ref, watch } from "vue";
import { useCitiesStore } from './stores/cities'

const citiesStore = useCitiesStore()

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY
const CURRENT_WEATHER_URL = import.meta.env.VITE_OPEN_WEATHER_CURRENT_WEATHER_URL
const GEO_API_URL = import.meta.env.VITE_OPEN_WEATHER_GEO_API_URL
const MAX_SEARCH_RESULTS_NUMBER = 5

const emit = defineEmits(['close-modal'])

const cityQuery = ref('')
let isCitiesDropdownOpen = ref(false)
let citiesDropdownGeo = reactive({ data: [] })

function getCityData(city) {
    axios.get(`${CURRENT_WEATHER_URL}?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}`)
        .then(res => {
            citiesStore.addCity(res.data)
            isCitiesDropdownOpen.value = false
            emit('close-modal')
        })
}

watch(cityQuery, (newCityQuery) => {
    if (newCityQuery.length > 0) {
        axios.get(`${GEO_API_URL}?q=${newCityQuery}&limit=${MAX_SEARCH_RESULTS_NUMBER}&appid=${API_KEY}`)
            .then(resp => {
                //       console.log(resp)
                citiesDropdownGeo.data = resp.data
                isCitiesDropdownOpen.value = true
            })
    }

})
</script>

<template>
    <div class="cities-form">
        <div class="cities-dropdown-wrap">
            <input name="cities"
                   class="cities-input"
                   type="text"
                   placeholder="Enter city..."
                   autocomplete="off"
                   v-model="cityQuery" />
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
        </div>
    </div>
</template>

<style scoped>

</style>