<template>
    <div class="p-4">
        <h1 class="text-2xl font-bold">{{ t('pages.settings') }}</h1>
        <div class="flex flex-col mt-4">
            <h3 class="text-lg font-bold">{{ t('settings.language') }}</h3>
            <LanguageSwitch :languages="languages" :changeLanguage="changeAppLanguage" />
        </div>
    </div>
</template>

<script setup lang="ts">
import LanguageSwitch from '../components/Settings/LanguageSwitch.vue';
import { useI18n } from 'vue-i18n';
import { Language } from '../locales/types';

const { t, locale } = useI18n();

const languages: Language[] = ["de", "en"];

const changeAppLanguage = (lang: Language) => {
    locale.value = lang;
};
</script>
