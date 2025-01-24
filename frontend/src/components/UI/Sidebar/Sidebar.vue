<template>
    <div class="relative z-50">
        <div
            class="fixed inset-y-0 top-0 left-0 h-screen w-16 bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-100">

            <button @click="toggleSidebar"
                class="mt-4 ml-4 hover:bg-gray-400 hover:text-white rounded-md p-1 transition duration-200 dark:hover:bg-gray-700">
                <FontAwesomeIcon :icon="visible ? faTimes : faBars"
                    class="w-5 h-5 dark:text-gray-100 hover:text-white" />
            </button>

            <div v-if="visible" class="fixed top-0 left-0 h-screen w-16 bg-gray-800 text-white" />

            <Transition mode="out-in" appear name="slide">
                <aside id="default-sidebar"
                    :class="['fixed', 'top-0', 'left-0', 'z-40', 'h-screen', 'border-r', 'dark:border-gray-700', visible ? 'translate-x-0' : '-translate-x-full', 'sm:translate-x-0', 'w-64']"
                    aria-label="Sidebar" v-if="visible">
                    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                        <div class="flex justify-between items-center h-14">
                            <CompanyInfo />
                            <SidebarToggle @open="onToggle" class="mb-4" />
                        </div>
                        <SmartSearchInput />
                        <SidebarLinks :links="links" />
                        <fwb-sidebar-item-group border>
                            <SidebarLink :icon="faCog" :label="t('sidebar.settings')" :to="'/settings'" class="my-0" />
                        </fwb-sidebar-item-group>
                        <SidebarLink :icon="faSignOutAlt" :label="t('sidebar.signOut')" @click="signOut" />
                        <div class="absolute bottom-3 w-full">
                            <UserInfo />
                        </div>
                    </div>
                </aside>
            </Transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import { FwbSidebarItemGroup } from "flowbite-vue";
import SidebarLink from './SidebarLink.vue';
import { faCog, faBars, faTimes, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useI18n } from 'vue-i18n';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import CompanyInfo from './CompanyInfo.vue';
import SidebarToggle from './SidebarToggle.vue';
import SmartSearchInput from '../../SmartSearch/SmartSearchInput.vue';
import { signOut } from "../../../supabase/auth";
import { useSidebar } from '../../../composables/useSidebar';
import SidebarLinks from './SidebarLinks.vue';
import { useSidebarLinks } from '../../../composables/useSidebarLinks';
import UserInfo from './UserInfo.vue';

const { visible, toggleSidebar } = useSidebar();

const { t } = useI18n();

const links = useSidebarLinks(t);

const onToggle = (open: boolean) => {
    visible.value = open;
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(-100%);
}
</style>
