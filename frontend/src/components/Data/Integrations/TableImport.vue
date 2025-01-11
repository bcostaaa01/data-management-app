<template>
    <div class="w-full">

        <span class="flex my-3 font-bold">{{ t("tables.importTableInfo") }}</span>

        <div class="flex flex-row items-center">
            <TableSearch :disabled="isConnecting" class="my-4 w-32" @update:value="updateTableName" />
            <FontAwesomeIcon :icon="faSquareCaretRight" class="m-5" />
            <fwb-button @click="importTable" :disabled="!tableName">
                <span v-if="!isConnecting">{{ t('tables.importTable') }}</span>
                <div class="flex flex-row items-center" v-else>
                    <span>{{ t("tables.importTableLoading") }}</span>
                    <FontAwesomeIcon :icon="faSpinner" spin class="ml-2" />
                </div>
            </fwb-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { FwbButton } from 'flowbite-vue';
import { useI18n } from 'vue-i18n';
import { useTablesStore } from '../../../stores/tables.store';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSpinner, faSquareCaretRight } from '@fortawesome/free-solid-svg-icons';
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
