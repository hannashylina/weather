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

const isDeleteButtonDisplayed = computed(() => {
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

const isCityActive = computed(() => {
    return citiesStore.activeCity.id === props.city.id
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

function changeActiveCity(){
    citiesStore.setActiveCity(props.city)
}
</script>

<template>
    <div :class="['city-card', {active: isCityActive}]">
        <h2 class="city-card-heading" @click.stop="changeActiveCity">
            {{ city.name }}
        </h2>
        <p class="city-card-description">
            {{ currentWeatherDescription }}
        </p>
        <img :src="currentIcon"
             alt="icon"
             class="city-card-icon"
        />
        <p class="city-card-temperature">{{ currentTemp }} &deg;C</p>
        <p class="city-card-humidity">Humidity: {{ currentHumidity }}%</p>
        <p class="city-card-wind">Wind: {{currentWindSpeed}}m/s</p>
        <div class="city-card-favorites">
            <button type="button"
                    v-if="isCityInFavorites"
                    class="city-favorites"
                    @click.stop="removeFromFavorites">
                &starf;
                <span class="city-favorites__tooltip">Remove from favorites</span>
            </button>
            <button type="button"
                    v-else
                    class="city-favorites"
                    @click.stop="addToFavorites">
                &star;
                <span class="city-favorites__tooltip">Add to favorites</span>
            </button>
        </div>
        <div v-if="isDeleteButtonDisplayed">
            <button v-if="isNotDefaultCard"
                    class="city-card-delete"
                    type="button"
                    @click.stop="openModal">Delete city info</button>
        </div>
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