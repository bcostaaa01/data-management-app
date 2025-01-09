<template>
    <div class="flex justify-center mt-2 w-full">
        <FwbPagination show-icons enable-first-and-last-buttons :per-page="rows" :total-items="totalRecords"
            @page-change="onPageChange" v-on:page-changed="onPageChange" v-model="currentPage" />
    </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue';
import { FwbPagination } from 'flowbite-vue';

const props = defineProps<{
    totalRecords: number;
    rows: number;
    currentPage: number;
}>();

const currentPage = computed(() => props.currentPage);

const emit = defineEmits(['page-change']);

const onPageChange = (page: number) => {
    console.log("Page changed to:", page);
    emit('page-change', page);
};
</script>
