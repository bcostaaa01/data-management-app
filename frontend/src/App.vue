<template>
  <div class="flex h-full dark:bg-gray-900 bg-gray-100 w-full overflow-auto">
    <div v-if="isAuthenticated" class="flex flex-1">
      <Sidebar class="w-20" />
      <div class="flex flex-col flex-1 h-screen">
        <SmartSearchModal :isOpen="smartSearchStore.isOpen" @close="smartSearchStore.closeModal" />
        <main class="flex-1 p-4">
          <RouterView />
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

    <div v-else class="flex flex-col justify-center items-center h-screen w-full">
      <SignIn />
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
import SignIn from './views/Auth/SignIn.vue';
import { useRouter } from 'vue-router';
import ThemeToggle from './components/ThemeSwitch/ThemeToggle.vue';
import ProjectHealth from './components/SupabaseHealth/ProjectHealth.vue';
import ChatbotLauncher from './components/Chatbot/ChatbotLauncher.vue';

const router = useRouter();

const smartSearchStore = useSmartSearchStore();

const isAuthenticated = ref(false);

onMounted(async () => {
  isAuthenticated.value = (await checkAuth()) !== null;
});

watch(isAuthenticated, (newVal) => {
  if (newVal) {
    router.push("/");
  } else {
    router.push("/signin");
  }
});
</script>
