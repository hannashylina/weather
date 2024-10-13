<script setup>
import { onMounted, computed } from 'vue'
import { useCitiesStore } from './stores/cities'
import CityCards from "./CityCards.vue"
import DisplayToggle from "./DisplayToggle.vue"
import TemperatureForecast from "./TemperatureForecast.vue"
import SearchForm from "./SearchFrom.vue"

const citiesStore = useCitiesStore()
const isCitiesListNotEmpty = computed(() => citiesStore.cities.length > 0)
const isActiveCity = computed(() => Object.keys(citiesStore.activeCity).length > 0)

onMounted(() => {
    citiesStore.getFavoriteCities()
})

</script>

<template>
    <section>
        <SearchForm :action="'default'"></SearchForm>
    </section>
    <section class="row">
        <div class="col col-50">
            <DisplayToggle></DisplayToggle>
            <div class="cities-wrapper">
                <CityCards v-if="isCitiesListNotEmpty"></CityCards>
            </div>
        </div>
        <div class="col col-50">
            <TemperatureForecast v-if="isActiveCity"></TemperatureForecast>
        </div>
    </section>


</template>

<style scoped>

</style>