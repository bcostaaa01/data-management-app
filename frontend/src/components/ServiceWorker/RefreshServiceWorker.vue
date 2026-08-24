<template>
    <fwb-tooltip v-if="needRefresh" placement="bottom">
        <template #trigger>
            <button @click="updateButton" type="button" :aria-label="t('serviceWorker.updateAvailable')"
                class="flex items-center justify-center w-9 h-9 rounded-lg text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                <FontAwesomeIcon :icon="faArrowsRotate" class="w-4 h-4" />
            </button>
        </template>
        <template #content>
            <span class="text-sm">{{ t('serviceWorker.updateAvailable') }}</span>
        </template>
    </fwb-tooltip>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRegisterSW } from 'virtual:pwa-register/vue';
import { toast } from 'vue3-toastify';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { FwbTooltip } from 'flowbite-vue';

const { t } = useI18n();

const { needRefresh, updateServiceWorker } = useRegisterSW();

watch(needRefresh, (isRefreshNeeded) => {
    if (isRefreshNeeded) {
        toast(t('serviceWorker.updateAvailable'), {
            theme: "auto",
            type: "success",
            position: "top-right",
        });
    }
});

const updateButton = () => {
    updateServiceWorker();
    window.location.reload();
};
</script>
