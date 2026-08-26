<template>
    <button @click="toggleTheme" type="button" :aria-label="theme ? t('themeToggle.switchToLight') : t('themeToggle.switchToDark')"
        class="flex items-center justify-center w-9 h-9 rounded-lg text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
        <FontAwesomeIcon :icon="theme ? faSun : faMoon" class="w-4 h-4" />
    </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const { t } = useI18n();

const theme = ref(document.documentElement.classList.contains('dark'));

const toggleTheme = () => {
    theme.value = !theme.value;
    document.documentElement.classList.toggle('dark', theme.value);
    localStorage.setItem('theme', theme.value ? 'dark' : 'light');
};
</script>
