<template>
    <div class="w-full">
        <fwb-input placeholder="Table Name" v-model="value">
            <template #prefix>
                <slot name="prefix" />
            </template>
        </fwb-input>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { FwbInput } from 'flowbite-vue';

const emit = defineEmits(['update:value']);
const value = ref('');

watch(value, (newVal) => {
    emit('update:value', newVal);
});
</script>
