<template>
    <div class="bg-gray-200 w-full p-2 rounded-lg dark:bg-gray-800">
        <DataTable selection-mode="single" :value="paginatedItems" :columns="columns" :rows="rows" removable-sort>
            <template #header>
                <div class="flex justify-between items-center ">
                    <div
                        class="text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 p-2 rounded-lg transition duration-200 cursor-pointer">
                        <h1>{{ name }}</h1>
                    </div>
                    <div
                        class="text-gray-500 dark:text-gray-100 hover:bg-gray-800 p-2 rounded-lg transition duration-200 cursor-pointer">
                        <FontAwesomeIcon :icon="faPlus" class="w-5 h-5" />
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
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import DataTablePagination from './DataTablePagination.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useTablesStore } from '../../stores/tables.store';

const tablesStore = useTablesStore();


const items = computed(() => props.items);
const columns = computed(() => props.columns);
const rows = ref(5);
const currentPage = ref(1);
const table = tablesStore.table;
const name = tablesStore.name;

console.log(table);
console.log("name", name);



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