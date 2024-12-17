<template>
    <div class="mt-4 ml-4 card flex justify-start">
        <Breadcrumb :home="home" :model="items" class="rounded-md" />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Breadcrumb from "primevue/breadcrumb";

const home = ref({
    icon: 'pi pi-home'
});
const items = ref([
    { label: 'Reports' },
    { label: '2024' },
]);
</script>
