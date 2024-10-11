<script setup>
import { computed } from "vue"
import CityCard from "./CityCard.vue"
import AddCard from "./AddCard.vue"
import { useCitiesStore } from './stores/cities'
const citiesStore = useCitiesStore()

const MAX_CARDS_NUMBER = 5
const isCardsNumberLessThanMax = computed(() => {
    return citiesStore.cities.length < MAX_CARDS_NUMBER
})

</script>

<template>
    <CityCard v-for="city in citiesStore.cities"
              :city="city"
              :key="city.id"></CityCard>
    <AddCard v-if="isCardsNumberLessThanMax"></AddCard>
</template>

<style scoped>

</style>