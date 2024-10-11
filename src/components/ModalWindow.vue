<script setup>
import { useModalStore } from './stores/modal'
const modalStore = useModalStore()
</script>

<template>
    <div :class="['modal', { open: modalStore.open }]">
        <slot>Modal window</slot>
    </div>

</template>

<style scoped>

</style>