<template>
    <fwb-card class="flex flex-col p-12">
        <div v-if="!isMagicLinkRequested">
            <h1 class="text-2xl font-bold mb-10">{{ t(isSignUp ? 'auth.signUp' : 'auth.signIn') }}</h1>
            <form @submit.prevent="isSignUp ? handleSignUp() : handleSignIn()">
                <div class="mb-4">
                    <label for="email"
                        class="block text-sm font-medium text-gray-300 mb-2 dark:text-white">Email</label>
                    <input v-model="email" type="email" id="email" required
                        class="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>

                <div v-if="isSignUp" class="mb-4">
                    <label for="password"
                        class="block text-sm font-medium text-gray-300 mb-2 dark:text-white">Password</label>
                    <input v-model="password" type="password" id="password" required
                        class="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />

                    <div class="mb-4">
                        <label for="firstName"
                            class="block text-sm font-medium text-gray-300 mb-2 dark:text-white">First
                            Name</label>
                        <input v-model="firstName" type="text" id="firstName" required
                            class="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                    <div class="mb-4">
                        <label for="lastName" class="block text-sm font-medium text-gray-300 mb-2 dark:text-white">Last
                            Name</label>
                        <input v-model="lastName" type="text" id="lastName" required
                            class="mt-1 block w-full px-3 py-2 border border-gray-600 bg-gray-800 text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                </div>

                <button type="submit" :disabled="isLoading"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <span v-if="isLoading">
                        <FontAwesomeIcon :icon="faSpinner" class="animate-spin" />
                    </span>
                    <span v-else>
                        {{ t(isSignUp ? 'auth.signUp' : 'auth.signInWithMagicLink') }}
                    </span>
                </button>
                <button type="button" @click="toggleSignUp" class="mt-4 text-sm text-blue-500">
                    {{ t(isSignUp ? 'auth.switchToSignIn' : 'auth.switchToSignUp') }}
                </button>
            </form>
        </div>

        <div v-if="isMagicLinkRequested" class="text-center text-white py-8 text-sm flex flex-col items-center">
            <FontAwesomeIcon :icon="faEnvelope" class="h-12 w-12 text-white mb-4" />
            <h1 class="text-2xl font-bold mb-4">{{ t('auth.magicLinkSent') }}</h1>
            <p class="text-sm text-gray-400">{{ t('auth.magicLinkSentInfo') }}</p>
        </div>
    </fwb-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { signIn, signUp } from '../../supabase/auth';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEnvelope, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useI18n } from 'vue-i18n';
import { FwbCard } from "flowbite-vue";

const { t } = useI18n();

const email = ref('');
const password = ref('');
const firstName = ref('');
const lastName = ref('');
const isMagicLinkRequested = ref(false);
const isLoading = ref(false);
const isSignUp = ref(true);

const toggleMagicLinkRequested = () => {
    isMagicLinkRequested.value = true;
};

const handleSignIn = async () => {
    console.log("Attempting to sign in with email:", email.value);
    isLoading.value = true;
    toggleMagicLinkRequested();
    await signIn(email.value);
    isLoading.value = false;
};

const handleSignUp = async () => {
    console.log("Attempting to sign up with email:", email.value, firstName.value, lastName.value);
    isLoading.value = true;
    await signUp(email.value, password.value, firstName.value, lastName.value);
    await signIn(email.value);
    toggleMagicLinkRequested();
    isLoading.value = false;
};

const toggleSignUp = () => {
    isSignUp.value = !isSignUp.value;
};
</script>
