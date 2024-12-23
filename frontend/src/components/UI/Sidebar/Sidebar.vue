<template>
    <fwb-sidebar class="text-sm">
        <SmartSearch />
        <SidebarLink v-for="link in links" :key="link.label" :icon="link.icon" :label="link.label" :to="link.to" />
        <fwb-sidebar-item-group border>
            <SidebarLink :icon="faCog" :label="t('sidebar.settings')" :to="'/settings'" />
        </fwb-sidebar-item-group>
    </fwb-sidebar>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { FwbSidebar, FwbSidebarItemGroup } from "flowbite-vue";
import SidebarLink from './SidebarLink.vue';
import { faTachometerAlt, faFileAlt, faCog } from '@fortawesome/free-solid-svg-icons';
import SmartSearch from '../../SmartSearch/SmartSearch.vue';
import { useI18n } from 'vue-i18n';
import { faTable } from '@fortawesome/free-solid-svg-icons/faTable';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const { t } = useI18n();

type Link = {
    icon: IconProp;
    label: string;
    to: string;
};

const links = computed<Link[]>(() => [
    { icon: faTachometerAlt, label: 'Dashboard', to: '/' },
    { icon: faFileAlt, label: `${t('sidebar.reports')}`, to: '/reports' },
    { icon: faTable, label: `${t('sidebar.tables')}`, to: '/tables' },
]);
</script>