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

const isFavsButtonDisplayed = computed(() => {
    return citiesStore.display === 'all'
})

const isCityInFavorites = computed(() => {
    if(citiesStore.favCities.length > 0){
        let index = citiesStore.favCities.findIndex(city => {
            return city.id === props.city.id
        })
        return index > -1
    }
    else {
        return false
    }

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

function addToFavorites(){
    citiesStore.addFavoriteCity(props.city)
}

function removeFromFavorites(){
    citiesStore.removeFavoriteCity(props.city)
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
        <div v-if="isFavsButtonDisplayed">
            <button type="button"
                    v-if="isCityInFavorites"
                    @click="removeFromFavorites">
                Remove from favorites
            </button>
            <button type="button"
                    v-else
                    @click="addToFavorites">
                Add to favorites
            </button>
        </div>

        <button v-if="isNotDefaultCard"
                class="city-card-delete"
                type="button"
                @click="openModal">Delete city info</button>
    </div>
    <ModalWindow :open="isModalOpen"
                 @close-modal="closeModal">
        <h3>Are you sure you want to delete city info?</h3>
        <div class="buttons-row">
            <button type="button"
                    class="button button-cancel"
                    @click="closeModal">Cancel</button>
            <button type="button"
                    class="button button-confirm"
                    @click="deleteCard(city.id)">Yes</button>
        </div>

    </ModalWindow>
</template>

<style scoped>

</style>