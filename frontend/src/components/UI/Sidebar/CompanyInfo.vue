<template>
    <button @click="goToHome"
        class="flex items-center gap-2 min-w-0 h-10 px-2 -ml-2 rounded-lg hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white transition-colors duration-200">
        <img src="./../../../assets/app-logo.png" alt="" class="w-8 h-8 rounded-md shrink-0" />
        <span class="text-sm font-semibold text-gray-700 dark:text-gray-100 truncate">
            {{ appName }}
        </span>
    </button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const appName = "Data Management App";

const router = useRouter();

const goToHome = () => {
    router.push('/');
};
</script>
