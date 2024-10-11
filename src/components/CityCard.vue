<script setup>
import { ref, computed } from 'vue'
import { useCitiesStore } from './stores/cities'
import ModalWindow from "./ModalWindow.vue";


const ICON_URL = import.meta.env.VITE_OPEN_WEATHER_ICON_URL
const citiesStore = useCitiesStore()

const props = defineProps({
    city: Object
})

const currentTemp = computed(() => {
    return props.city.main.temp ? Math.round(props.city.main.temp - 273.15) : null
})

const currentIcon = computed(() => {
    return props.city.weather.length > 0 ? `${ICON_URL}${props.city.weather[0].icon}@2x.png` : ''
})

const currentHumidity = computed(( ) => {
    return props.city.main.humidity ?? null
})

const currentWindSpeed = computed(() => {
    return props.city.wind.speed ?? null
})

const currentWeatherDescription = computed(() => {
    return props.city.weather.length > 0 ?  props.city.weather[0].description : null
})

let isModalOpen = ref(false)

function openModal(){
    isModalOpen = true
}
function closeModal(){
    console.log('close')
    isModalOpen = false
}
function deleteCard(id){
    citiesStore.deleteCity(id)
}
</script>

<template>
    <div class="city-card">
        <h2>{{ city.name }}</h2>
        <p>{{ currentWeatherDescription }}</p>
        <img :src="currentIcon" />
        <p>{{ currentTemp }} &deg;C</p>
        <p>Humidity: {{ currentHumidity }}%</p>
        <p>Wind: {{currentWindSpeed}}m/s</p>
        <button @click="openModal">delete</button>
    </div>
    <ModalWindow :open="isModalOpen"
                 @close-modal="closeModal">
        <p>Are you sure?</p>
        <button @click="deleteCard(city.id)">yes</button>
        <button>cancel</button>
    </ModalWindow>
</template>

<style scoped>

</style>