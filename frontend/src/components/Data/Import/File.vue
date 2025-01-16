<template>
    <div class="h-[calc(95vh-8rem)] w-full">
        <div v-if="pdfUrl" class="w-full h-full overflow-auto">
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
import VuePdfEmbed from 'vue-pdf-embed';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const { downloadFile } = useOpenFile();
const pdfUrl = ref<string | null>(null);

const props = defineProps<{
    file: string;
    fileName: string;
}>();

onMounted(async () => {
    try {
        const blob = await downloadFile(props.fileName);
        if (blob) {
            pdfUrl.value = URL.createObjectURL(blob);
        }
    } catch (error) {
        console.error('Error loading PDF:', error);
    }
});

onUnmounted(() => {
    if (pdfUrl.value) {
        URL.revokeObjectURL(pdfUrl.value);
    }
});
</script>