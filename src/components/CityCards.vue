<script setup>
import { ref, computed } from "vue"
import { useCitiesStore } from './stores/cities'
import CityCard from "./CityCard.vue"
import AddCard from "./AddCard.vue"
import ModalWindow from "./ModalWindow.vue";
import CitiesForm from "./SearchFrom.vue";


const citiesStore = useCitiesStore()

const MAX_CARDS_NUMBER = 5
const isCardsNumberLessThanMax = computed(() => {
    return citiesStore.cities.length < MAX_CARDS_NUMBER
})

let isModalOpen = ref(false)

function openModal(){
    isModalOpen = true
}
function closeModal(){
    isModalOpen = false
}
</script>

<template>
    <CityCard v-for="city in citiesStore.cities"
              :city="city"
              :key="city.id"></CityCard>
    <button @click="openModal()"
            v-if="isCardsNumberLessThanMax">+</button>
    <ModalWindow :open="isModalOpen"
                 @close-modal="closeModal">
        <CitiesForm :action="'add'"></CitiesForm>
    </ModalWindow>
</template>

<style scoped>

</style>