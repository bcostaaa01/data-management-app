<template>
    <label class="inline-flex items-center cursor-pointer bg-gray-200 dark:bg-gray-800 rounded-md p-2">
        <span class="text-gray-700 dark:text-gray-100 mr-3 ml-2">Theme</span>
        <input type="checkbox" value="" class="sr-only peer">
        <div @click="toggleTheme"
            class="relative w-8 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full transition-colors duration-300"
            :class="{ 'bg-blue-600': theme, 'bg-gray-200': !theme }">
            <FontAwesomeIcon :icon="theme ? faSun : faMoon"
                class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-yellow-500 dark:text-yellow-500" />
        </div>
    </label>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const theme = ref(document.documentElement.classList.contains('dark'));

const toggleTheme = () => {
    theme.value = !theme.value;
    document.documentElement.classList.toggle('dark', theme.value);
    localStorage.setItem('theme', theme.value ? 'dark' : 'light');
};
</script>