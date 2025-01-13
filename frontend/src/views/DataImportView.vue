<template>
    <div class="flex flex-col min-h-full w-full">
        <header class="flex justify-between items-center border-b border-gray-300 pb-4">
            <h1 class="text-2xl font-bold dark:text-white">{{ t('dataImport.title') }}</h1>
        </header>

        <div class="flex flex-col w-full py-5">
            <div class="w-full">
                <TableSelector v-model="selectedTable" @update:value="updateSelectedTable" class="mb-4" />
                <div v-if="selectedTable" class="flex flex-col items-center">
                    <form @submit.prevent="importDataToSupabase(selectedTable)" class="w-full max-w-md px-4">
                        <div class="mb-6">
                            <label for="file" class="block mb-2 text-sm font-medium dark:text-white">{{
                                t('dataImport.selectFile')
                                }}</label>
                            <input type="file" id="file" @change="handleFileUpload"
                                class="w-full px-7 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />
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

                <div v-if="items.length !== 0 && columns.length !== 0 && selectedTable"
                    class="flex flex-col justify-center items-center mt-6">
                    <DataTable :items="items" :columns="columns" :importedTable="selectedTable" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useFileUpload } from '../composables/useFileUpload';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSpinner, faFile, faCheck } from '@fortawesome/free-solid-svg-icons';
import DataTable from '../components/DataTable/DataTable.vue';
import { useTablesStore } from '../stores/tables.store';
import { useProcessData } from '../composables/useProcessData';
import TableSelector from '../components/Data/Integrations/TableSelector.vue';

const { t } = useI18n();
const { file, handleFileUpload } = useFileUpload();
const { insertRows } = useTablesStore();
const { processData } = useProcessData();

const isLoading = ref(false);

const beforeUpload = ref(false);

const isUploading = ref(false);

const uploadWasSuccessful = ref(false);

const selectedTable = ref('');

const items = ref([]);
const columns = ref([]);

const updateSelectedTable = (newTable: string) => {
    selectedTable.value = newTable;
};

const importDataToSupabase = async (table: string) => {
    isLoading.value = true;
    const reader = new FileReader();
    reader.readAsText(file.value as Blob);
    reader.onload = async () => {
        const data = reader.result;
        const processedData = await processData(data);
        await insertRows(table, processedData.data);
        items.value = processedData.data;
        columns.value = processedData.columns as never[];
        uploadWasSuccessful.value = true;
        isLoading.value = false;
    };
};

onMounted(() => {
    beforeUpload.value = true;
});
</script>
