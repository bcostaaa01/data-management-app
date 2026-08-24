<template>
    <Teleport to="body">
        <Transition name="search-backdrop">
            <div v-if="smartSearchStore.isOpen" class="fixed inset-0 z-50 bg-gray-900/60 backdrop-blur-sm" />
        </Transition>
        <Transition name="search-panel">
            <div v-if="smartSearchStore.isOpen" class="fixed inset-0 z-50 flex items-center justify-center px-4"
                @keydown="onKeydown" @click="closeModal">
                <div role="dialog" aria-modal="true" :aria-label="t('smartSearch.title')" @click.stop
                    class="relative w-full max-w-xl h-fit rounded-2xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl overflow-hidden shadow-[0_0_0_1px_rgba(59,130,246,0.25),0_8px_40px_-4px_rgba(59,130,246,0.35)] dark:shadow-[0_0_0_1px_rgba(96,165,250,0.3),0_8px_50px_-6px_rgba(96,165,250,0.45)]">
                    <div class="flex items-center gap-3 px-4 py-3 border-b border-gray-200/70 dark:border-gray-700/70">
                        <FontAwesomeIcon :icon="faSearch" class="h-4 w-4 text-gray-400 shrink-0" />
                        <input ref="inputRef" v-model="query" :placeholder="t('smartSearch.placeholder')"
                            class="flex-1 bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none" />
                        <kbd
                            class="hidden sm:inline-flex items-center justify-center h-5 px-1.5 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-[10px] font-medium text-gray-500 dark:text-gray-400">
                            esc
                        </kbd>
                    </div>

                    <div class="max-h-80 overflow-y-auto py-2">
                        <template v-if="results.length">
                            <router-link v-for="(result, index) in results" :key="result.id"
                                :to="`/file/${result.id}`"
                                class="flex items-center gap-3 mx-2 px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors duration-150"
                                :class="index === activeIndex ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'"
                                @mouseenter="activeIndex = index" @click="closeModal">
                                <FontAwesomeIcon :icon="faFilePdf" class="h-4 w-4 text-gray-400 shrink-0" />
                                <span class="truncate text-gray-700 dark:text-gray-100">{{ result.name }}</span>
                            </router-link>
                        </template>
                        <div v-else class="py-10 text-center text-sm text-gray-400">
                            {{ query ? t('smartSearch.noResultsFor', { query }) : t('smartSearch.noFiles') }}
                        </div>
                    </div>

                    <div
                        class="flex items-center gap-4 px-4 py-2 border-t border-gray-200/70 dark:border-gray-700/70 text-[11px] text-gray-400">
                        <span class="flex items-center gap-1">
                            <kbd
                                class="inline-flex items-center justify-center h-4 min-w-[1rem] px-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">↑</kbd>
                            <kbd
                                class="inline-flex items-center justify-center h-4 min-w-[1rem] px-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">↓</kbd>
                            {{ t('smartSearch.navigateHint') }}
                        </span>
                        <span class="flex items-center gap-1">
                            <kbd
                                class="inline-flex items-center justify-center h-4 min-w-[1rem] px-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">↵</kbd>
                            {{ t('smartSearch.openHint') }}
                        </span>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useGetFilesFromBucket } from '../../composables/useGetFiles';
import { useSmartSearchStore } from '../../stores/smart-search.store';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSearch, faFilePdf } from '@fortawesome/free-solid-svg-icons';

const { t } = useI18n();
const smartSearchStore = useSmartSearchStore();
const router = useRouter();
const { files, getFiles } = useGetFilesFromBucket();

const query = ref('');
const activeIndex = ref(0);
const inputRef = ref<HTMLInputElement | null>(null);

const results = computed(() => {
    const q = query.value.trim().toLowerCase();
    if (!q) return files.value;
    return files.value.filter(file => file.name.toLowerCase().includes(q));
});

const closeModal = () => {
    smartSearchStore.closeModal();
};

const selectResult = (index: number) => {
    const result = results.value[index];
    if (!result) return;
    router.push(`/file/${result.id}`);
    closeModal();
};

const onKeydown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
        event.preventDefault();
        activeIndex.value = Math.min(activeIndex.value + 1, results.value.length - 1);
    } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        activeIndex.value = Math.max(activeIndex.value - 1, 0);
    } else if (event.key === 'Enter') {
        event.preventDefault();
        selectResult(activeIndex.value);
    }
};

watch(results, () => {
    activeIndex.value = 0;
});

watch(() => smartSearchStore.isOpen, async (isOpen) => {
    if (isOpen) {
        query.value = '';
        activeIndex.value = 0;
        document.body.style.overflow = 'hidden';
        await getFiles();
        await nextTick();
        inputRef.value?.focus();
    } else {
        document.body.style.overflow = '';
    }
});

const handleGlobalKeydown = (event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (smartSearchStore.isOpen) {
            closeModal();
        } else {
            smartSearchStore.openModal();
        }
        return;
    }

    if (event.key === 'Escape' && smartSearchStore.isOpen) {
        closeModal();
    }
};

onMounted(() => {
    window.addEventListener('keydown', handleGlobalKeydown);
});

onUnmounted(() => {
    window.removeEventListener('keydown', handleGlobalKeydown);
    document.body.style.overflow = '';
});
</script>

<style scoped>
.search-backdrop-enter-active,
.search-backdrop-leave-active {
    transition: opacity 0.15s ease;
}

.search-backdrop-enter-from,
.search-backdrop-leave-to {
    opacity: 0;
}

.search-panel-enter-active {
    transition: opacity 0.15s ease, transform 0.15s ease;
}

.search-panel-leave-active {
    transition: opacity 0.1s ease, transform 0.1s ease;
}

.search-panel-enter-from,
.search-panel-leave-to {
    opacity: 0;
    transform: translateY(-8px) scale(0.98);
}
</style>
