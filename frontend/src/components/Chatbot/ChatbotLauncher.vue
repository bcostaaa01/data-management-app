<template>
    <button
        class="rounded-md bg-gray-200 dark:bg-gray-800 p-3 transition-all duration-300 hover:scale-110 hover:rotate-12"
        @click="toggleChatbot">
        <FontAwesomeIcon :icon="faRobot" class="h-6 w-6" />
    </button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'vue-router';

const router = useRouter();

const isOpen = ref(false);

const toggleChatbot = () => {
    isOpen.value = !isOpen.value;
    router.push('/chatbot');
};
</script>
