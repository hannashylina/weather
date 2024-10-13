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
    <fieldset class="display-toggle">
        <label :class="['display-toggle-label', {'active': displayMode === 'all' }]">
            All
            <input type="radio"
                   name="display"
                   checked
                   value="all"
                   class="display-toggle-input"
                   v-model="displayMode">
        </label>
        <label :class="['display-toggle-label', {'active': displayMode === 'fav' }]">
            Favorites
            &starf;
            <input type="radio"
                   name="display"
                   value="fav"
                   class="display-toggle-input"
                   v-model="displayMode">
        </label>
    </fieldset>
</template>

<style scoped>

</style>