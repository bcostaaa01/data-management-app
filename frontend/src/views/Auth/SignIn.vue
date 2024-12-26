<template>
    <div class="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 class="text-2xl font-bold mb-4">Sign In with</h1>
        <form @submit.prevent="handleSignIn">
            <div class="mb-4">
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2 dark:text-white">Email</label>
                <input v-model="email" type="email" id="email" required
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
            <button type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Sign In with Magic Link
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { signIn } from '../../supabase/auth';

const email = ref('');

const handleSignIn = async () => {
    await signIn(email.value);
};
</script>
