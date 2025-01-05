<template>
    <div>
        <fwb-card
            class="flex items-center gap-6 p-6 ml-0 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 m-6 cursor-pointer"
            @click="openFile(file.name)">
            <FontAwesomeIcon :icon="faFile" />
            <span class="ml-2">{{ file.name }}</span>
            <div v-if="isLoading" class="flex justify-center items-center mt-4">
                <FontAwesomeIcon :icon="faSpinner" class="animate-spin" />
            </div>
        </fwb-card>
        <!-- <div class="flex justify-center bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 m-6 cursor-pointer">
            <a :href="signedUrl" target="_blank">{{ signedUrl }}</a>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import { FwbCard } from 'flowbite-vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { useOpenFile } from '../../composables/useOpenFile';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const { openFile, getSignedUrl } = useOpenFile();

const props = defineProps<{
    file: File;
    isLoading: boolean;
}>();

// const signedUrl = await getSignedUrl(props.file.name);
</script>
