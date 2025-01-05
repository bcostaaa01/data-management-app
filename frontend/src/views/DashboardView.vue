<template>
    <h1 class="text-3xl font-bold">{{ t('dashboard.title') }}</h1>
    <div class="flex justify-center items-center w-full min-h-full ">

        <div v-for="file in files" :key="file.id" v-if="files.length > 0">
            <File :file="file" :isLoading="file.isLoading" @click="handleOpen(file)" />
        </div>

        <div v-if="files.length === 0">{{ t('dashboard.emptyFolderPlaceholder') }}</div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useGetFilesFromBucket } from '../composables/useGetFiles';
import { useI18n } from 'vue-i18n';
import File from '../components/Dashboard/File.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const { t } = useI18n();
const { files, getFiles } = useGetFilesFromBucket();

const handleOpen = async (file) => {
    file.isLoading = true;

    try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
        console.error(error);
    }

    file.isLoading = false;
};

onMounted(() => {
    getFiles();
});
</script>
