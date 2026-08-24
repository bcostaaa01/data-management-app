<template>
    <fwb-sidebar-item :tag="to ? 'router-link' : 'button'" :link="to"
        class="flex items-center w-full py-2 my-1 text-left rounded-lg transition-colors duration-200 hover:!bg-blue-500 hover:!text-white dark:hover:!bg-blue-500 dark:hover:!text-white"
        :class="activeClasses">
        <template #icon>
            <font-awesome-icon :icon="icon" class="w-4 h-4 shrink-0" />
        </template>
        <span class="text-sm">{{ label }}</span>
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
    to?: string;
}

const props = defineProps<Props>();

const route = useRoute();

const activeClasses = computed(() => {
    return props.to && route.path === props.to ? 'bg-blue-500 text-white' : '';
});
</script>
