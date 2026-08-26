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
            <template v-for="crumb in breadcrumbs" :key="crumb.to ?? crumb.label">
                <span class="text-gray-300 dark:text-gray-600">/</span>
                <router-link v-if="crumb.to" :to="crumb.to"
                    class="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 truncate">
                    {{ crumb.label }}
                </router-link>
                <span v-else class="text-sm text-gray-500 dark:text-gray-400 truncate">{{ crumb.label }}</span>
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
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import SmartSearchInput from '../../SmartSearch/SmartSearchInput.vue';
import ThemeToggle from '../../ThemeSwitch/ThemeToggle.vue';
import ProjectHealth from '../../SupabaseHealth/ProjectHealth.vue';
import RefreshServiceWorker from '../../ServiceWorker/RefreshServiceWorker.vue';
import UserAvatarButton from './UserAvatarButton.vue';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const appName = "Data Management App";

interface Crumb {
    label: string;
    to?: string;
}

const breadcrumbs = computed<Crumb[]>(() => {
    const crumbs: Crumb[] = [];

    let meta = route.meta as { breadcrumb?: string; parent?: string };
    let path: string | undefined = route.path;
    let isCurrent = true;

    while (meta?.breadcrumb) {
        crumbs.unshift({ label: t(meta.breadcrumb), to: isCurrent ? undefined : path });
        isCurrent = false;

        if (!meta.parent) break;
        const resolved = router.resolve(meta.parent);
        path = resolved.path;
        meta = resolved.meta as typeof meta;
    }

    return crumbs;
});
</script>
