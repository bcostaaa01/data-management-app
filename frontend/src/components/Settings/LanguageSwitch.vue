<template>
    <div class="flex space-x-10 p-2">
        <div v-for="language in languages" :key="language">
            <img :src="languageIcons[language as Language]" class="w-10 h-10 cursor-pointer"
                @click="changeLanguage(language)" />
        </div>
    </div>
</template>

<script setup lang="ts">
import deIcon from "../../assets/de.svg";
import enIcon from "../../assets/en.svg";
import { Language } from "../../locales/types";

const languageIcons: Record<Language, string> = {
    de: deIcon,
    en: enIcon,
};

interface Props {
    languages: Language[];
    changeLanguage: (lang: Language) => void;
}

defineProps<Props>();
</script>
