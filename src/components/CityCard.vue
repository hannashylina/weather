<script setup>
import { computed } from 'vue'
const props = defineProps({
    city: Object
})

const currentTemp = computed(() => {
    return props.city.main.temp ? Math.round(props.city.main.temp - 273.15) : null
})

const currentIcon = computed(() => {
    return props.city.weather.length > 0 ? `https://openweathermap.org/img/wn/${props.city.weather[0].icon}@2x.png` : ''
})

const currentHumidity = computed(( ) => {
    return props.city.main.humidity ?? null
})

const currentWindSpeed = computed(() => {
    return props.city.wind.speed ?? null
})

const currentWeatherDescription = computed(() => {
    return props.city.weather.length > 0 ?  props.city.weather[0].description : null
})
</script>

<template>
    <div class="city-card">
        <h2>{{ city.name }}</h2>
        <p>{{ currentWeatherDescription }}</p>
        <img :src="currentIcon" />
        <p>{{ currentTemp }} &deg; C</p>
        <p>Humidity: {{ currentHumidity }}%</p>
        <p>Wind: {{currentWindSpeed}}m/s</p>
    </div>
</template>

<style scoped>

</style>