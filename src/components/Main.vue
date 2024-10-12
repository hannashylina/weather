<script setup>
import { reactive, computed } from 'vue'
import { useCitiesStore } from './stores/cities'
import CityCards from "./CityCards.vue"
import TemperatureForecast from "./TemperatureForecast.vue"
import SearchForm from "./SearchFrom.vue"

// cities cards

const citiesStore = useCitiesStore()
const isCitiesListNotEmpty = computed(() => citiesStore.cities.length > 0)
const isActiveCity = computed(() => Object.keys(citiesStore.activeCity).length > 0)

</script>

<template>
    <section>
        <SearchForm :action="'default'"></SearchForm>
    </section>

    <section class="city-wrapper">
        <CityCards v-if="isCitiesListNotEmpty"></CityCards>
        <TemperatureForecast v-if="isActiveCity"></TemperatureForecast>
    </section>


</template>

<style scoped>

</style>