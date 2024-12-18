<template>
    <fwb-sidebar>
        <SidebarLink v-for="link in links" :key="link.label" :icon="link.icon" :label="link.label" :to="link.to" />
        <fwb-sidebar-item-group border>
            <SidebarLink :icon="faCog" label="Settings" :to="'/settings'" />
        </fwb-sidebar-item-group>
    </fwb-sidebar>
</template>

<script setup lang="ts">
import { FwbSidebar, FwbSidebarItemGroup } from "flowbite-vue";
import SidebarLink from './SidebarLink.vue';
import { faTachometerAlt, faFileAlt, faCog } from '@fortawesome/free-solid-svg-icons';

const links = [
    { icon: faTachometerAlt, label: 'Dashboard', to: '/' },
    { icon: faFileAlt, label: 'Reports', to: '/reports' },
];
</script>