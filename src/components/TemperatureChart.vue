<script setup>
import { onMounted, computed } from 'vue'
import Chart from 'chart.js/auto';
const props = defineProps({
    data: Object
})

const today = new Date();
const todayDay = today.getDate();
const todayData = props.data.filter((item) => {
    const date = new Date(item.dt * 1000); // convert seconds to milliseconds
    return date.getDate() === todayDay;
})

const labels = todayData.map(item => item.dt_txt);

const temperatures = todayData.map(item => Math.round(item.main.temp - 273.15)) // convert Kelvin to Celsius



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