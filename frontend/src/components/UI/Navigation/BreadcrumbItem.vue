<template>
    <router-link v-if="to" :to="to"
        class="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 truncate">
        {{ label }}
    </router-link>
    <span v-else class="text-sm text-gray-500 dark:text-gray-400 truncate">{{ label }}</span>
</template>

<script setup lang="ts">
interface Props {
    label: string;
    to?: string;
}

defineProps<Props>();
</script>
