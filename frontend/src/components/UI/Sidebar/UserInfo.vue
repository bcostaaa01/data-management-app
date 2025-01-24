<template>
    <div class="flex rounded-md p-2 bg-gray-200 dark:bg-gray-700 w-[90%]">
        <div class="flex flex-row items-center">
            <div v-if="!isLoading"
                class="text-sm font-bold rounded-full bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-100 w-8 h-8 flex items-center justify-center">
                {{ userInitials }}</div>
            <span v-else class="text-sm ml-2 animate-pulse">Loading...</span>
            <span class="text-sm ml-2">{{ userEmail }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useUserStore } from '../../../stores/user.store';

const isLoading = ref(true);
const userStore = useUserStore();

const userInitials = computed(() => {
    return userStore.user?.user?.email.split(' ').map((name: string) => name[0] + name[1]).join('').toUpperCase();
});

const userEmail = computed(() => {
    return userStore.user?.user?.email;
});

onMounted(async () => {
    isLoading.value = true;
    await userStore.fetchUser();
    isLoading.value = false;
});
</script>
