<template>
    <div class="flex flex-col min-h-full w-full">
        <header class="flex justify-between items-center border-b border-gray-300 pb-4">
            <h1 class="text-2xl font-bold dark:text-white">{{ t('tables.title') }}</h1>
        </header>
        <TableImport />
        <div class="mt-4">
            <DataTable v-if="!isConnecting && items.length > 0" :items="items" :columns="columns" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useTablesStore } from '../stores/tables.store';
import TableImport from '../components/Data/Integrations/TableImport.vue';
import DataTable from '../components/DataTable/DataTable.vue';

const { t } = useI18n();
const tablesStore = useTablesStore();
const tableImport = ref<any>(null);

const items = computed(() => tablesStore.tables);
const isConnecting = computed(() => tablesStore.isConnectingToTable);

const columns = [
    { field: 'id', header: 'ID' },
    { field: 'product', header: 'Product' },
];
</script>
