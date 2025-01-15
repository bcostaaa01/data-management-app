<template>
    <div class="border border-gray-600">
        <div class="border-b border-gray-600">
            <button @click="toggle"
                class="flex items-center justify-between w-full p-4 text-left bg-slate-800 text-white hover:bg-slate-700 transition">
                <span class="flex items-center">
                    {{ t('dashboard.files') }}
                </span>
                <svg :class="{ 'rotate-180': isOpen }" class="w-4 h-4 transition-transform ml-2" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
            </button>
            <div v-if="isOpen" class="bg-gray-800 text-white">
                <div v-if="!props.files.length" class="p-4 text-gray-400">
                    {{ t('dashboard.emptyFolderPlaceholder') }}
                </div>
                <router-link v-for="file in props.files" :to="`/file/${encodeURIComponent(file.id)}`" :key="file.id"
                    class="flex items-center justify-between w-full p-4 text-left bg-slate-800 text-white hover:bg-slate-700 transition">
                    <span class="truncate">{{ file.name }}</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const isOpen = ref(true);

function toggle() {
    isOpen.value = !isOpen.value;
}

const props = defineProps<{
    files: Array<{ id: string; name: string }>;
}>();
</script>
