<template>
    <template v-for="crumb in breadcrumbs" :key="crumb.to ?? crumb.label">
        <span class="text-gray-300 dark:text-gray-600">/</span>
        <router-link v-if="crumb.to" :to="crumb.to"
            class="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 truncate">
            {{ crumb.label }}
        </router-link>
        <span v-else class="text-sm text-gray-500 dark:text-gray-400 truncate">{{ crumb.label }}</span>
    </template>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

interface Crumb {
    label: string;
    to?: string;
}

const route = useRoute();
const router = useRouter();
const { t } = useI18n();

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
