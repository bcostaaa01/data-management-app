<template>
    <header class="flex justify-between items-center border-b border-gray-300 pb-4">
        <h1 class="text-2xl font-bold dark:text-white">{{ t('tables.title') }}</h1>
    </header>
    <TableImport />
    <div class="mt-4">
        <DataTable v-if="!isConnecting && items.length > 0" :items="items" :columns="columns" />
        <div v-else-if="isConnecting && items.length === 0">
            <p>{{ t('tables.importTableLoading') }}</p>
        </div>
        <div v-if="items.length === 0">
            <p>{{ t('tables.noDataMessage') }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useTablesStore } from '../stores/tables.store';
import TableImport from '../components/Data/Integrations/TableImport.vue';
import DataTable from '../components/DataTable/DataTable.vue';

const { t } = useI18n();
const tablesStore = useTablesStore();

const items = computed(() => tablesStore.tables);
const isConnecting = computed(() => tablesStore.isConnectingToTable);
const columns = computed(() => tablesStore.columns);
</script>
