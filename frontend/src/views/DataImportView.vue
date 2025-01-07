<template>
    <div class="flex justify-center min-h-full w-full">
        <h1 class="text-3xl font-bold flex justify-start mb-6">{{ t('dataImport.title') }}</h1>
        <div class="flex flex-col items-center justify-center min-h-full py-12 sm:px-6 lg:px-8 w-full">

            <form @submit.prevent="importData" class="w-full max-w-md px-4">
                <div class="mb-6">
                    <label for="file" class="block mb-2 text-sm font-medium dark:text-white">{{
                        t('dataImport.selectFile')
                        }}</label>
                    <input type="file" id="file" @change="handleFileUpload"
                        class="w-full px-4 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />
                </div>

                <div v-if="!isLoading" class="flex justify-center items-center mt-6">
                    <button type="submit"
                        class="w-full px-4 py-3 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline">{{
                            t('dataImport.importButton') }}</button>
                </div>
                <div v-else class="flex justify-center items-center mt-6">
                    <FontAwesomeIcon :icon="faSpinner" class="animate-spin" />
                </div>

                <div v-if="uploadWasSuccessful && !isUploading" class="flex flex-col items-center mt-6 gap-2">
                    <FontAwesomeIcon :icon="faCheck" class="text-green-500" />
                    <p class="text-green-500">{{ t('dataImport.successMessage') }}</p>
                    <div class="flex flex-col items-center mt-4">
                        <p class="text-blue-500 text-center">
                            {{ t('dataImport.goToFile') }}
                            <span class="underline hover:text-blue-700 cursor-pointer" @click="goToDashboard">{{
                                t('dashboard.title') }}</span>
                        </p>
                    </div>
                </div>
                <div v-else-if="uploadWasSuccessful === false && !isUploading && !beforeUpload"
                    class="flex justify-center items-center mt-6">
                    <p class="text-red-500">{{ t('dataImport.errorMessage') }}</p>
                </div>
                <div v-else-if="isUploading" class="flex justify-center items-center mt-6">
                    <p>{{ t('dataImport.uploadingMessage') }}</p>
                </div>
                <div v-else-if="beforeUpload" class="flex justify-center items-center mt-6 dark:text-white">
                    <FontAwesomeIcon :icon="faFile" class="mr-2" />
                    <p>{{ t('dataImport.beforeUploadMessage') }}</p>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useFileUpload } from '../composables/useFileUpload';
import { useSupabaseUpload } from '../composables/useSupabaseUpload';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSpinner, faFile, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'vue-router';

const router = useRouter();

const { t } = useI18n();
const { file, handleFileUpload } = useFileUpload();
const { uploadFileToFolder } = useSupabaseUpload();

const isLoading = ref(false);

const beforeUpload = ref(false);

const isUploading = ref(false);

const uploadWasSuccessful = ref(false);

const importData = async () => {
    if (file.value) {
        isLoading.value = true;
        isUploading.value = true;
        console.log('Importing data from file:', file.value.name);

        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            await uploadFileToFolder(file.value, 'private');
            uploadWasSuccessful.value = true;
        } catch (error) {
            console.error('Error uploading file:', error);
            uploadWasSuccessful.value = false;
        } finally {
            isLoading.value = false;
            isUploading.value = false;
        }
    } else {
        uploadWasSuccessful.value = false;
    }
};

const goToDashboard = () => {
    router.push('/dashboard');
};

onMounted(() => {
    beforeUpload.value = true;
});
</script>
