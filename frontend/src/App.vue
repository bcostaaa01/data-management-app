<template>
  <div class="flex h-screen dark:bg-gray-900">
    <div v-if="isAuthenticated">
      <div>
        <Sidebar />
        <SmartSearchModal :isOpen="smartSearchStore.isOpen" @close="smartSearchStore.closeModal" />
      </div>
      <div class="flex flex-col ml-16">
        <main class="flex-1 p-4">
          <RouterView />
          <div class="fixed top-0 right-0 p-4">
            <RefreshServiceWorker />
          </div>
        </main>
      </div>
    </div>
    
    <div v-else class="flex flex-col ml-16 justify-center items-center h-screen w-full">
      <SignIn />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterView } from 'vue-router';
import Sidebar from './components/UI/Sidebar/Sidebar.vue';
import RefreshServiceWorker from './components/ServiceWorker/RefreshServiceWorker.vue';
import SmartSearchModal from './components/SmartSearch/SmartSearchModal.vue';
import { useSmartSearchStore } from './stores/smart-search.store';
import { checkAuth } from './supabase/auth';
import SignIn from './views/Auth/SignIn.vue';
const smartSearchStore = useSmartSearchStore();

const isAuthenticated = ref(false);

onMounted(async () => {
  isAuthenticated.value = (await checkAuth()) !== null;
});
</script>
