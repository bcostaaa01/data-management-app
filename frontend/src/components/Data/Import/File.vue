<template>
    <div class="h-[calc(95vh-8rem)] w-full">
        <div v-if="isLoading"
            class="flex flex-col items-center justify-center h-full w-full text-gray-500 dark:text-gray-400">
            <FontAwesomeIcon :icon="faSpinner" class="animate-spin text-2xl mb-2" />
            <span>{{ t('fileView.loadingFile') }}</span>
        </div>

        <div v-else-if="isError" class="flex items-center justify-center h-full w-full p-4">
            <fwb-alert type="danger" icon class="max-w-md">
                <p>{{ t('fileView.pdfLoadError') }}</p>
                <button type="button" class="mt-2 font-semibold underline hover:no-underline" @click="loadPdf">
                    {{ t('fileView.retry') }}
                </button>
            </fwb-alert>
        </div>

        <div v-else-if="pdfUrl"
            class="w-full h-full overflow-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">
            <VuePdfEmbed :source="pdfUrl" class="w-full" style="min-width: fit-content">
                <template #after-page>
                    <br class="w-full" />
                </template>
            </VuePdfEmbed>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue';
import { useOpenFile } from '../../../composables/useOpenFile';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { FwbAlert } from 'flowbite-vue';
import VuePdfEmbed from 'vue-pdf-embed';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const { downloadFile } = useOpenFile();
const pdfUrl = ref<string | null>(null);
const isLoading = ref(true);
const isError = ref(false);

const props = defineProps<{
    file: string;
    fileName: string;
}>();

const loadPdf = async () => {
    isLoading.value = true;
    isError.value = false;

    if (pdfUrl.value) {
        URL.revokeObjectURL(pdfUrl.value);
        pdfUrl.value = null;
    }

    try {
        const blob = await downloadFile(props.fileName);
        if (blob) {
            pdfUrl.value = URL.createObjectURL(blob);
        } else {
            isError.value = true;
        }
    } catch (error) {
        console.error('Error loading PDF:', error);
        isError.value = true;
    } finally {
        isLoading.value = false;
    }
};

onMounted(loadPdf);

onUnmounted(() => {
    if (pdfUrl.value) {
        URL.revokeObjectURL(pdfUrl.value);
    }
});
</script>
