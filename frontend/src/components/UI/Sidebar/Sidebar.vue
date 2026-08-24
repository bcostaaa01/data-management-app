<template>
    <aside
        class="shrink-0 h-screen flex flex-col border-r dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-100 transition-[width] duration-300 overflow-hidden"
        :class="visible ? 'w-64' : 'w-16'" aria-label="Sidebar">
        <div class="flex items-center h-14 px-3 shrink-0" :class="visible ? 'justify-between' : 'justify-center'">
            <CompanyInfo v-if="visible" />
            <button @click="toggleSidebar" :aria-label="visible ? t('sidebar.collapse') : t('sidebar.expand')"
                class="shrink-0 hover:bg-gray-300 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white rounded-md p-2 transition-colors duration-200">
                <FontAwesomeIcon :icon="visible ? faTimes : faBars" class="w-5 h-5" />
            </button>
        </div>

        <SmartSearchInput v-if="visible" class="px-3 shrink-0" />

        <nav class="flex-1 overflow-y-auto overflow-x-hidden px-3 py-2">
            <template v-if="visible">
                <SidebarLinks :links="links" />
                <fwb-sidebar-item-group border>
                    <SidebarLink :icon="faCog" :label="t('sidebar.settings')" :to="'/settings'" class="my-0" />
                </fwb-sidebar-item-group>
                <SidebarLink :icon="faSignOutAlt" :label="t('sidebar.signOut')" @click="signOut(router)" />
            </template>
            <div v-else class="flex flex-col items-center gap-1">
                <router-link v-for="link in links" :key="link.to" :to="link.to"
                    class="flex items-center justify-center w-10 h-10 rounded-lg transition-colors duration-200"
                    :class="route.path === link.to
                        ? 'bg-blue-500 text-white'
                        : 'hover:bg-gray-300 dark:hover:bg-gray-700'" :title="link.label" :aria-label="link.label">
                    <FontAwesomeIcon :icon="link.icon" class="w-4 h-4" />
                </router-link>
            </div>
        </nav>

        <div v-if="visible" class="px-3 pb-3 shrink-0">
            <UserInfo />
        </div>
    </aside>
</template>

<script setup lang="ts">
import { FwbSidebarItemGroup } from "flowbite-vue";
import SidebarLink from './SidebarLink.vue';
import { faCog, faBars, faTimes, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useI18n } from 'vue-i18n';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import CompanyInfo from './CompanyInfo.vue';
import SmartSearchInput from '../../SmartSearch/SmartSearchInput.vue';
import { signOut } from "../../../supabase/auth";
import { useSidebar } from '../../../composables/useSidebar';
import SidebarLinks from './SidebarLinks.vue';
import { useSidebarLinks } from '../../../composables/useSidebarLinks';
import UserInfo from './UserInfo.vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const { visible, toggleSidebar } = useSidebar();

const { t } = useI18n();

const links = useSidebarLinks(t);
</script>
