<template>
    <fwb-modal v-if="isOpen" @close="closeModal" size="4xl">
        <template #header>
            <div class="flex items-center w-full">
                <FontAwesomeIcon :icon="faSearch" class="h-4 w-4 text-gray-500" />
                <fwb-input v-model="query" placeholder="Search for reports, tables, ..." autofocus
                    class="w-full ml-2 mr-2 text-sm focus:outline-none" />
            </div>
        </template>
        <template #body>
            <ul v-if="results.length" class="text-sm">
                <li v-for="result in results" :key="result.id"
                    class="px-2 py-2 cursor-pointer hover:bg-gray-800 rounded-md">
                    {{ result.name }}
                </li>
            </ul>
            <div v-else class="text-center text-gray-500 py-8 text-sm">
                No results found.
            </div>
        </template>
    </fwb-modal>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { FwbModal, FwbInput } from 'flowbite-vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useSmartSearchStore } from '../../stores/smart-search.store';

interface SearchResult {
    id: number;
    name: string;
}

defineProps<{
    isOpen: boolean;
}>();

const smartSearchStore = useSmartSearchStore();

const closeModal = () => {
    smartSearchStore.closeModal();
};

const query = ref('');
const results = ref<SearchResult[]>([
    { id: 1, name: 'Result 1' },
    { id: 2, name: 'Result 2' },
    { id: 3, name: 'Result 3' },
]);

const handleKeyPress = (event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        if (smartSearchStore.isOpen) {
            smartSearchStore.closeModal();
        } else {
            smartSearchStore.openModal();
        }
    }
};

onMounted(() => {
    window.addEventListener('keydown', handleKeyPress);
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyPress);
});
</script>