<template>
    <div class="border-2 border-gray-300 rounded-md p-6">
        <div class="flex flex-col space-y-6">
            <div class="flex items-center">
                <input type="file" @change="handleFileUpload" accept=".csv,.xlsx,.xls" :disabled="isFileUploaded"
                    class="w-64" />
                <fwb-button class="ml-4 min-w-[150px]" :disabled="!file || isFileUploaded" @click="handleInitialUpload">
                    {{ t("reports.uploadFile") }}
                </fwb-button>
                <span v-if="isFileUploaded" class="ml-4 text-green-500">{{ t("reports.fileUploaded") }}</span>
            </div>

            <div class="flex items-center">
                <fwb-button class="min-w-[150px]" :disabled="!isFileUploaded || isDataProcessed"
                    @click="handleProcessData">
                    {{ t("reports.processData") }}
                </fwb-button>
                <span v-if="isDataProcessed" class="ml-4 text-green-500">{{ t("reports.dataProcessed") }}</span>
            </div>

            <div class="flex items-center">
                <fwb-button class="min-w-[150px]" :disabled="!isDataProcessed || isPdfGenerated"
                    @click="handleGeneratePdf">
                    {{ t("reports.generatePdf") }}
                </fwb-button>
                <span v-if="isPdfGenerated" class="ml-4 text-green-500">{{ t("reports.pdfGenerated") }}</span>
            </div>

            <div class="flex items-center">
                <fwb-button class="min-w-[150px]" :disabled="!isPdfGenerated || isSupabaseUploaded"
                    @click="handleSupabaseUpload">
                    {{ t("reports.uploadToSupabase") }}
                </fwb-button>
                <span v-if="isSupabaseUploaded" class="ml-4 text-green-500">{{ t("reports.uploadedToSupabase") }}</span>
            </div>
        </div>

        <div v-if="isLoading" class="flex items-center mt-6">
            <FontAwesomeIcon :icon="faSpinner" spin />
            <span class="ml-2">{{ loadingMessage }}</span>
        </div>

        <div v-if="isSupabaseUploaded" class="mt-6 bg-gray-700 rounded-md p-2">
            <span class="text-white">{{ pdfName }} {{ t("reports.pdfGenerated") }}
                <router-link to="/dashboard" class="text-blue-500">/dashboards</router-link>
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useSupabaseUpload } from '../../../composables/useSupabaseUpload';
import { FwbButton } from 'flowbite-vue';
import { useProcessData } from '../../../composables/useProcessData';
import { useGeneratePdf } from '../../../composables/useGeneratePdf';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const pdfName = ref("");
const isLoading = ref(false);
const loadingMessage = ref("");
const file = ref<File | null>(null);

const isFileUploaded = ref(false);
const isDataProcessed = ref(false);
const isPdfGenerated = ref(false);
const isSupabaseUploaded = ref(false);

const processedData = ref<{ data: any; columns: { field: string; header: string; }[]; } | null>(null);

const { uploadFileToFolder } = useSupabaseUpload();
const { processData } = useProcessData();
const { convertToPdf } = useGeneratePdf();

const handleFileUpload = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
        file.value = input.files[0];
    }
};

const handleInitialUpload = () => {
    if (!file.value) return;
    isFileUploaded.value = true;
};

const handleProcessData = async () => {
    if (!file.value) return;

    isLoading.value = true;
    loadingMessage.value = t("reports.processingData");

    const currentFile = file.value;
    const extension = currentFile.name.split('.').pop()?.toLowerCase();
    const isExcel = extension === 'xlsx' || extension === 'xls';

    try {
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const fileContent = e.target?.result as string | ArrayBuffer;
                processedData.value = await processData(fileContent, currentFile.name);
                isDataProcessed.value = true;
            } catch (error) {
                console.error('Error processing file:', error);
            } finally {
                isLoading.value = false;
            }
        };
        reader.onerror = () => {
            console.error('Error reading file:', reader.error);
            isLoading.value = false;
        };

        if (isExcel) {
            reader.readAsArrayBuffer(currentFile);
        } else {
            reader.readAsText(currentFile);
        }
    } catch (error) {
        console.error('Error reading file:', error);
        isLoading.value = false;
    }
};

const handleGeneratePdf = async () => {
    if (!processedData.value) return;

    isLoading.value = true;
    loadingMessage.value = t("reports.generatingPdf");

    try {
        const pdfBlob = await convertToPdf(processedData.value);
        pdfName.value = file.value?.name || 'uploaded_file.pdf';
        isPdfGenerated.value = !!pdfBlob;
        return pdfBlob;
    } catch (error) {
        console.error('Error generating PDF:', error);
    } finally {
        isLoading.value = false;
    }
};

const handleSupabaseUpload = async () => {
    const pdfBlob = await handleGeneratePdf();

    if (!pdfBlob) {
        console.error('No PDF blob to upload');
        return;
    }

    isLoading.value = true;
    loadingMessage.value = t("reports.uploadingToSupabase");

    try {
        await uploadFileToFolder(pdfBlob as File, pdfName.value, 'reports');
        isSupabaseUploaded.value = true;
    } catch (error) {
        console.error('Error uploading to Supabase:', error);
    } finally {
        isLoading.value = false;
    }
};
</script>
