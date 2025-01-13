<template>
    <fwb-card class="flex flex-col p-12">
        <div v-if="!isMagicLinkRequested">
            <h1 class="text-2xl font-bold mb-10">{{ t('auth.signIn') }}</h1>
            <form @submit.prevent="handleSignIn">
                <div class="mb-4">
                    <label for="email"
                        class="block text-sm font-medium text-gray-700 mb-2 dark:text-white">Email</label>
                    <input v-model="email" type="email" id="email" required
                        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
                <button type="submit" :disabled="isLoading"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <span v-if="isLoading">
                        <FontAwesomeIcon :icon="faSpinner" class="animate-spin" />
                    </span>
                    <span v-else>
                        {{ t('auth.signInWithMagicLink') }}
                    </span>
                </button>
            </form>
        </div>

        <div v-if="isMagicLinkRequested" class="text-center text-white py-8 text-sm flex flex-col items-center">
            <FontAwesomeIcon :icon="faEnvelope" class="h-12 w-12 text-white mb-4" />
            <h1 class="text-2xl font-bold mb-4">Magic Link sent to your email.</h1>
            <p class="text-sm text-gray-400">Open your email and click the link to sign in.</p>
        </div>
    </fwb-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { signIn } from '../../supabase/auth';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEnvelope, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useI18n } from 'vue-i18n';
import { FwbCard } from "flowbite-vue";

const { t } = useI18n();

const email = ref('');
const isMagicLinkRequested = ref(false);
const isLoading = ref(false);

const toggleMagicLinkRequested = () => {
    isMagicLinkRequested.value = true;
};

const handleSignIn = async () => {
    isLoading.value = true;
    toggleMagicLinkRequested();
    await signIn(email.value);
    isLoading.value = false;
};
</script>
