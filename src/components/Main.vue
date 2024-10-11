<script setup>
import { reactive, computed } from 'vue'
import { useCitiesStore } from './stores/cities'
import CityCards from "./CityCards.vue"
import TemperatureChart from "./TemperatureChart.vue"
import SearchForm from "./SearchFrom.vue"

// cities cards

const citiesStore = useCitiesStore()
const isCitiesListNotEmpty = computed(() => citiesStore.cities.length > 0)
const isActiveCity = computed(() => !!citiesStore.activeCity)

</script>

<template>
    <section>
        <SearchForm :action="'default'"></SearchForm>
    </section>

    <section class="city-wrapper">
        <CityCards v-if="isCitiesListNotEmpty"></CityCards>
        <TemperatureChart v-if="isActiveCity"></TemperatureChart>
    </section>


</template>

<style scoped>

</style>