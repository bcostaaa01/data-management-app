<template>
    <div class="flex justify-center min-h-full w-full">
        <h1 class="text-3xl font-bold dark:text-white">{{ t('dashboard.title') }}</h1>
        <div class="flex-1 justify-start mt-20 w-full ml-[-140px] mr-6">

            <FileAccordion :files="files" />

            <div v-if="files.length === 0">{{ t('dashboard.emptyFolderPlaceholder') }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useGetFilesFromBucket } from '../composables/useGetFiles';
import { useI18n } from 'vue-i18n';
import FileAccordion from '../components/Dashboard/FileAccordion.vue';

const { t } = useI18n();
const { files, getFiles } = useGetFilesFromBucket();

onMounted(() => {
    getFiles();
});
</script>
