<template>
    <div class="w-full">
        <h1 class="text-3xl font-bold text-center">{{ t('dashboard.title') }}</h1>
        <div v-for="file in files" :key="file.id" v-if="files.length > 0">
            <div>
                <File :file="file" @click="handleOpen" />
            </div>

            <div v-if="isLoadingOnOpen" class="flex justify-center items-center mt-4">
                <FontAwesomeIcon :icon="faSpinner" class="animate-spin" />
            </div>

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

const isLoadingOnOpen = ref(false);

const handleOpen = async () => {
    isLoadingOnOpen.value = true;

    try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
        console.error(error);
    }

    isLoadingOnOpen.value = false;
};

onMounted(() => {
    getFiles();
});
</script>
