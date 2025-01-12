<template>
    <div class="rounded-md bg-gray-200 dark:bg-gray-800">
        <h1 class="text-sm mx-2 font-bold">Project Health</h1>
        <div class="text-xs mx-2">
            <span v-if="isLoading">Loading...</span>
            <span v-else-if="healthInfo.healthy">
                <FontAwesomeIcon :icon="faCheckCircle" style="color: green;" />
                Healthy
            </span>
            <span v-else>
                <FontAwesomeIcon :icon="faTimesCircle" style="color: red;" />
                Unhealthy
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useGetSupabaseHealth } from "../../composables/useSupabase";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const healthInfo = ref({ healthy: false });
const isLoading = ref(false);

onMounted(async () => {
    isLoading.value = true;
    const response = await useGetSupabaseHealth();
    healthInfo.value = response.data[0];
    isLoading.value = false;
});
</script>
