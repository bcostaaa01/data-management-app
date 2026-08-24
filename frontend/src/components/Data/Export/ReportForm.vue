<template>
    <fwb-card class="dark:bg-gray-800">
        <div class="p-2 sm:p-4">
            <fwb-timeline>
                <fwb-timeline-item>
                    <fwb-timeline-point>
                        <FontAwesomeIcon v-if="file" :icon="faCheck" class="text-white text-xs" />
                    </fwb-timeline-point>
                    <fwb-timeline-content>
                        <fwb-timeline-title>{{ t('reports.selectFile') }}</fwb-timeline-title>
                        <fwb-timeline-body>
                            <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">{{
                                t('reports.selectFilePrompt') }}</p>

                            <fwb-file-input v-if="!file || isEditingFile" v-model="file"
                                accept=".csv,.xlsx,.xls" class="max-w-xs" />
                            <div v-else class="flex flex-wrap items-center gap-3">
                                <fwb-badge type="green">
                                    <FontAwesomeIcon :icon="faCheck" class="mr-1" />
                                    {{ file.name }} — {{ t('reports.fileSelected') }}
                                </fwb-badge>
                                <button v-if="!isRunning" type="button"
                                    class="text-xs text-gray-500 dark:text-gray-400 underline hover:no-underline"
                                    @click="isEditingFile = true">
                                    {{ t('reports.selectFile') }}
                                </button>
                            </div>

                            <p v-if="!file" class="mt-2 text-xs text-gray-400 dark:text-gray-500">
                                {{ t('reports.noFileSelected') }}
                            </p>
                        </fwb-timeline-body>
                    </fwb-timeline-content>
                </fwb-timeline-item>

                <fwb-timeline-item>
                    <fwb-timeline-point>
                        <FontAwesomeIcon v-if="activeStep === 2" :icon="faSpinner"
                            class="text-white text-xs animate-spin" />
                        <FontAwesomeIcon v-else-if="isDataProcessed" :icon="faCheck" class="text-white text-xs" />
                    </fwb-timeline-point>
                    <fwb-timeline-content>
                        <fwb-timeline-title>{{ t('reports.processData') }}</fwb-timeline-title>
                        <fwb-timeline-body>
                            <span v-if="activeStep === 2" class="text-sm text-gray-500 dark:text-gray-400">
                                {{ loadingMessage }}
                            </span>
                            <fwb-badge v-else-if="isDataProcessed" type="green">
                                <FontAwesomeIcon :icon="faCheck" class="mr-1" />{{ t('reports.dataProcessed') }}
                            </fwb-badge>
                        </fwb-timeline-body>
                    </fwb-timeline-content>
                </fwb-timeline-item>

                <fwb-timeline-item>
                    <fwb-timeline-point>
                        <FontAwesomeIcon v-if="activeStep === 3" :icon="faSpinner"
                            class="text-white text-xs animate-spin" />
                        <FontAwesomeIcon v-else-if="isPdfGenerated" :icon="faCheck" class="text-white text-xs" />
                    </fwb-timeline-point>
                    <fwb-timeline-content>
                        <fwb-timeline-title>{{ t('reports.generatePdf') }}</fwb-timeline-title>
                        <fwb-timeline-body>
                            <span v-if="activeStep === 3" class="text-sm text-gray-500 dark:text-gray-400">
                                {{ loadingMessage }}
                            </span>
                            <fwb-badge v-else-if="isPdfGenerated" type="green">
                                <FontAwesomeIcon :icon="faCheck" class="mr-1" />{{ t('reports.pdfReady') }}
                            </fwb-badge>
                        </fwb-timeline-body>
                    </fwb-timeline-content>
                </fwb-timeline-item>

                <fwb-timeline-item>
                    <fwb-timeline-point>
                        <FontAwesomeIcon v-if="activeStep === 4" :icon="faSpinner"
                            class="text-white text-xs animate-spin" />
                        <FontAwesomeIcon v-else-if="isSupabaseUploaded" :icon="faCheck" class="text-white text-xs" />
                    </fwb-timeline-point>
                    <fwb-timeline-content>
                        <fwb-timeline-title>{{ t('reports.uploadToSupabase') }}</fwb-timeline-title>
                        <fwb-timeline-body>
                            <span v-if="activeStep === 4" class="text-sm text-gray-500 dark:text-gray-400">
                                {{ loadingMessage }}
                            </span>
                            <fwb-badge v-else-if="isSupabaseUploaded" type="green">
                                <FontAwesomeIcon :icon="faCheck" class="mr-1" />{{
                                    t('reports.uploadedToSupabase') }}
                            </fwb-badge>
                        </fwb-timeline-body>
                    </fwb-timeline-content>
                </fwb-timeline-item>
            </fwb-timeline>

            <div v-if="!isSupabaseUploaded" class="mt-2">
                <fwb-button :disabled="!file || isRunning" @click="runPipeline">
                    <FontAwesomeIcon v-if="isRunning" :icon="faSpinner" class="animate-spin mr-2" />
                    {{ errorMessage ? t('reports.retryGenerate') : t('reports.generateReport') }}
                </fwb-button>
            </div>

            <fwb-alert v-if="errorMessage" type="danger" class="mt-4" closable @close="errorMessage = ''">
                {{ errorMessage }}
            </fwb-alert>

            <fwb-alert v-if="isSupabaseUploaded" type="success" class="mt-6" icon>
                <p>
                    <span class="font-medium">{{ pdfName }}</span> — {{ t('reports.reportReady') }}.
                    <router-link to="/dashboard" class="font-semibold underline hover:no-underline">
                        {{ t('reports.viewInDashboard') }}
                    </router-link>
                </p>
                <button type="button" class="mt-2 text-sm font-semibold underline hover:no-underline"
                    @click="resetForm">
                    {{ t('reports.generateAnother') }}
                </button>
            </fwb-alert>
        </div>
    </fwb-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { faSpinner, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useSupabaseUpload } from '../../../composables/useSupabaseUpload';
