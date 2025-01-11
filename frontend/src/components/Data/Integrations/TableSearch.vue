<template>
    <div>
        <InputField v-model="search" @update:value="updateValue">
            <template #prefix>
                <FontAwesomeIcon :icon="faSearch" class="dark:text-white" />
            </template>
        </InputField>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import InputField from '../../UI/Input/InputField.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const emit = defineEmits(['update:value']);
const search = ref('');

const updateValue = (newVal: string) => {
    emit('update:value', newVal);
};
</script>