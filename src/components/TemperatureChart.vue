<script setup>
import { onMounted, computed } from 'vue'
import Chart from 'chart.js/auto';
const props = defineProps({
    data: Object
})

let forecastData = props.data.slice(0, 8); // t°C entries for the next day

const labels = forecastData.map(item => {
    const date = new Date(item.dt * 1000); // convert seconds to milliseconds for unix date format
    const minutes = date.getMinutes() === 0 ? '00' : date.getMinutes()
    return `${date.getHours()}:${minutes}`;
});

const temperatures = forecastData.map(item => Math.round(item.main.temp - 273.15)) // convert Kelvin to Celsius


onMounted(() => {
    const ctx = document.getElementById('temperatureChart');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperatures',
                data: temperatures,
                borderWidth: 1
            }]
        }
    });
})


</script>

<template>
    <div>
        <canvas id="temperatureChart"
                class="temperature-chart"
                width="400"
                height="400"></canvas>
    </div>

</template>

<style scoped>

</style>