import {
    FwbButton,
    FwbCard,
    FwbFileInput,
    FwbBadge,
    FwbAlert,
    FwbTimeline,
    FwbTimelineItem,
    FwbTimelinePoint,
    FwbTimelineContent,
    FwbTimelineTitle,
    FwbTimelineBody,
} from 'flowbite-vue';
import { useProcessData } from '../../../composables/useProcessData';
import { useGeneratePdf } from '../../../composables/useGeneratePdf';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const pdfName = ref("");
const loadingMessage = ref("");
const errorMessage = ref("");
const activeStep = ref(0);
const isRunning = ref(false);
const isEditingFile = ref(false);
const file = ref<File | null>(null);

const isDataProcessed = ref(false);
const isPdfGenerated = ref(false);
const isSupabaseUploaded = ref(false);

const processedData = ref<{ data: any; columns: { field: string; header: string; }[]; } | null>(null);

const { uploadFileToFolder } = useSupabaseUpload();
const { processData } = useProcessData();
const { convertToPdf } = useGeneratePdf();

watch(file, () => {
    isEditingFile.value = false;
});

const readFileContents = (targetFile: File): Promise<string | ArrayBuffer> => {
    const extension = targetFile.name.split('.').pop()?.toLowerCase();
    const isExcel = extension === 'xlsx' || extension === 'xls';

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target?.result == null) {
                reject(new Error('Failed to read file'));
                return;
            }
            resolve(e.target.result);
        };
        reader.onerror = () => reject(reader.error ?? new Error('Failed to read file'));

        if (isExcel) {
            reader.readAsArrayBuffer(targetFile);
        } else {
            reader.readAsText(targetFile);
        }
    });
};

const runPipeline = async () => {
    if (!file.value || isRunning.value) return;
    const currentFile = file.value;

    isRunning.value = true;
    isEditingFile.value = false;
    errorMessage.value = "";

    try {
        activeStep.value = 2;
        loadingMessage.value = t("reports.processingData");
        const fileContent = await readFileContents(currentFile);
        processedData.value = await processData(fileContent, currentFile.name);
        isDataProcessed.value = true;

        activeStep.value = 3;
        loadingMessage.value = t("reports.generatingPdf");
        const pdfBlob = await convertToPdf(processedData.value);
        if (!pdfBlob) throw new Error('PDF generation failed');
        pdfName.value = currentFile.name;
        isPdfGenerated.value = true;

        activeStep.value = 4;
        loadingMessage.value = t("reports.uploadingToSupabase");
        await uploadFileToFolder(pdfBlob as File, pdfName.value, 'reports');
        isSupabaseUploaded.value = true;
    } catch (error) {
        console.error('Error generating report:', error);
        errorMessage.value = t("reports.stepError");
    } finally {
        activeStep.value = 0;
        isRunning.value = false;
    }
};

const resetForm = () => {
    file.value = null;
    isEditingFile.value = false;
    isDataProcessed.value = false;
    isPdfGenerated.value = false;
    isSupabaseUploaded.value = false;
    processedData.value = null;
    pdfName.value = "";
    errorMessage.value = "";
    activeStep.value = 0;
};
</script>
