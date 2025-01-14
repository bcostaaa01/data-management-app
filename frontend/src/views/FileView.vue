<template>
    <div class="p-4">
        <h1 class="text-2xl font-bold dark:text-white mb-4">{{ t('fileView.fileDetails') }}</h1>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-4 flex flex-col h-full">
            <span class="text-lg dark:text-white mb-4">{{ t('fileView.fileName') }}: {{ fileName }}</span>
            <File v-if="fileName" :file="id" :fileName="fileName" />
            <div v-else class="flex flex-col items-center justify-center h-full w-full">
                <FontAwesomeIcon :icon="faSpinner" class="animate-spin" spin />
                <span class="ml-2">{{ t('fileView.loadingFile') }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
import File from '../components/Data/Import/File.vue';
import { useI18n } from 'vue-i18n';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
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
