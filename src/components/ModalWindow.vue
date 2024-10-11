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
        <div class="modal-inner">
            <button class="modal-close"
                    type="button"
                    @click="closeModal">&times;</button>
            <slot>Modal window</slot>
        </div>

    </div>

</template>

<style scoped>

</style>