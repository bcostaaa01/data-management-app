<template>
    <button @click="toggleSidebar" class="hover:bg-gray-600 rounded-md p-1 transition-colors duration-200">
        <FontAwesomeIcon :icon="faAngleDoubleLeft" class="w-5 h-4" />
    </button>
</template>

<script setup lang="ts">
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { defineEmits } from 'vue';

const emit = defineEmits(['open']);

const toggleSidebar = () => {
    emit('open', false);
};
</script>
