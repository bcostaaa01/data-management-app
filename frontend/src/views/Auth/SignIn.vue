<template>
    <div class="flex flex-col items-center justify-center min-h-screen py-2">
        <div v-if="!isMagicLinkRequested">
            <h1 class="text-2xl font-bold mb-4 text-center">Sign In</h1>
            <form @submit.prevent="handleSignIn">
                <div class="mb-4">
                    <label for="email"
                        class="block text-sm font-medium text-gray-700 mb-2 dark:text-white">Email</label>
                    <input v-model="email" type="email" id="email" required
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
                <button type="submit"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Sign In with Magic Link
                </button>
            </form>
        </div>

        <div v-if="isMagicLinkRequested" class="text-center text-white py-8 text-sm flex flex-col items-center">
            <FontAwesomeIcon :icon="faEnvelope" class="h-12 w-12 text-white" />
            <h1 class="text-2xl font-bold mb-4">Magic Link sent to your email.</h1>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { signIn } from '../../supabase/auth';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const email = ref('');

const isMagicLinkRequested = ref(false);

const toggleMagicLinkRequested = () => {
    isMagicLinkRequested.value = true;
};

const handleSignIn = async () => {
    toggleMagicLinkRequested();
    await signIn(email.value);
};
</script>
