<script setup>
import { computed } from "vue"
import { useCitiesStore } from './stores/cities'
import { useModalStore } from './stores/modal'
import CityCard from "./CityCard.vue"
import AddCard from "./AddCard.vue"
import ModalWindow from "./ModalWindow.vue";
import CitiesForm from "@/components/SearchFrom.vue";


const citiesStore = useCitiesStore()
const modalStore = useModalStore()

const MAX_CARDS_NUMBER = 5
const isCardsNumberLessThanMax = computed(() => {
    return citiesStore.cities.length < MAX_CARDS_NUMBER
})

function addCard() {
    modalStore.openModal()
}

</script>

<template>
    <CityCard v-for="city in citiesStore.cities"
              :city="city"
              :key="city.id"></CityCard>
    <button @click="addCard()" v-if="isCardsNumberLessThanMax">+</button>
    <ModalWindow>
        <CitiesForm :action="'add'"></CitiesForm>
    </ModalWindow>
</template>

<style scoped>

</style>