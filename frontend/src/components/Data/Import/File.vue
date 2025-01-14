<template>
    <div class="h-[calc(100vh-8rem)] w-full">
        <div v-if="pdfUrl" class="w-full h-full overflow-auto">
            <VuePdfEmbed :source="pdfUrl" class="w-full" style="min-width: fit-content">
                <template #after-page>
                    <br class="w-full" />
                </template>
            </VuePdfEmbed>
        </div>
        <div v-else class="flex items-center justify-center h-full">
            Loading PDF...
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue';
import { useOpenFile } from '../../../composables/useOpenFile';
import VuePdfEmbed from 'vue-pdf-embed';

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