<script setup>
import { ref, watch, onMounted } from 'vue'
import { useCitiesStore } from './stores/cities'
const citiesStore = useCitiesStore()

let displayMode = ref('all')

watch(displayMode, (newDisplayMode) => {
    citiesStore.setDisplay(newDisplayMode)
})

onMounted(() => {
    citiesStore.setDisplay(displayMode.value)
})
</script>

<template>
    <fieldset class="cities-display">
        <label>
            All
            <input type="radio" name="display" checked value="all" v-model="displayMode">
        </label>
        <label>
            Favorites
            <input type="radio" name="display" value="fav" v-model="displayMode">
        </label>
    </fieldset>
</template>

<style scoped>

</style>