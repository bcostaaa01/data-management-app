<template>
    <fwb-card class="dark:bg-gray-800 w-full !max-w-none">
        <div class="p-6 sm:p-8">
            <fwb-progress :progress="progressPercent" color="blue" size="sm" class="mb-8" />

            <div class="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-10">
                <div class="flex-1 min-w-0">
                    <ol class="flex flex-col">
                        <li class="flex gap-4">
                            <div class="flex flex-col items-center">
                                <div class="flex items-center justify-center w-9 h-9 rounded-full shrink-0 transition-colors duration-300"
                                    :class="badgeClass(stepState(1, !!file))">
                                    <FontAwesomeIcon :icon="stepIcon(1, !!file, faFileArrowUp)" class="text-sm" />
                                </div>
                                <div class="w-px flex-1 my-1 transition-colors duration-300"
                                    :class="file ? 'bg-green-400 dark:bg-green-600' : 'bg-gray-200 dark:bg-gray-700'" />
                            </div>
                            <div class="flex-1 pb-8">
                                <h3 class="font-semibold text-gray-900 dark:text-white leading-9">
                                    {{ t('reports.selectFile') }}
                                </h3>
                                <p class="text-sm text-gray-500 dark:text-gray-400 mb-3 max-w-xl">
                                    {{ t('reports.selectFilePrompt') }}
                                </p>

                                <fwb-file-input v-if="!file || isEditingFile" v-model="file" dropzone
                                    accept=".csv,.xlsx,.xls" class="max-w-sm" />
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
                            </div>
                        </li>

                        <li class="flex gap-4">
                            <div class="flex flex-col items-center">
                                <div class="flex items-center justify-center w-9 h-9 rounded-full shrink-0 transition-colors duration-300"
                                    :class="badgeClass(stepState(2, isDataProcessed))">
                                    <FontAwesomeIcon :icon="stepIcon(2, isDataProcessed, faTableList)"
                                        class="text-sm" :class="{ 'animate-spin': activeStep === 2 }" />
                                </div>
                                <div class="w-px flex-1 my-1 transition-colors duration-300"
                                    :class="isDataProcessed ? 'bg-green-400 dark:bg-green-600' : 'bg-gray-200 dark:bg-gray-700'" />
                            </div>
                            <div class="flex-1 pb-8">
                                <h3 class="font-semibold text-gray-900 dark:text-white leading-9">
                                    {{ t('reports.processData') }}
                                </h3>
                                <span v-if="activeStep === 2" class="text-sm text-gray-500 dark:text-gray-400">
                                    {{ loadingMessage }}
                                </span>
                            </div>
                        </li>

                        <li class="flex gap-4">
                            <div class="flex flex-col items-center">
                                <div class="flex items-center justify-center w-9 h-9 rounded-full shrink-0 transition-colors duration-300"
                                    :class="badgeClass(stepState(3, isPdfGenerated))">
                                    <FontAwesomeIcon :icon="stepIcon(3, isPdfGenerated, faFilePdf)"
                                        class="text-sm" :class="{ 'animate-spin': activeStep === 3 }" />
                                </div>
                                <div class="w-px flex-1 my-1 transition-colors duration-300"
                                    :class="isPdfGenerated ? 'bg-green-400 dark:bg-green-600' : 'bg-gray-200 dark:bg-gray-700'" />
                            </div>
                            <div class="flex-1 pb-8">
                                <h3 class="font-semibold text-gray-900 dark:text-white leading-9">
                                    {{ t('reports.generatePdf') }}
                                </h3>
                                <span v-if="activeStep === 3" class="text-sm text-gray-500 dark:text-gray-400">
                                    {{ loadingMessage }}
                                </span>
                            </div>
                        </li>

                        <li class="flex gap-4">
                            <div class="flex items-center justify-center w-9 h-9 rounded-full shrink-0 transition-colors duration-300"
                                :class="badgeClass(stepState(4, isSupabaseUploaded))">
                                <FontAwesomeIcon :icon="stepIcon(4, isSupabaseUploaded, faCloudArrowUp)"
                                    class="text-sm" :class="{ 'animate-spin': activeStep === 4 }" />
                            </div>
                            <div class="flex-1">
                                <h3 class="font-semibold text-gray-900 dark:text-white leading-9">
                                    {{ t('reports.uploadToSupabase') }}
                                </h3>
                                <span v-if="activeStep === 4" class="text-sm text-gray-500 dark:text-gray-400">
                                    {{ loadingMessage }}
                                </span>
                            </div>
                        </li>
                    </ol>

                    <div v-if="!isSupabaseUploaded" class="mt-4">
                        <fwb-button pill size="lg" :disabled="!file" :loading="isRunning" loading-position="prefix"
                            @click="runPipeline">
                            {{ errorMessage ? t('reports.retryGenerate') : t('reports.generateReport') }}
                        </fwb-button>
                    </div>
                </div>

                <div
                    class="w-full lg:w-[380px] shrink-0 lg:border-l lg:border-gray-200 dark:lg:border-gray-700 lg:pl-10 lg:sticky lg:top-6">
                    <p v-if="!errorMessage && !isSupabaseUploaded" class="text-sm text-gray-400 dark:text-gray-500">
                        {{ t('reports.statusPlaceholder') }}
                    </p>

                    <fwb-alert v-if="errorMessage" type="danger" closable @close="clearError">
                        <div class="flex flex-col gap-2 w-full flex-1 min-w-0">
                            <p>{{ errorMessage }}</p>
                            <p v-if="errorDetail" class="text-xs font-mono break-words opacity-75">
                                {{ errorDetail }}
                            </p>
                            <p v-if="isRlsError" class="text-sm">{{ t('reports.rlsErrorHint') }}</p>
                            <button v-if="failedStep === 4" type="button" :disabled="isCreatingBucket"
                                class="self-start text-sm font-semibold underline hover:no-underline disabled:opacity-50"
                                @click="handleCreateBucket">
                                {{ isCreatingBucket ? t('reports.creatingBucket') : t('reports.createBucket') }}
                            </button>

                            <details v-if="failedStep === 4" class="mt-1 w-full">
                                <summary class="text-sm font-semibold cursor-pointer select-none">
                                    {{ t('reports.showSetupSql') }}
                                </summary>
                                <div class="mt-2 rounded-md bg-black/5 dark:bg-black/30 p-3 w-full">
                                    <p class="text-xs mb-2 opacity-90">{{ t('reports.setupSqlHint') }}</p>
                                    <pre class="text-xs font-mono whitespace-pre-wrap break-words max-h-64 overflow-y-auto">{{ SETUP_SQL }}</pre>
                                    <div class="flex flex-wrap items-center gap-3 mt-2">
                                        <button type="button"
                                            class="text-sm font-semibold underline hover:no-underline"
                                            @click="copySetupSql">
                                            {{ copied ? t('reports.sqlCopied') : t('reports.copySql') }}
                                        </button>
                                        <a v-if="sqlEditorUrl" :href="sqlEditorUrl" target="_blank"
                                            rel="noopener noreferrer"
                                            class="text-sm font-semibold underline hover:no-underline">
                                            {{ t('reports.openSqlEditor') }} ↗
                                        </a>
                                    </div>
                                </div>
                            </details>
                        </div>
                    </fwb-alert>

                    <fwb-alert v-if="isSupabaseUploaded" type="success" icon>
                        <div class="flex flex-col gap-2 w-full flex-1 min-w-0">
                            <p>
                                <span class="font-medium">{{ pdfName }}</span> — {{ t('reports.reportReady') }}.
                                <router-link to="/dashboard" class="font-semibold underline hover:no-underline">
                                    {{ t('reports.viewInDashboard') }}
                                </router-link>
                            </p>
                            <button type="button"
                                class="self-start text-sm font-semibold underline hover:no-underline"
                                @click="resetForm">
                                {{ t('reports.generateAnother') }}
                            </button>
                        </div>
                    </fwb-alert>
                </div>
            </div>
        </div>
    </fwb-card>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import {
    faSpinner,
    faCheck,
    faXmark,
    faFileArrowUp,
    faTableList,
    faFilePdf,
    faCloudArrowUp,
    type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useSupabaseUpload } from '../../../composables/useSupabaseUpload';
