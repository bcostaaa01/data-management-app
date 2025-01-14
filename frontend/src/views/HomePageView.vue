<template>
    <div class="flex flex-col items-center justify-center min-h-[calc(100vh-2rem)]">
        <div class="flex flex-row gap-4 flex-wrap justify-center max-w-6xl">
            <RouteCard v-for="card in cards" :key="card.title" :icon="card.icon" :title="card.title"
                :description="card.description" :to="card.to" class="max-w-xs" />
        </div>
    </div>
</template>

<script setup lang="ts">
import RouteCard from '@/components/HomePage/RouteCard.vue';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const cards = [
    { icon: 'faTachometerAlt', title: t('homePage.dashboards'), description: t('homePage.dashboardsDescription'), to: '/dashboard' },
    { icon: 'faUpload', title: t('homePage.dataImport'), description: t('homePage.dataImportDescription'), to: '/data-import' },
    { icon: 'faChartBar', title: t('homePage.reports'), description: t('homePage.reportsDescription'), to: '/reports' },
    { icon: 'faTable', title: t('homePage.tables'), description: t('homePage.tablesDescription'), to: '/tables' },
    { icon: 'faRobot', title: t('homePage.chatbot'), description: t('homePage.chatbotDescription'), to: '/chatbot' },
];

defineProps<{
    icon: IconProp;
    title: string;
    description: string;
}>();
</script>
