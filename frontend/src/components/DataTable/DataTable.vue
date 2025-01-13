<template>
    <div class="bg-gray-200 w-full p-2 rounded-lg dark:bg-gray-800">
        <div v-if="!importedTable">
            <DataTable selection-mode="single" :value="paginatedItems" :columns="columns" :rows="rows" removable-sort>
                <template #header>
                    <div class="flex justify-end">
                        <div
                            class="text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 p-2 rounded-lg transition duration-200 cursor-pointer">
                            <h1>{{ name }}</h1>
                        </div>
                        <div class="flex flex-row gap-2">
                            <DataTableActions />
                        </div>
                    </div>
                </template>
                <Column v-for="column in columns" :field="column.field" :header="column.header" :sortable="true">
                    <template #body="{ data }">
                        <div>
                            {{ data[column.field] }}
                        </div>
                    </template>
                </Column>
            </DataTable>
            <DataTablePagination :total-records="items.length" :rows="rows" :current-page="currentPage"
                @page-change="onPageChange" />
        </div>
        <div v-else>
            <DataTable selection-mode="single" :value="paginatedImportedItems" :columns="importedColumns" :rows="rows"
                removable-sort>
                <Column v-for="column in importedColumns" :field="column.field" :header="column.header"
                    :sortable="true">
                    <template #body="{ data }">
                        <div>
                            {{ data[column.field] }}
                        </div>
                    </template>
                </Column>
            </DataTable>
            <DataTablePagination :total-records="importedItems.length" :rows="rows" :current-page="currentPage"
                @page-change="onPageChange" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import DataTablePagination from './DataTablePagination.vue';
import { useTablesStore } from '../../stores/tables.store';
import DataTableActions from './DataTableActions.vue';

const props = defineProps<{
    items: any[];
    columns: any[];
    importedTable?: any;
}>();

const tablesStore = useTablesStore();

const items = computed(() => props.items);
const columns = computed(() => props.columns);
const rows = ref(5);
const currentPage = ref(1);
const name = tablesStore.name;

const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * rows.value;
    const end = start + rows.value;
    return items.value.slice(start, end);
});

const paginatedImportedItems = computed(() => {
    const start = (currentPage.value - 1) * rows.value;
    const end = start + rows.value;
    return importedItems.value.slice(start, end);
});

const onPageChange = (page: number) => {
    currentPage.value = page;
};

const importedItems = computed(() => {
    if (items.value.length > 0) {
        return items.value;
    }
    return [];
});

const importedColumns = computed(() => {
    if (columns.value.length > 0) {
        return columns.value;
    }
    return [];
});
</script>