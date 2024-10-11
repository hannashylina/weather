<script setup>
import { computed } from 'vue'
const props = defineProps({
    open: Boolean
})

const isModalOpen = computed(() => props.open)
const emit = defineEmits(['close-modal'])

function closeModal(){
    emit('close-modal')
}
</script>

<template>
    <div :class="['modal', { open: isModalOpen }]">
        <button @click="closeModal">x</button>
        <slot>Modal window</slot>
    </div>

</template>

<style scoped>

</style>