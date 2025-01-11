<template>
    <div class="w-full">
        <h3 class="text-3xl font-bold flex justify-start mb-4 dark:text-white">{{ t('reports.title') }}</h3>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
