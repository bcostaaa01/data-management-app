<template>
    <div class="w-full">
        <fwb-button class="mt-4" @click="importTable">
            <span v-if="!isConnecting">{{ t('tables.importTable') }}</span>
            <FontAwesomeIcon :icon="faSpinner" spin v-else />
        </fwb-button>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { FwbButton } from 'flowbite-vue';
import { useI18n } from 'vue-i18n';
import { useTablesStore } from '../../../stores/tables.store';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const { t } = useI18n();
const tablesStore = useTablesStore();

const isConnecting = computed(() => tablesStore.isConnectingToTable);

const importTable = async () => {
    tablesStore.fetchTable('sales');
};
</script>
