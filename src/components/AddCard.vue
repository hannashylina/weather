<script setup>
import { useCitiesStore } from './stores/cities'
const citiesStore = useCitiesStore()
function addCard() {
    //citiesStore.addCity()
}
</script>

<template>
    <button @click="addCard()">+</button>
</template>

<style scoped>

</style>