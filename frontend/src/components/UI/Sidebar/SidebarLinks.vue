<template>
    <SidebarLink v-for="link in links" :key="link.label" :icon="link.icon" :label="link.label" :to="link.to" />
</template>

<script setup lang="ts">
import SidebarLink from './SidebarLink.vue';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface Props {
    links: { icon: IconProp; label: string; to: string }[];
}

defineProps<Props>();
</script>

