<template>
    <div class="flex flex-row items-center">
        <InputField v-model="tableName" class="mr-4" @update:value="updateSelectedTable">
            <template #prefix>
                <FontAwesomeIcon :icon="faTable" />
                <span class="ml-4">Table</span>
            </template>
        </InputField>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import InputField from '../../UI/Input/InputField.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import { defineEmits } from 'vue';

const tableName = ref('');

const emit = defineEmits(['update:value']);

const updateSelectedTable = (newVal: string) => {
    console.log("New value from InputField:", newVal);
    emit('update:value', newVal);
};

watch(tableName, (newVal) => {
    tableName.value = newVal;
});
</script>