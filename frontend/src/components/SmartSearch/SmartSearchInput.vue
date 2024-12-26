<template>
    <div @click="openModal" tabindex="0" class="relative w-50 cursor-pointer">
        <fwb-input type="text" :placeholder="`Search for reports, tables, ...(${systemKey}+K)`" readonly
            class="w-full py-2 text-xs rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition-colors duration-200" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FwbInput } from 'flowbite-vue';
import { useSmartSearchStore } from '../../stores/smart-search.store';

const smartSearchStore = useSmartSearchStore();

const openModal = () => {
    smartSearchStore.openModal();
};

const systemKey = ref(navigator.platform.includes('Mac') ? '⌘' : 'Ctrl');
</script>
