<template>
    <template v-for="crumb in crumbs" :key="crumb.to ?? crumb.label">
        <span class="text-gray-300 dark:text-gray-600">/</span>
        <BreadcrumbItem :label="crumb.label" :to="crumb.to" />
    </template>
</template>

<script setup lang="ts">
import BreadcrumbItem from './BreadcrumbItem.vue';
import { Crumb } from '../../../composables/useBreadcrumbs';

interface Props {
    crumbs: Crumb[];
}

defineProps<Props>();
</script>
