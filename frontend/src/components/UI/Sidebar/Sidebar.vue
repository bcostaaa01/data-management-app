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

        <fwb-sidebar-item-group border>
            <fwb-sidebar-item>
                <template #icon>
                    <font-awesome-icon :icon="faCog" />
                </template>
                <template #default>
                    <router-link to="/settings">Settings</router-link>
                </template>
            </fwb-sidebar-item>
        </fwb-sidebar-item-group>
    </fwb-sidebar>
</template>

<script setup>
import { FwbSidebar, FwbSidebarItem, FwbSidebarItemGroup } from "flowbite-vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTachometerAlt, faFileAlt, faCog } from '@fortawesome/free-solid-svg-icons';

</script>