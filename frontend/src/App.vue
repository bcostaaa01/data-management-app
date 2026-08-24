<template>
  <div class="flex h-full dark:bg-gray-900 bg-gray-100 overflow-hidden">
    <div v-if="isLoading" class="flex justify-center items-center h-screen w-full">
      <FontAwesomeIcon :icon="faSpinner" class="animate-spin text-6xl" />
    </div>

    <div v-else-if="isAuthenticated && isProjectOnline" class="flex flex-1">
      <Sidebar />
      <div class="flex flex-col flex-1 h-screen">
        <SmartSearchModal :isOpen="smartSearchStore.isOpen" @close="smartSearchStore.closeModal" />
        <main class="flex-1 p-4">
          <AppBody>
            <RouterView />
          </AppBody>
          <div class="fixed top-0 right-0 p-4 flex flex-row gap-2">
            <ProjectHealth />
            <ThemeToggle />
            <RefreshServiceWorker />
          </div>
          <div class="fixed bottom-0 right-0 p-4 flex flex-row gap-2">
            <ChatbotLauncher />
          </div>
        </main>
      </div>
    </div>

    <div v-else-if="!isAuthenticated && isProjectOnline"
      class="flex flex-col justify-center items-center h-screen w-full">
      <OAuth />
    </div>

    <div v-else-if="isProjectOnline" class="flex flex-col justify-center items-center h-screen w-full">
      <FontAwesomeIcon :icon="faExclamationTriangle" class="text-6xl mb-4" />
      <h1 class="text-2xl font-bold">{{ t('projectOffline') }}</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { RouterView } from 'vue-router';
import Sidebar from './components/UI/Sidebar/Sidebar.vue';
import RefreshServiceWorker from './components/ServiceWorker/RefreshServiceWorker.vue';
import SmartSearchModal from './components/SmartSearch/SmartSearchModal.vue';
import { useSmartSearchStore } from './stores/smart-search.store';
import { checkAuth } from './supabase/auth';
import OAuth from './views/Auth/OAuth.vue';
import { useRouter } from 'vue-router';
import ThemeToggle from './components/ThemeSwitch/ThemeToggle.vue';
import ProjectHealth from './components/SupabaseHealth/ProjectHealth.vue';
import ChatbotLauncher from './components/Chatbot/ChatbotLauncher.vue';
import AppBody from './components/Layout/AppBody.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSpinner, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { useGetSupabaseHealth } from './composables/useSupabase';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const router = useRouter();

const smartSearchStore = useSmartSearchStore();

const isLoading = ref(true);
const isAuthenticated = ref(false);
const isProjectOnline = ref(false);

onMounted(async () => {
  isAuthenticated.value = await checkAuth(router);
  isProjectOnline.value = (await useGetSupabaseHealth()).healthy;
  isLoading.value = false;
});

watch(isAuthenticated, (newVal) => {
  if (newVal) {
    router.push("/");
  } else {
    router.push("/signin");
  }
});
</script>
