<template>
    <div class="flex flex-col min-h-full w-full">
        <header class="flex justify-between items-center border-b border-gray-300 pb-4">
            <h1 class="text-2xl font-bold dark:text-white">{{ t('chatbot.title') }}</h1>
        </header>
        <div class="flex-1 justify-start mt-20 w-full mr-6">
            <ChatInterface />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import ChatInterface from '../components/Chatbot/ChatInterface.vue';

const { t } = useI18n();
</script>