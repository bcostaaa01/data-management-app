<template>
  <div class="flex h-screen dark:bg-gray-900">
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
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import Sidebar from './components/UI/Sidebar/Sidebar.vue';
import RefreshServiceWorker from './components/ServiceWorker/RefreshServiceWorker.vue';
import SmartSearchModal from './components/SmartSearch/SmartSearchModal.vue';
import { useSmartSearchStore } from './stores/smart-search.store';

const smartSearchStore = useSmartSearchStore();
</script>
