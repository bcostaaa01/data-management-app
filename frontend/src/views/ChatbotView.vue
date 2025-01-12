<template>
    <div class="flex justify-center min-h-full w-full">
        <h1 class="text-3xl font-bold dark:text-white">{{ t('chatbot.title') }}</h1>
        <div class="flex-1 justify-start mt-20 w-full ml-[-140px] mr-6">
            <ChatInterface />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import ChatInterface from '../components/Chatbot/ChatInterface.vue';

const { t } = useI18n();
</script>