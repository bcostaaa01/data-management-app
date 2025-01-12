<template>
    <fwb-tooltip placement="top-end" trigger="hover" content-class="mr-10">
        <template #trigger>
            <button
                class="rounded-md bg-gray-300 dark:bg-gray-700 p-3 transition-all duration-300 hover:scale-110 hover:rotate-12"
                @click="toggleChatbot">
                <FontAwesomeIcon :icon="faRobot" class="h-6 w-6" />
            </button>
        </template>

        <template #content>
            <div class="text-sm">
                {{ t('chatbot.tooltip') }}
            </div>
        </template>
    </fwb-tooltip>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { FwbTooltip } from "flowbite-vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const { t } = useI18n();

const isOpen = ref(false);

const toggleChatbot = () => {
    isOpen.value = !isOpen.value;
    router.push('/chatbot');
};
</script>
