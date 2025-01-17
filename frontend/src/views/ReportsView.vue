<template>
    <header class="flex justify-between items-center border-b border-gray-300 pb-4">
        <h1 class="text-2xl font-bold dark:text-white">{{ t('reports.title') }}</h1>
    </header>

    <span class="flex my-3 font-bold text-gray-500 dark:text-gray-100">{{ t("reports.reportsInfo") }}</span>

    <div class="flex-1 justify-start mt-10 w-full mr-6">
        <ReportForm />
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import ReportForm from '../components/Data/Export/ReportForm.vue';

const { t } = useI18n();
</script>
