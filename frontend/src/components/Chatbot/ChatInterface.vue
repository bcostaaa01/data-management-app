<template>
    <div class="bg-gray-200 dark:bg-gray-800 p-10 h-full">
        <h1 class="text-2xl font-bold dark:text-white text-center">{{ t('chatbot.welcomeMessage') }}</h1>
        <div class="text-md text-gray-500 dark:text-gray-300 text-center m-5">{{ t('chatbot.welcomeMessageSubtitle') }}
        </div>
        <div class="grid grid-cols-2 gap-2 mt-10 w-[calc(600px)] mx-auto">
            <ChatbotSuggestedCard v-for="(card, index) in suggestedCards" :key="index" :title="card.title"
                :icon="card.icon" ref="suggestedCardsRef" @click="handleSuggestedCardClick(card)" />
        </div>
        <ChatMessage v-for="(msg, index) in messages" :key="index" :message="msg.text" :isUser="msg.isUser" />
        <div v-if="isLoading" class="flex justify-center mt-4">
            <FontAwesomeIcon :icon="faEllipsis" class="text-gray-500 dark:text-gray-300 animate-pulse" />
        </div>
        <fwb-input v-model="userInput" @keyup.enter="sendMessage" class="mt-4"
            :placeholder="t('chatbot.placeholder')" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ChatMessage from './ChatMessage.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEllipsis, faCopy, faImage, faUser, faCode } from '@fortawesome/free-solid-svg-icons';
import { FwbInput } from 'flowbite-vue';
import ChatbotSuggestedCard from './ChatbotSuggestedCard.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const messages = ref([]);

const userInput = ref('');
const isLoading = ref(false);
const suggestedCardsRef = ref(null);

const suggestedCards = ref([
    { title: "Write copy", icon: faCopy },
    { title: "Image generation", icon: faImage },
    { title: "Create avatar", icon: faUser },
    { title: "Write code", icon: faCode },
]);

const sendMessage = () => {
    if (userInput.value.trim() && !isLoading.value) {
        messages.value.push({ text: userInput.value, isUser: true });
        isLoading.value = true;

        setTimeout(() => {
            messages.value.push({ text: "This is a response from the bot.", isUser: false });
            userInput.value = '';
            isLoading.value = false;
        }, 2000);
    }
};

const handleSuggestedCardClick = (card: any) => {
    userInput.value = card.title;
    sendMessage();
};
</script>