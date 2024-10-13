<script setup>
import { ref, computed } from "vue"
import { useCitiesStore } from './stores/cities'
import CityCard from "./CityCard.vue"
import AddCard from "./AddCard.vue"
import ModalWindow from "./ModalWindow.vue";
import SearchFrom from "./SearchFrom.vue";


const citiesStore = useCitiesStore()

const displayCities = computed(() => {
    let result
    switch (citiesStore.display){
        case 'all':
            result = citiesStore.cities
            break
        case 'fav':
            result = citiesStore.favCities
            break
        default:
            result = citiesStore.cities
    }
    return result
})

const MAX_CARDS_NUMBER = 5
const isCardsNumberLessThanMax = computed(() => {
    return citiesStore.cities.length < MAX_CARDS_NUMBER
})

const isDisplayAddButton = computed(() => {
    return citiesStore.display === 'all' && isCardsNumberLessThanMax
})

let isModalOpen = ref(false)

function openModal(){
    isModalOpen.value = true
}
function closeModal(){
    isModalOpen.value = false
}
</script>

<template>
    <CityCard v-for="(city, index) in displayCities"
              :city="city"
              :index="index"
              :key="city.id"></CityCard>
    <button @click="openModal()"
            class="add-city-button"
            v-if="isDisplayAddButton">
        Add new city
    </button>
    <ModalWindow :open="isModalOpen"
                 @close-modal="closeModal">
        <SearchFrom :action="'add'" @close-modal="closeModal"></SearchFrom>
    </ModalWindow>
</template>

<style scoped>

</style>