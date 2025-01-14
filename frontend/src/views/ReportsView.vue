<template>
    <header class="flex justify-between items-center border-b border-gray-300 pb-4">
        <h1 class="text-2xl font-bold dark:text-white">{{ t('reports.title') }}</h1>
    </header>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
