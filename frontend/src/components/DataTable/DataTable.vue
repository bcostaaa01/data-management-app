<template>
    <div class="bg-gray-800 w-full p-2 rounded-lg">
        <DataTable selection-mode="single" :value="paginatedItems" :columns="columns" :rows="rows">
            <Column v-for="column in columns" :field="column.field" :header="column.header" />
        </DataTable>
        <DataTablePagination :total-records="items.length" :rows="rows" :current-page="currentPage"
            @page-change="onPageChange" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import DataTablePagination from './DataTablePagination.vue';

const items = computed(() => props.items);
const columns = computed(() => props.columns);
const rows = ref(5);
const currentPage = ref(1);

const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * rows.value;
    const end = start + rows.value;
    return items.value.slice(start, end);
});

const onPageChange = (page: number) => {
    currentPage.value = page;
};

const props = defineProps<{
    items: any[];
    columns: any[];
}>();
</script>