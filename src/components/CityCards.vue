<script setup>
import { ref, computed } from "vue"
import { useCitiesStore } from './stores/cities'
import CityCard from "./CityCard.vue"
import AddCard from "./AddCard.vue"
import ModalWindow from "./ModalWindow.vue";
import SearchFrom from "./SearchFrom.vue";


const citiesStore = useCitiesStore()

const MAX_CARDS_NUMBER = 5
const isCardsNumberLessThanMax = computed(() => {
    return citiesStore.cities.length < MAX_CARDS_NUMBER
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
    <CityCard v-for="(city, index) in citiesStore.cities"
              :city="city"
              :index="index"
              :key="city.id"></CityCard>
    <button @click="openModal()"
            class="add-city-button"
            v-if="isCardsNumberLessThanMax">
        Add new city
    </button>
    <ModalWindow :open="isModalOpen"
                 @close-modal="closeModal">
        <SearchFrom :action="'add'" ></SearchFrom>
    </ModalWindow>
</template>

<style scoped>

</style>