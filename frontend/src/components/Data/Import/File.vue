<template>
    <div class="p-2 hover:bg-gray-700 transition" :key="file.name">
        <span class="text-gray-300 cursor-pointer" @click="handleOpen(file)">{{ file.name }}</span>
    </div>
</template>

<script setup lang="ts">
import { useOpenFile } from '../../../composables/useOpenFile';

const { openFile, getSignedUrl } = useOpenFile();

const handleOpen = async (file: any) => {
    file.isLoading = true;

    try {
        const signedUrl = await getSignedUrl(file.name);
        if (signedUrl) {
            openFile(signedUrl.signedUrl);
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
