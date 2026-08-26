<template>
    <fwb-tooltip placement="bottom">
        <template #trigger>
            <div class="flex items-center justify-center w-9 h-9 rounded-lg text-gray-500 dark:text-gray-300">
                <FontAwesomeIcon v-if="isLoading" :icon="faCircleNotch" class="w-4 h-4 animate-spin" />
                <FontAwesomeIcon v-else-if="healthInfo.healthy" :icon="faCheckCircle" class="w-4 h-4 text-green-500" />
                <FontAwesomeIcon v-else :icon="faTimesCircle" class="w-4 h-4 text-red-500" />
            </div>
        </template>
        <template #content>
            <span class="text-sm">
                {{ t('supabaseHealth.projectHealth') }}:
                {{ isLoading ? t('supabaseHealth.loading') : healthInfo.healthy ? t('supabaseHealth.healthy') : t('supabaseHealth.unhealthy') }}
            </span>
        </template>
    </fwb-tooltip>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useGetSupabaseHealth } from "../../composables/useSupabase";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCheckCircle, faTimesCircle, faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FwbTooltip } from "flowbite-vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const healthInfo = ref({ healthy: false });
const isLoading = ref(false);

onMounted(async () => {
    isLoading.value = true;
    healthInfo.value = await useGetSupabaseHealth();
    isLoading.value = false;
});
</script>
