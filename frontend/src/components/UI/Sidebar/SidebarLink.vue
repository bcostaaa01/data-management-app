<template>
    <fwb-sidebar-item class="flex items-center py-2">
        <template #icon>
            <font-awesome-icon :icon="icon" class="w-4 h-4" />
        </template>
        <template #default>
            <router-link :to="to" class="ml-2 text-sm">{{ label }}</router-link>
        </template>
    </fwb-sidebar-item>
</template>

<script setup lang="ts">
import { FwbSidebarItem } from "flowbite-vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface Props {
    icon: IconProp;
    label: string;
    to: string;
}

defineProps<Props>();
</script>