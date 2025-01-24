<template>
    <div class="flex rounded-md p-2 bg-gray-200 dark:bg-gray-700 w-[90%]">
        <div class="flex flex-row items-center">
            <div
                class="text-sm font-bold rounded-full bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-100 w-8 h-8 flex items-center justify-center">
                {{ userInitials }}</div>
            <span class="text-sm ml-2">{{ userEmail }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useUserStore } from '../../../stores/user.store';

const userStore = useUserStore();

const userInitials = computed(() => {
    return userStore.user?.user?.user_metadata?.display_name.split(' ').map((name: string) => name[0]).join('');
});

const userEmail = computed(() => {
    return userStore.user?.user?.user_metadata?.email;
});

onMounted(() => {
    userStore.fetchUser();
});
</script>
