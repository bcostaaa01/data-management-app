<template>
    <div class="rounded-lg p-3 m-4"
        :class="{ 'bg-gray-500 dark:bg-gray-500 justify-start': !isUser, 'bg-gray-300 dark:bg-gray-200 justify-end': isUser }">
        <span class="text-sm"
            :class="{ 'text-white dark:text-gray-300': !isUser, 'text-gray-900 dark:text-gray-800': isUser }">
            {{ message }}
        </span>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    message: string;
    isUser: boolean;
}>();
</script>