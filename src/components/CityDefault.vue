<script setup>
const props = defineProps({
    city: Object
})
</script>

<template>
    <div>
        {{city.name}}
    </div>
</template>

<style scoped>

</style>