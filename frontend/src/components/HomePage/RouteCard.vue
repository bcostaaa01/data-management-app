<template>
    <fwb-card class="p-8 m-4 flex flex-row items-center transition-all duration-300 hover:scale-105 cursor-pointer bg-gray-100 dark:bg-gray-900"
        @click="handleClick">
        <fwb-card-body class="flex flex-col">
            <div class="flex items-center">
                <FontAwesomeIcon :icon="icon" class="w-8 h-8 mr-6 text-gray-500 dark:text-gray-100" />
                <div class="flex flex-col">
                    <h5 class="text-xl font-bold text-gray-500 dark:text-gray-100">{{ title }}</h5>
                    <p class="text-sm text-gray-500 dark:text-gray-100">{{ description }}</p>
                </div>
            </div>
            <div class="flex items-center mt-4">
                <span class="text-gray-500 mr-2 dark:text-gray-100">Go to</span>
                <FontAwesomeIcon :icon="faArrowRight" class="w-4 h-4 ml-12 dark:text-gray-100" />
            </div>
        </fwb-card-body>
    </fwb-card>
</template>

<script setup lang="ts">
import { FwbCard } from "flowbite-vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const props = defineProps<{
    icon: string;
    title: string;
    description: string;
    to: string;
}>();

const router = useRouter();

const icon = ref<IconProp | null>(null);

onMounted(async () => {
    try {
        const { [props.icon]: importedIcon } = await import(`@fortawesome/free-solid-svg-icons`);
        icon.value = importedIcon;
    } catch (error) {
        console.error("Error loading icon:", error);
    }
});

const handleClick = () => {
    router.push(props.to);
};
</script>