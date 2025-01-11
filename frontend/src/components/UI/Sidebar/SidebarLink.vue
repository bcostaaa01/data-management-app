<template>
    <fwb-sidebar-item class="flex items-center py-2 my-2 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white hover:transition-colors duration-200" :class="activeClasses">
        <template #icon>
            <font-awesome-icon :icon="icon" class="w-4 h-4" />
        </template>
        <template #default>
            <router-link :to="to" class="ml-2 text-sm" @click="click">{{ label }}</router-link>
        </template>
    </fwb-sidebar-item>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { FwbSidebarItem } from "flowbite-vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface Props {
    icon: IconProp;
    label: string;
    to: string;
    click?: () => void;
}

const props = defineProps<Props>();

const route = useRoute();

const activeClasses = computed(() => {
    return route.path === props.to ? 'bg-blue-500 text-white transition-colors duration-200' : '';
});
</script>