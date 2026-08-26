<template>
    <header class="flex justify-between items-center border-b border-gray-300 dark:border-gray-700 pb-4">
        <h1 class="text-2xl font-bold dark:text-white">{{ t('dataImport.title') }}</h1>
    </header>

    <span class="flex my-3 font-bold text-gray-500 dark:text-gray-100">{{ t("dataImport.importDataInfo") }}</span>

    <div class="mt-4">
        <fwb-card class="dark:bg-gray-800 w-full !max-w-none">
            <div class="p-6 sm:p-8">
                <fwb-progress :progress="progressPercent" color="blue" size="sm" class="mb-8" />

                <div class="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-10">
                    <div class="flex-1 min-w-0">
                        <ol class="flex flex-col">
                            <li class="flex gap-4">
                                <div class="flex flex-col items-center">
                                    <div class="flex items-center justify-center w-9 h-9 rounded-full shrink-0 transition-colors duration-300"
                                        :class="badgeClass(stepState(1, !!selectedTable))">
                                        <FontAwesomeIcon :icon="stepIcon(1, !!selectedTable, faTable)"
                                            class="text-sm" />
                                    </div>
                                    <div class="w-px flex-1 my-1 transition-colors duration-300"
                                        :class="selectedTable ? 'bg-green-400 dark:bg-green-600' : 'bg-gray-200 dark:bg-gray-700'" />
                                </div>
                                <div class="flex-1 pb-8">
                                    <h3 class="font-semibold text-gray-900 dark:text-white leading-9">
                                        {{ t('dataImport.selectTable') }}
                                    </h3>
                                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-3 max-w-xl">
                                        {{ t('dataImport.selectTablePrompt') }}
                                    </p>
                                    <TableSelector v-model="selectedTable" @update:value="updateSelectedTable"
                                        class="max-w-sm" />
                                </div>
                            </li>

                            <li class="flex gap-4">
                                <div class="flex flex-col items-center">
                                    <div class="flex items-center justify-center w-9 h-9 rounded-full shrink-0 transition-colors duration-300"
                                        :class="badgeClass(stepState(2, !!file))">
                                        <FontAwesomeIcon :icon="stepIcon(2, !!file, faFileArrowUp)" class="text-sm" />
                                    </div>
                                    <div class="w-px flex-1 my-1 transition-colors duration-300"
                                        :class="file ? 'bg-green-400 dark:bg-green-600' : 'bg-gray-200 dark:bg-gray-700'" />
                                </div>
                                <div class="flex-1 pb-8 transition-opacity duration-300"
                                    :class="{ 'opacity-50 pointer-events-none': !selectedTable }">
                                    <h3 class="font-semibold text-gray-900 dark:text-white leading-9">
                                        {{ t('dataImport.selectFile') }}
                                    </h3>
                                    <p class="text-sm text-gray-500 dark:text-gray-400 mb-3 max-w-xl">
                                        {{ t('dataImport.selectFilePrompt') }}
                                    </p>

                                    <fwb-file-input v-if="!file || isEditingFile" v-model="file" dropzone
                                        accept=".csv,.xlsx,.xls" class="max-w-sm" />
                                    <div v-else class="flex flex-wrap items-center gap-3">
                                        <fwb-badge type="green">
                                            <FontAwesomeIcon :icon="faCheck" class="mr-1" />
                                            {{ file.name }} — {{ t('dataImport.fileSelected') }}
                                        </fwb-badge>
                                        <button v-if="!isImporting" type="button"
                                            class="text-xs text-gray-500 dark:text-gray-400 underline hover:no-underline"
                                            @click="isEditingFile = true">
                                            {{ t('dataImport.selectFile') }}
                                        </button>
                                    </div>

                                    <p v-if="!file" class="mt-2 text-xs text-gray-400 dark:text-gray-500">
                                        {{ t('dataImport.noFileSelected') }}
                                    </p>
                                    <span class="block mt-2 text-xs text-gray-400 dark:text-gray-500">
                                        {{ t('dataImport.supportedFormats') }}
                                    </span>
                                </div>
                            </li>

                            <li class="flex gap-4">
                                <div class="flex items-center justify-center w-9 h-9 rounded-full shrink-0 transition-colors duration-300"
                                    :class="badgeClass(stepState(3, uploadWasSuccessful))">
                                    <FontAwesomeIcon :icon="stepIcon(3, uploadWasSuccessful, faCloudArrowUp)"
                                        class="text-sm" :class="{ 'animate-spin': activeStep === 3 }" />
                                </div>
                                <div class="flex-1">
                                    <h3 class="font-semibold text-gray-900 dark:text-white leading-9">
                                        {{ t('dataImport.importButton') }}
                                    </h3>
                                    <span v-if="activeStep === 3" class="text-sm text-gray-500 dark:text-gray-400">
                                        {{ loadingMessage }}
                                    </span>
                                </div>
                            </li>
                        </ol>

                        <div v-if="!uploadWasSuccessful" class="mt-4">
                            <fwb-button pill size="lg" :disabled="!selectedTable || !file" :loading="isImporting"
                                loading-position="prefix" @click="importDataToSupabase(selectedTable)">
                                {{ errorMessage ? t('dataImport.retryImport') : t('dataImport.importButton') }}
                            </fwb-button>
                        </div>
                    </div>

                    <div
                        class="w-full lg:w-[380px] shrink-0 lg:border-l lg:border-gray-200 dark:lg:border-gray-700 lg:pl-10 lg:sticky lg:top-6">
                        <p v-if="!errorMessage && !uploadWasSuccessful"
                            class="text-sm text-gray-400 dark:text-gray-500">
                            {{ t('dataImport.statusPlaceholder') }}
                        </p>

                        <fwb-alert v-if="errorMessage" type="danger" closable @close="clearError">
                            <div class="flex flex-col gap-2 w-full flex-1 min-w-0">
                                <p>{{ errorMessage }}</p>
                                <p v-if="errorDetail" class="text-xs font-mono break-words opacity-75">
                                    {{ errorDetail }}
                                </p>
                            </div>
                        </fwb-alert>

                        <fwb-alert v-if="uploadWasSuccessful" type="success" icon>
                            <div class="flex flex-col gap-2 w-full flex-1 min-w-0">
                                <p>{{ t('dataImport.rowsImported', { count: items.length, table: selectedTable })
                                }}</p>
                                <button type="button"
                                    class="self-start text-sm font-semibold underline hover:no-underline"
                                    @click="resetForm">
                                    {{ t('dataImport.importAnother') }}
                                </button>
                            </div>
                        </fwb-alert>
                    </div>
                </div>
            </div>
        </fwb-card>

        <div v-if="uploadWasSuccessful && items.length !== 0 && columns.length !== 0" class="mt-6">
            <DataTable :items="items" :columns="columns" :importedTable="selectedTable" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import {
    faSpinner,
    faCheck,
    faXmark,
    faTable,
    faFileArrowUp,
    faCloudArrowUp,
    type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { FwbButton, FwbCard, FwbFileInput, FwbBadge, FwbAlert, FwbProgress } from 'flowbite-vue';
import { useFileUpload } from '../composables/useFileUpload';
import { useProcessData } from '../composables/useProcessData';
import { useTablesStore } from '../stores/tables.store';
import { getErrorMessage } from '../utils/getErrorMessage';
import DataTable from '../components/DataTable/DataTable.vue';
import TableSelector from '../components/Data/Integrations/TableSelector.vue';

type StepState = 'pending' | 'active' | 'done' | 'error';

const { t } = useI18n();
const { file, readFile } = useFileUpload();
const { insertRows } = useTablesStore();
const { processData } = useProcessData();

const selectedTable = ref('');
const isEditingFile = ref(false);
const isImporting = ref(false);
const activeStep = ref(0);
const failedStep = ref<number | null>(null);
const loadingMessage = ref('');
const errorMessage = ref('');
const errorDetail = ref('');
const uploadWasSuccessful = ref(false);

const items = ref<Record<string, any>[]>([]);
const columns = ref<{ field: string; header: string }[]>([]);

const progressPercent = computed(() => {
    const completed = [!!selectedTable.value, !!file.value, uploadWasSuccessful.value].filter(Boolean).length;
    return (completed / 3) * 100;
});

const stepState = (step: number, done: boolean): StepState => {
    if (failedStep.value === step) return 'error';
    if (activeStep.value === step) return 'active';
    if (done) return 'done';
    return 'pending';
};

const stepIcon = (step: number, done: boolean, idleIcon: IconDefinition): IconDefinition => {
    const state = stepState(step, done);
    if (state === 'active') return faSpinner;
    if (state === 'done') return faCheck;
    if (state === 'error') return faXmark;
    return idleIcon;
};

const badgeClass = (state: StepState) => ({
    pending: 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500',
    active: 'bg-blue-500 text-white ring-4 ring-blue-100 dark:ring-blue-900/40',
    done: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
}[state]);

const updateSelectedTable = (newTable: string) => {
    selectedTable.value = newTable;
};

const clearError = () => {
    errorMessage.value = '';
    errorDetail.value = '';
    failedStep.value = null;
};

const resetForm = () => {
    file.value = null;
    selectedTable.value = '';
    isEditingFile.value = false;
    items.value = [];
    columns.value = [];
    uploadWasSuccessful.value = false;
    clearError();
};

const importDataToSupabase = async (table: string) => {
    if (!file.value || isImporting.value) return;

    isImporting.value = true;
    isEditingFile.value = false;
    clearError();

    try {
        activeStep.value = 3;
        loadingMessage.value = t('dataImport.processingFile');
        const data = await readFile();
        const processedData = await processData(data, file.value.name);

        loadingMessage.value = t('dataImport.uploadingMessage');
        await insertRows(table, processedData.data);

        items.value = processedData.data;
        columns.value = processedData.columns;
        uploadWasSuccessful.value = true;
    } catch (error) {
        console.error('Error importing file:', error);
        failedStep.value = 3;
        errorMessage.value = t('dataImport.errorMessage');
        errorDetail.value = getErrorMessage(error);
    } finally {
        activeStep.value = 0;
        isImporting.value = false;
    }
};
</script>
