<template>
    <div @click="openModal" @keydown.enter="openModal" @keydown.space.prevent="openModal" tabindex="0" role="button"
        :aria-label="t('smartSearch.title')"
        class="flex items-center gap-2 px-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900/40 cursor-pointer transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-500/50 hover:shadow-[0_0_0_3px_rgba(59,130,246,0.12)] focus:outline-none focus:border-blue-400 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.2)]">
        <font-awesome-icon :icon="faSearch" class="h-3.5 w-3.5 text-gray-400 shrink-0" />
        <span class="flex-1 text-xs text-gray-400 truncate">{{ t('smartSearch.triggerPlaceholder') }}</span>
        <kbd
            class="inline-flex items-center justify-center h-5 px-1.5 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-[10px] font-medium text-gray-500 dark:text-gray-400 shrink-0">
            {{ systemKey }}K
        </kbd>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useSmartSearchStore } from '../../stores/smart-search.store';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const { t } = useI18n();
const smartSearchStore = useSmartSearchStore();

const openModal = () => {
    smartSearchStore.openModal();
};

const systemKey = ref(navigator.platform.includes('Mac') ? '⌘' : 'Ctrl+');
</script>
