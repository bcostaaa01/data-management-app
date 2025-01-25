<template>
    <fwb-modal v-if="smartSearchStore.isOpen" @close="smartSearchStore.closeModal" size="4xl">
        <template #header>
            <div class="flex items-center w-full">
                <FontAwesomeIcon :icon="faSearch" class="h-4 w-4 text-gray-500 mr-2" />
                <input v-model="query" placeholder="Search for reports, tables, ..." autofocus
                    class="w-full ml-2 mr-2 text-sm dark:bg-gray-700 dark:text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    @keyup.enter="search" />
            </div>
        </template>
        <template #body>
            <ul v-if="results.length" class="flex flex-col text-sm">
                <router-link v-for="result in results" :key="result.id" :to="`/file/${result.id}`"
                    class="px-2 py-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-500 rounded-md"
                    @click="closeModal">
                    {{ result.name }}
                </router-link>
            </ul>
            <div v-else class="text-center text-gray-500 py-8 text-sm">
                No results found.
            </div>
        </template>
    </fwb-modal>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useGetFilesFromBucket } from '../../composables/useGetFiles';
import { useSmartSearchStore } from '../../stores/smart-search.store';
import { FwbModal, FwbInput } from 'flowbite-vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const smartSearchStore = useSmartSearchStore();
const { files, getFiles } = useGetFilesFromBucket();

const query = ref('');

const results = computed(() => {
    const filteredResults = files.value.filter(file => file.name.toLowerCase().includes(query.value.toLowerCase()));
    console.log('Filtered Results:', filteredResults);
    return filteredResults;
});

const openModal = () => {
    smartSearchStore.openModal();
};

const closeModal = () => {
    smartSearchStore.closeModal();
};

const handleKeyPress = (event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        if (smartSearchStore.isOpen) {
            closeModal();
        } else {
            openModal();
        }
    }
};

onMounted(() => {
    getFiles();
    window.addEventListener('keydown', handleKeyPress);
    smartSearchStore.search();
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyPress);
});

const search = async () => {
    if (query.value) {
        smartSearchStore.searchQuery = query.value;
    }
    await smartSearchStore.search();
};

// TODO: fix the keypress not working and the modal opening on component mount
</script>