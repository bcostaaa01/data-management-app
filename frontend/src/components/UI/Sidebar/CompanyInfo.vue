<template>
    <div class="flex items-center mt-0 mb-3 rounded-md border-gray-600 bg-gray-200 dark:bg-gray-800 p-1">
        <button @click="goToHome">
            <img src="./../../../assets/app-logo.png" alt="Company Logo" class="w-10 h-10" />
        </button>
        <div class="flex flex-col ml-4">
            <span class="text-gray-500 dark:text-gray-100 text-md font-bold">Sales</span>
            <span class="text-gray-500 dark:text-gray-100 text-sm">Berichte GmbH</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goToHome = () => {
    router.push('/');
};
</script>
