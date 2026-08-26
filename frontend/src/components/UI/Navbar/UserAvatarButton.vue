<template>
    <fwb-tooltip placement="bottom">
        <template #trigger>
            <router-link to="/settings"
                class="flex items-center justify-center w-9 h-9 rounded-lg text-xs font-bold text-gray-600 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
                {{ userInitials || '..' }}
            </router-link>
        </template>
        <template #content>
            <span class="text-sm">{{ userEmail }}</span>
        </template>
    </fwb-tooltip>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { FwbTooltip } from 'flowbite-vue';
import { useUserStore } from '../../../stores/user.store';

const userStore = useUserStore();

const userInitials = computed(() => {
    return userStore.user?.user?.email?.slice(0, 2).toUpperCase();
});

const userEmail = computed(() => {
    return userStore.user?.user?.email;
});

onMounted(() => {
    userStore.fetchUser();
});
</script>
