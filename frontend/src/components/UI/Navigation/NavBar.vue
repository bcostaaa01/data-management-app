<template>
    <div class="mt-4 ml-4 card flex justify-start">
        <Breadcrumb :home="home" :model="items" class="rounded-md">
            <template #item="{ item, index }">
                <router-link :to="item.to"> {{ item.label }} </router-link>
            </template>
        </Breadcrumb>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Breadcrumb from "primevue/breadcrumb";
import { RouterLink } from 'vue-router';

const home = ref({
    icon: 'pi pi-home',
    to: '/',
});

const items = ref([
    { label: 'Home', to: '/', component: RouterLink },
    { label: 'About', to: '/about', component: RouterLink },
    { label: 'Reports', to: '/reports', component: RouterLink },
]);
</script>
