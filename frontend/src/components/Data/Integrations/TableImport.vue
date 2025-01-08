<template>
    <div class="w-full">
        <fwb-button class="mt-4" @click="importTable">{{ t('tables.importTable') }}</fwb-button>
    </div>
</template>

<script setup lang="ts">
import { FwbButton } from 'flowbite-vue';
import { useI18n } from 'vue-i18n';
import { useTablesStore } from '../../../stores/tables.store';

const { t } = useI18n();
const tablesStore = useTablesStore();

const importTable = async () => {
    tablesStore.fetchTable('users');
};
</script>
