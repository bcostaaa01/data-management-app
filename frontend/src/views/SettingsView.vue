<template>
    <header class="flex justify-between items-center border-b border-gray-300 pb-4">
        <h1 class="text-2xl font-bold dark:text-white">{{ t('pages.settings') }}</h1>
    </header>

    <div class="flex flex-col mt-4 rounded-lg p-4 border border-gray-300">
        <h3 class="text-lg font-bold">{{ t('settings.language') }}</h3>
        <LanguageSwitch :languages="languages" :changeLanguage="changeAppLanguage" ref="languageSwitch" />

        <h3 class="text-lg font-bold">Name</h3>
        {{ userDetails }}
        <input type="text" class="w-full p-2 border border-gray-300 rounded-lg" v-model="userSettings.name" />

        <div class="flex flex-row mt-4">
            <fwb-button @click="updateUserSettings" class="w-52">{{ t('settings.updateUserSettings')
                }}</fwb-button>
            <FontAwesomeIcon v-if="isLoading" :icon="faSpinner" class="text-green-500 ml-8 mt-1 animate-spin" />
            <FontAwesomeIcon v-else-if="settingsUpdated" :icon="faCheck" class="text-green-500 ml-8 mt-2" />
            <span v-if="settingsUpdated" class="text-green-500 font-bold flex justify-center ml-4 mt-1">{{
                t('settings.settingsUpdated') }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import LanguageSwitch from '../components/Settings/LanguageSwitch.vue';
import { useI18n } from 'vue-i18n';
import { Language } from '../locales/types';
import { useUserStore } from '../stores/user.store';
import { FwbButton } from 'flowbite-vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';

const userStore = useUserStore();
const userDetails = ref('');
const userSettings = ref({
    language: localStorage.getItem("settings.language") || "de",
    name: '',
});
const languageSwitch = ref(null);
const isLoading = ref(false);
const settingsUpdated = ref(false);

const { t, locale } = useI18n();

const languages: Language[] = ["de", "en"];
const language = ref(localStorage.getItem("settings.language") || "de");

const changeAppLanguage = (lang: Language) => {
    locale.value = lang;
    language.value = lang;
    localStorage.setItem("settings.language", lang);
};

const updateUserSettings = async () => {
    isLoading.value = true;
    await userStore.updateUserSettings({ settings: { language: language.value } });
    settingsUpdated.value = true;
    setTimeout(() => {
        settingsUpdated.value = false;
    }, 3000);
    isLoading.value = false;
};

onMounted(async () => {
    userDetails.value = await userStore.fetchUser();
    userSettings.value = await userStore.getUserSettings();
});
</script>
