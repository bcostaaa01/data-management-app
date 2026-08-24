<template>
    <fwb-tooltip placement="top">
        <template #trigger>
            <button @click="handleDownload" :disabled="isLoading" :aria-label="t('dashboard.download')"
                class="p-2 rounded-full transition-all duration-200 hover:scale-110 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:hover:scale-100">
                <FontAwesomeIcon v-if="!isLoading" :icon="faDownload" class="text-gray-500 dark:text-gray-300" />
                <FontAwesomeIcon v-else :icon="faSpinner" class="animate-spin text-gray-500 dark:text-gray-300" />
            </button>
        </template>
        <template #content>{{ t('dashboard.download') }}</template>
    </fwb-tooltip>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faDownload, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FwbTooltip } from 'flowbite-vue';
import { useI18n } from 'vue-i18n';
import { useOpenFile } from '../../../composables/useOpenFile';

const { t } = useI18n();
const { downloadFile } = useOpenFile();

const props = defineProps<{
    fileName: string;
}>();

const isLoading = ref(false);

const handleDownload = async () => {
    isLoading.value = true;
    const blob = await downloadFile(props.fileName);
    if (blob) {
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
    }
    isLoading.value = false;
};
</script>
