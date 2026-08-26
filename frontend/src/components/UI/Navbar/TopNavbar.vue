<template>
    <header
        class="flex items-center justify-between gap-4 h-14 px-4 shrink-0 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-100">
        <div class="flex items-center gap-2 min-w-0">
            <router-link to="/"
                class="flex items-center gap-2 rounded-lg px-2 py-1.5 -ml-2 shrink-0 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                <img src="../../../assets/app-logo.png" alt="" class="w-7 h-7 rounded-md shrink-0" />
                <span class="text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">{{ appName
                    }}</span>
            </router-link>
            <template v-if="pageTitle">
                <span class="text-gray-300 dark:text-gray-600">/</span>
                <span class="text-sm text-gray-500 dark:text-gray-400 truncate">{{ pageTitle }}</span>
            </template>
        </div>

        <div class="flex items-center gap-2 shrink-0">
            <SmartSearchInput class="w-48" />
            <div class="flex items-center gap-1">
                <RefreshServiceWorker />
                <ProjectHealth />
                <ThemeToggle />
                <UserAvatarButton />
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import SmartSearchInput from '../../SmartSearch/SmartSearchInput.vue';
import ThemeToggle from '../../ThemeSwitch/ThemeToggle.vue';
import ProjectHealth from '../../SupabaseHealth/ProjectHealth.vue';
import RefreshServiceWorker from '../../ServiceWorker/RefreshServiceWorker.vue';
import UserAvatarButton from './UserAvatarButton.vue';

const { t } = useI18n();
const route = useRoute();

const appName = "Data Management App";

const pageTitle = computed(() => {
    if (route.name === 'file') return t('fileView.fileDetails');

    switch (route.path) {
        case '/':
            return '';
        case '/dashboard':
            return t('dashboard.title');
        case '/data-import':
            return t('dataImport.title');
        case '/reports':
            return t('reports.title');
        case '/tables':
            return t('tables.title');
        case '/settings':
            return t('pages.settings');
        case '/chatbot':
            return t('chatbot.title');
        default:
            return '';
    }
});
</script>
