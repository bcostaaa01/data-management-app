<template>
    <div v-if="needRefresh">
        {{ newToast('New version available. Click to update.') }}
        <FontAwesomeIcon :icon="faArrowsRotate" @click="updateButton" class="text-blue-500 cursor-pointer" />
    </div>
</template>

<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue';
import { toast } from 'vue3-toastify';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const { needRefresh, updateServiceWorker } = useRegisterSW();

const newToast = (message: string) => {
    toast(message, {
        "theme": "auto",
        "type": "success",
        "dangerouslyHTMLString": true,
        "position": "top-right",
    })
};

const updateButton = () => {
    updateServiceWorker();
    window.location.reload();
};
</script>