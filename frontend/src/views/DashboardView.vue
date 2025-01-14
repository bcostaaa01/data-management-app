<template>
    <header class="flex justify-between items-center border-b border-gray-300 pb-4">
        <h1 class="text-2xl font-bold dark:text-white">{{ t('dashboard.title') }}</h1>
    </header>
    <div class="flex-1 justify-start mt-10 w-full mr-6">
        <FileAccordion :files="files" :fileIds="fileIds" />
    </div>
    <div v-if="files.length === 0" class="flex justify-center items-center">
        <div class="text-lg dark:text-white">{{ t('dashboard.emptyFolderPlaceholder') }}</div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useGetFilesFromBucket } from '../composables/useGetFiles';
import { useI18n } from 'vue-i18n';
import FileAccordion from '../components/Dashboard/FileAccordion.vue';

const { t } = useI18n();
const { files, getFiles, fileIds } = useGetFilesFromBucket();

onMounted(() => {
    getFiles();
});
</script>
