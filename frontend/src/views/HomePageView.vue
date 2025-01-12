<template>
    <div class="flex flex-row gap-4 w-full justify-center items-center min-h-full">
        <RouteCard v-for="card in cards" :key="card.title" :icon="card.icon" :title="card.title"
            :description="card.description" :to="card.to" />
    </div>
</template>

<script setup lang="ts">
import RouteCard from '@/components/HomePage/RouteCard.vue';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const cards = [
    { icon: 'faTachometerAlt', title: 'Dashboards', description: 'View reports', to: '/dashboard' },
    { icon: 'faUpload', title: 'Data Import', description: 'Import data from a file', to: '/data-import' },
    { icon: 'faChartBar', title: 'Reports', description: 'View reports', to: '/reports' },
    { icon: 'faTable', title: 'Tables', description: 'View tables', to: '/tables' },
    { icon: 'faRobot', title: 'Chatbot', description: 'Chat with your data', to: '/chatbot' },
];

defineProps<{
    icon: IconProp;
    title: string;
    description: string;
}>();
</script>
