<template>
    <div class="p-2 hover:bg-gray-700 transition" :key="file.name">
        <span class="text-gray-300 cursor-pointer" @click="handleOpen(file)">{{ file.name }}</span>
    </div>
</template>

<script setup lang="ts">
import { useOpenFile } from '../../../composables/useOpenFile';

const { downloadFile } = useOpenFile();

const handleOpen = async (file: any) => {
    file.isLoading = true;

    try {
        const blob = await downloadFile(file.name);
        if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = file.name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    } catch (error) {
        console.error(error);
    }

    file.isLoading = false;
};

defineProps<{
    file: any;
}>();
</script>