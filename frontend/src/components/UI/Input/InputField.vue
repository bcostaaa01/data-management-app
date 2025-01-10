<template>
    <div class="w-full">
        <fwb-input placeholder="Table Name" v-model="value" @update:modelValue="updateValue" />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { FwbInput } from 'flowbite-vue';

const emit = defineEmits(['update:value']);
const value = ref('');

const updateValue = (newVal: string) => {
    console.log(newVal);
    emit('update:value', newVal);
};
</script>
