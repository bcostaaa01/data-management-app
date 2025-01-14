<template>
    <div class="p-4">
        <h1 class="text-2xl font-bold dark:text-white mb-4">File Details</h1>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
            <span class="text-lg dark:text-white">File: {{ fileName }}</span>
        </div>
        <File v-if="fileName" :file="id" :fileName="fileName" />
        <div v-else>Loading file details...</div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
import File from '../components/Data/Import/File.vue';
import { useGetFilesFromBucket } from '../composables/useGetFiles';

const route = useRoute();
const id = ref(route.params.id as string);
const fileName = ref('');

const { files, getFiles } = useGetFilesFromBucket();

onMounted(async () => {
    await getFiles();
});

watch(files, (newFiles) => {
    const file = newFiles.find(f => f.id === id.value);
    if (file) {
        fileName.value = file.name;
    }
});
</script>