import { FwbButton, FwbCard, FwbFileInput, FwbBadge, FwbAlert, FwbProgress } from 'flowbite-vue';
import { useProcessData } from '../../../composables/useProcessData';
import { useGeneratePdf } from '../../../composables/useGeneratePdf';
import { useI18n } from 'vue-i18n';
import { getErrorMessage } from '../../../utils/getErrorMessage';

type StepState = 'pending' | 'active' | 'done' | 'error';

const SETUP_SQL = `create policy "Authenticated users can create buckets"
on storage.buckets for insert
to authenticated
with check (true);

create policy "Authenticated users can upload reports"
on storage.objects for insert
to authenticated
with check (bucket_id = 'reports');

create policy "Authenticated users can update reports"
on storage.objects for update
to authenticated
using (bucket_id = 'reports')
with check (bucket_id = 'reports');

create policy "Authenticated users can read reports"
on storage.objects for select
to authenticated
using (bucket_id = 'reports');

create policy "Authenticated users can delete reports"
on storage.objects for delete
to authenticated
using (bucket_id = 'reports');`;

const projectRef = (import.meta.env.VITE_SUPABASE_URL as string | undefined)
    ?.match(/^https:\/\/([a-z0-9-]+)\.supabase\.co/i)?.[1];
const sqlEditorUrl = projectRef ? `https://supabase.com/dashboard/project/${projectRef}/sql/new` : null;

