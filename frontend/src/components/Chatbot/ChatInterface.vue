<template>
    <div class="bg-gray-200 dark:bg-gray-800 p-10 h-full">
        <h1 class="text-2xl font-bold dark:text-white text-center">{{ t('chatbot.welcomeMessage') }}</h1>
        <div class="text-md text-gray-500 dark:text-gray-300 text-center m-5">{{ t('chatbot.welcomeMessageSubtitle') }}
        </div>
        <div class="grid grid-cols-3 gap-4 mt-10 w-[calc(600px)] mx-auto">
            <ChatbotSuggestedCard v-for="(card, index) in suggestedCards" :key="index" :title="card.title"
                :icon="card.icon" ref="suggestedCardsRef" @click="handleSuggestedCardClick(card)" />
        </div>
        <ChatMessage v-for="(msg, index) in messages" :key="index" :message="msg.text" :isUser="msg.isUser" />
        <div v-if="isLoading" class="flex justify-center mt-4">
            <FontAwesomeIcon :icon="faEllipsis" class="text-gray-500 dark:text-gray-300 animate-pulse" />
        </div>
        <div class="mt-4">
            <fwb-input v-model="userInput" @keyup.enter="sendMessage" class=""
                :placeholder="t('chatbot.placeholder')" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ChatMessage from './ChatMessage.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEllipsis, faCopy, faDatabase, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { FwbInput } from 'flowbite-vue';
import ChatbotSuggestedCard from './ChatbotSuggestedCard.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const messages = ref([]);

const userInput = ref('');
const isLoading = ref(false);
const suggestedCardsRef = ref(null);

const suggestedCards = ref([
    { title: "List down the files available in the Supabase storage", icon: faCopy },
    { title: "Generate SQL query to get the data from the sales table", icon: faDatabase },
    { title: "Generate a report on the sales data", icon: faFileExcel },
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