<template>
    <div class="p-4">
        <h1 class="text-2xl font-bold">Settings</h1>
        <div class="flex flex-col mt-4">
            <h3 class="text-lg font-bold">Language</h3>
            <LanguageSwitch :languages="['de', 'en']" :changeLanguage="changeAppLanguage" />
        </div>
    </div>
</template>

<script setup lang="ts">
import LanguageSwitch from '../components/Settings/LanguageSwitch.vue';
import i18n from '../i18n/config';

const changeAppLanguage = (lang: "de" | "en") => {
    i18n.global.locale = lang;
};
</script>
