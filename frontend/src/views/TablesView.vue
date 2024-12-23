<template>
    <div class="p-4">
        <h1 class="text-2xl font-bold">{{ $t('sidebar.tables') }}</h1>
        <div class="mt-4">
            <table class="min-w-full bg-white dark:bg-gray-800">
                <thead>
                    <tr>
                        <th class="py-2 px-4 border-b border-gray-200">{{ $t('table.headers.id') }}</th>
                        <th class="py-2 px-4 border-b border-gray-200">{{ $t('table.headers.name') }}</th>
                        <th class="py-2 px-4 border-b border-gray-200">{{ $t('table.headers.age') }}</th>
                        <th class="py-2 px-4 border-b border-gray-200">{{ $t('table.headers.email') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in items" :key="item.id">
                        <td class="py-2 px-4 border-b border-gray-200">{{ item.id }}</td>
                        <td class="py-2 px-4 border-b border-gray-200">{{ item.name }}</td>
                        <td class="py-2 px-4 border-b border-gray-200">{{ item.age }}</td>
                        <td class="py-2 px-4 border-b border-gray-200">{{ item.email }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const items = ref([
    { id: 1, name: 'John Doe', age: 28, email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', age: 34, email: 'jane.smith@example.com' },
    { id: 3, name: 'Sam Johnson', age: 45, email: 'sam.johnson@example.com' },
    { id: 4, name: 'Chris Lee', age: 23, email: 'chris.lee@example.com' },
]);
</script>
