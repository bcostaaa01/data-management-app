<template>
    <div
        class="bg-white dark:bg-gray-900 rounded-lg border-gray-300 p-4 flex items-center justify-between transition-transform duration-300 hover:scale-105 cursor-pointer">
        <div class="flex items-center">
            <span class="mr-2">
                <FontAwesomeIcon :icon="icon" class="mr-2 bg-yellow-100 dark:bg-gray-700 rounded-full p-2" />
            </span>
            <fwb-card-title class="text-gray-800 dark:text-gray-300">
                {{ title }}
            </fwb-card-title>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

defineProps<{
    title: string;
    icon: IconProp;
}>();
</script>