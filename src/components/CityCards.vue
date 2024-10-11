<script setup>
import { computed } from "vue"
import CityCard from "./CityCard.vue"
import AddCard from "./AddCard.vue"

const props = defineProps({
    cities: Array
})

const MAX_CARDS_NUMBER = 5
const isCardsNumberLessThanMax = computed(() => {
    return props.cities.length < 5
})

</script>

<template>
    <CityCard v-for="city in cities" :city="city" :key="city.id"></CityCard>
    <AddCard v-if="isCardsNumberLessThanMax"></AddCard>
</template>

<style scoped>

</style>