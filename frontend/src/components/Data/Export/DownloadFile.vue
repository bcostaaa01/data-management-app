<template>
    <button @click="handleDownload" class="transition-all duration-300 hover:scale-110">
        <FontAwesomeIcon :icon="faDownload" class="dark:text-white hover:text-gray-800" />
    </button>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { useOpenFile } from '../../../composables/useOpenFile';

const { downloadFile } = useOpenFile();

const props = defineProps<{
    fileName: string;
}>();

const handleDownload = async () => {
    const blob = await downloadFile(props.fileName);
    if (blob) {
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
    }
};
</script>
