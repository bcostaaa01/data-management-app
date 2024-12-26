<template>
    <div class="relative">
        <div class="fixed inset-y-0 top-0 left-0 h-screen w-16 bg-gray-50 dark:bg-gray-800 text-white">

            <button @click="toggleSidebar" class="mt-4 ml-4 hover:bg-gray-600 rounded-md p-1 transition duration-200">
                <FontAwesomeIcon :icon="visible ? faTimes : faBars" class="w-5 h-5" />
            </button>

            <div v-if="visible" class="fixed top-0 left-0 h-screen w-16 bg-gray-800 text-white" />

            <Transition mode="out-in" appear name="slide">
                <aside id="default-sidebar"
                    :class="['fixed', 'top-0', 'left-0', 'z-40', 'h-screen', 'border-r', 'border-gray-700', visible ? 'translate-x-0' : '-translate-x-full', 'sm:translate-x-0', 'w-64']"
                    aria-label="Sidebar" v-if="visible">
                    <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                        <div class="flex justify-between items-center h-14">
                            <CompanyInfo />
                            <SidebarToggle @open="onToggle" class="mb-4" />
                        </div>
                        <SmartSearchInput />
                        <SidebarLink v-for="link in links" :key="link.label" :icon="link.icon" :label="link.label"
                            :to="link.to" />
                        <fwb-sidebar-item-group border>
                            <SidebarLink :icon="faCog" :label="t('sidebar.settings')" :to="'/settings'" class="my-0" />
                        </fwb-sidebar-item-group>
                        <SidebarLink :icon="faSignOutAlt" :label="t('sidebar.signOut')" @click="signOut" />
                    </div>
                </aside>
            </Transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { FwbSidebarItemGroup } from "flowbite-vue";
import SidebarLink from './SidebarLink.vue';
import { faTachometerAlt, faFileAlt, faCog, faBars, faTimes, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useI18n } from 'vue-i18n';
import { faTable } from '@fortawesome/free-solid-svg-icons/faTable';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import CompanyInfo from './CompanyInfo.vue';
import SidebarToggle from './SidebarToggle.vue';
import SmartSearchInput from '../../SmartSearch/SmartSearchInput.vue';
import { signOut } from "../../../supabase/auth";

const { t } = useI18n();

type Link = {
    icon: IconProp;
    label: string;
    to: string;
};

const visible = ref(false);

const toggleSidebar = () => {
    visible.value = !visible.value;
};

const onToggle = (open: boolean) => {
    visible.value = open;
};

const links = computed<Link[]>(() => [
    { icon: faTachometerAlt, label: 'Dashboard', to: '/' },
    { icon: faFileAlt, label: `${t('sidebar.reports')}`, to: '/reports' },
    { icon: faTable, label: `${t('sidebar.tables')}`, to: '/tables' },
]);
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
