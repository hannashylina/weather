<script setup>
import { computed } from "vue"
import CityCard from "./CityCard.vue"

const props = defineProps({
    cities: Array
})

</script>

<template>
    <CityCard v-for="city in cities" :city="city" :key="city.id"></CityCard>
</template>

<style scoped>

</style>