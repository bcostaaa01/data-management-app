<template>
    <div class="relative z-50">
        <div
            class="fixed inset-y-0 top-0 left-0 z-40 h-screen w-16 flex flex-col items-center bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-100">
            <button @click="toggleSidebar" :aria-label="visible ? t('sidebar.collapse') : t('sidebar.expand')"
                class="mt-4 hover:bg-gray-400 hover:text-white rounded-md p-2 transition-colors duration-200 dark:hover:bg-gray-700">
                <FontAwesomeIcon :icon="visible ? faTimes : faBars" class="w-5 h-5" />
            </button>

            <nav class="flex flex-col items-center gap-1 mt-4">
                <router-link v-for="link in links" :key="link.to" :to="link.to"
                    class="flex items-center justify-center w-10 h-10 rounded-lg transition-colors duration-200"
                    :class="route.path === link.to
                        ? 'bg-blue-500 text-white'
                        : 'hover:bg-gray-300 dark:hover:bg-gray-700'" :title="link.label" :aria-label="link.label">
                    <FontAwesomeIcon :icon="link.icon" class="w-4 h-4" />
                </router-link>
            </nav>
        </div>

        <Transition name="fade">
            <div v-if="visible" class="fixed inset-0 z-30 bg-black/30" @click="visible = false" />
        </Transition>

        <Transition mode="out-in" appear name="slide">
            <aside v-if="visible" id="default-sidebar" class="fixed top-0 left-16 z-40 h-screen w-64 border-r dark:border-gray-700"
                aria-label="Sidebar">
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
                    <SidebarLink :icon="faSignOutAlt" :label="t('sidebar.signOut')" @click="signOut(router)" />
                    <div class="absolute bottom-3 w-full">
                        <UserInfo />
                    </div>
                </div>
            </aside>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
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
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const { visible, toggleSidebar } = useSidebar();

const { t } = useI18n();

const links = useSidebarLinks(t);

const onToggle = (open: boolean) => {
    visible.value = open;
};

const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && visible.value) {
        visible.value = false;
    }
};

onMounted(() => window.addEventListener('keydown', handleKeydown));
onUnmounted(() => window.removeEventListener('keydown', handleKeydown));
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

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
