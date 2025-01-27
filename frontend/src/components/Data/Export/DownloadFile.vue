<template>
    <button @click="handleDownload" class="transition-all duration-300 hover:scale-110">
        <FontAwesomeIcon v-if="!isLoading" :icon="faDownload" class="dark:text-white hover:text-gray-400" />
        <FontAwesomeIcon v-else :icon="faSpinner" class="animate-spin" />
    </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faDownload, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useOpenFile } from '../../../composables/useOpenFile';

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
