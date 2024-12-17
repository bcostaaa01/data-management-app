<template>
    <fwb-sidebar class="h-full">
        <fwb-sidebar-item>
            <template #icon>
                <font-awesome-icon :icon="faTachometerAlt" />
            </template>
            <template #default>
                <router-link to="/">Dashboard</router-link>
            </template>
        </fwb-sidebar-item>
        <fwb-sidebar-item>
            <template #icon>
                <font-awesome-icon :icon="faFileAlt" />
            </template>
            <template #default>
                <router-link to="/reports">Reports</router-link>
            </template>
        </fwb-sidebar-item>
    </fwb-sidebar>
</template>

<script setup>
import { FwbSidebar, FwbSidebarItem } from "flowbite-vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTachometerAlt, faFileAlt } from '@fortawesome/free-solid-svg-icons';

</script>
