<template>
  <div class="flex h-screen">
    <div class="w-1/6">
      <Sidebar />
    </div>
    <div class="w-5/6 flex flex-col">
      <NavBar />
      <main class="flex-1 p-4">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBar from './components/UI/Navigation/NavBar.vue';
import Sidebar from './components/UI/Sidebar/Sidebar.vue';
</script>
