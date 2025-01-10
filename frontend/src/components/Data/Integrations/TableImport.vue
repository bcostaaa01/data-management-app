<template>
    <div class="w-full">
        <TableSearch v-if="!isConnecting" class="my-4 w-32" @update:value="updateTableName" />
        <fwb-button class="mt-4" @click="importTable" :disabled="!tableName">
            <span v-if="!isConnecting">{{ t('tables.importTable') }}</span>
            <FontAwesomeIcon :icon="faSpinner" spin v-else />
        </fwb-button>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { FwbButton } from 'flowbite-vue';
import { useI18n } from 'vue-i18n';
import { useTablesStore } from '../../../stores/tables.store';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import TableSearch from './TableSearch.vue';

const { t } = useI18n();
const tablesStore = useTablesStore();

const tableName = ref('');

const isConnecting = computed(() => tablesStore.isConnectingToTable);

const importTable = async () => {
    tablesStore.fetchTable(tableName.value);
};

const updateTableName = (newVal: string) => {
    console.log(newVal);
    tableName.value = newVal;
};
</script>
