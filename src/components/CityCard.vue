<script setup>
import { ref, computed } from 'vue'
import { useCitiesStore } from './stores/cities'
import ModalWindow from "./ModalWindow.vue";


const ICON_URL = import.meta.env.VITE_OPEN_WEATHER_ICON_URL
const citiesStore = useCitiesStore()

const props = defineProps({
    city: Object,
    index: Number
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

const isNotDefaultCard = computed(() => {
    return props.index !== 0
})

let isModalOpen = ref(false)

function openModal(){
    isModalOpen.value = true
}
function closeModal(){
    isModalOpen.value = false
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
        <button v-if="isNotDefaultCard"
                class="city-card-delete"
                @click="openModal">delete city info</button>
    </div>
    <ModalWindow :open="isModalOpen"
                 @close-modal="closeModal">
        <h3>Are you sure you want to delete city info?</h3>
        <div class="buttons-row">
            <button type="button"
                    class="button button-cancel"
                    @click="closeModal">cancel</button>
            <button type="button"
                    class="button button-confirm"
                    @click="deleteCard(city.id)">yes</button>
        </div>

    </ModalWindow>
</template>

<style scoped>

</style>