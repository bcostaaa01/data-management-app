<template>
    <div class="w-full">
        <h3 class="text-3xl font-bold flex justify-start">{{ t('tables.title') }}</h3>
        <TableImport />
        <div class="mt-4">
            <table class="min-w-full bg-white dark:bg-gray-800">
                <thead>
                    <tr>
                        <th class="py-2 px-4 border-b border-gray-200">{{ $t('table.headers.id') }}</th>
                        <th class="py-2 px-4 border-b border-gray-200">{{ $t('table.headers.name') }}</th>
                        <th class="py-2 px-4 border-b border-gray-200">{{ $t('table.headers.age') }}</th>
                        <th class="py-2 px-4 border-b border-gray-200">{{ $t('table.headers.email') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in items" :key="item.id">
                        <td class="py-2 px-4 border-b border-gray-200">{{ item.id }}</td>
                        <td class="py-2 px-4 border-b border-gray-200">{{ item.name }}</td>
                        <td class="py-2 px-4 border-b border-gray-200">{{ item.age }}</td>
                        <td class="py-2 px-4 border-b border-gray-200">{{ item.email }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useTablesStore } from '../stores/tables.store';
import TableImport from '../components/Data/Integrations/TableImport.vue';

const { t } = useI18n();
const tablesStore = useTablesStore();

const items = computed(() => tablesStore.tables);
</script>