const copied = ref(false);
let copiedTimeout: ReturnType<typeof setTimeout> | undefined;

const copySetupSql = async () => {
    try {
        await navigator.clipboard.writeText(SETUP_SQL);
        copied.value = true;
        clearTimeout(copiedTimeout);
        copiedTimeout = setTimeout(() => (copied.value = false), 2000);
    } catch (error) {
        console.error('Error copying setup SQL:', error);
    }
};

const { t } = useI18n();
const pdfName = ref("");
const loadingMessage = ref("");
const errorMessage = ref("");
const errorDetail = ref("");
const activeStep = ref(0);
const failedStep = ref<number | null>(null);
const isRunning = ref(false);
const isEditingFile = ref(false);
const file = ref<File | null>(null);

const isDataProcessed = ref(false);
const isPdfGenerated = ref(false);
const isSupabaseUploaded = ref(false);

const processedData = ref<{ data: any; columns: { field: string; header: string; }[]; } | null>(null);

const isCreatingBucket = ref(false);

const { uploadFileToFolder, createBucket } = useSupabaseUpload();
const { processData } = useProcessData();
const { convertToPdf } = useGeneratePdf();

const isRlsError = computed(() => /row-level security/i.test(errorDetail.value));

const progressPercent = computed(() => {
    const completed = [!!file.value, isDataProcessed.value, isPdfGenerated.value, isSupabaseUploaded.value]
        .filter(Boolean).length;
    return (completed / 4) * 100;
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

watch(file, () => {
    isEditingFile.value = false;
});

const clearError = () => {
    errorMessage.value = "";
    errorDetail.value = "";
    failedStep.value = null;
};

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
    clearError();

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
        failedStep.value = activeStep.value;
        errorMessage.value = t("reports.stepError");
        errorDetail.value = getErrorMessage(error);
    } finally {
        activeStep.value = 0;
        isRunning.value = false;
    }
};

const handleCreateBucket = async () => {
    isCreatingBucket.value = true;

    try {
        await createBucket('reports', { public: true });
        clearError();
        await runPipeline();
    } catch (error) {
        console.error('Error creating bucket:', error);
        errorMessage.value = t("reports.stepError");
        errorDetail.value = getErrorMessage(error);
    } finally {
        isCreatingBucket.value = false;
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
    clearError();
};
</script>
