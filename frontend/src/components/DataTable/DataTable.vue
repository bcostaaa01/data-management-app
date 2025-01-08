<template>
    <div class="w-full">
        <DataTable :value="items" :columns="columns">
            <Column v-for="column in columns" :field="column.field" :header="column.header" />
        </DataTable>
    </div>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

defineProps<{
    items: any[];
    columns: any[];
}>();
</script>