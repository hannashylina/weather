<script setup>
import Chart from 'chart.js/auto'
import {computed, onMounted, watch} from 'vue'

const props = defineProps({
    labels: Array,
    temperatures: Array,
    id: String
})

const chartId = computed(() => {
    return `temperature-chart-${props.id}`
})

onMounted(() => {
    const ctx = document.getElementById(chartId.value)
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: props.labels,
            datasets: [{
                label: 'Temperatures',
                data: props.temperatures,
                borderWidth: 1,
                pointStyle: false,
                lineTension: 0.2,
                fill: true,
                backgroundColor: '#cdddfa',
                borderColor: '#74aaff'
            }]
        },
        options: {
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
})
</script>

<template>
    <div>
        <canvas :id="chartId"
                class="temperature-chart"
                width="400"
                height="400"></canvas>
    </div>
</template>

<style scoped>

</style>