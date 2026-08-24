<template>
    <header class="flex flex-wrap items-center justify-between gap-3 border-b border-gray-300 dark:border-gray-700 pb-4">
        <div class="flex items-center gap-3 min-w-0">
            <FontAwesomeIcon :icon="faFilePdf" class="text-red-500 text-xl shrink-0" />
            <h1 class="text-2xl font-bold dark:text-white truncate">{{ t('fileView.fileDetails') }}</h1>
        </div>
        <DownloadFile v-if="fileName" :fileName="fileName" />
    </header>

    <div class="bg-white dark:bg-gray-800 rounded-lg p-4 mt-4 flex flex-col h-full">
        <p v-if="fileName" class="text-sm text-gray-500 dark:text-gray-400 mb-4 truncate">
            {{ t('fileView.fileName') }}:
            <span class="font-medium text-gray-700 dark:text-gray-200">{{ fileName }}</span>
        </p>
        <File v-if="fileName" :file="id" :fileName="fileName" />
        <div v-else class="flex flex-col items-center justify-center h-full w-full text-gray-500 dark:text-gray-400">
            <FontAwesomeIcon :icon="faSpinner" class="animate-spin text-2xl mb-2" />
            <span>{{ t('fileView.loadingFile') }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
import File from '../components/Data/Import/File.vue';
import DownloadFile from '../components/Data/Export/DownloadFile.vue';
import { useI18n } from 'vue-i18n';
import { faSpinner, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useGetFilesFromBucket } from '../composables/useGetFiles';

const { t } = useI18n();

const route = useRoute();
const id = ref(route.params.id as string);
const fileName = ref('');

const { files, getFiles } = useGetFilesFromBucket();

onMounted(async () => {
    await getFiles();
});

watch(files, (newFiles) => {
    const file = newFiles.find(f => f.id === id.value);
    if (file) {
        fileName.value = file.name;
    }
});
</script>
