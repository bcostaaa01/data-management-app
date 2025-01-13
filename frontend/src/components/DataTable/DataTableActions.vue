<!-- TODO: Implement the action for the DataTable: Export to Supabase, download as CSV/Excel, add new row, add new column, edit column, delete column, delete row -->
<template>
    <fwb-button v-if="showExportToSupabase" @click="insertRowsToSupabase">Export to Supabase</fwb-button>
</template>

<script setup lang="ts">
import { FwbButton } from "flowbite-vue";
import { useTablesStore } from "../../stores/tables.store";

// TODO: connect to Supabase table
// - use the Supabase API for inserting data into a table (INSERT INTO table_name (column1, column2, column3) VALUES (value1, value2, value3))
// - then show a message after successuly inserting the data

const { insertRows } = useTablesStore();

// TODO: get the table name and rows from the DataTable 
const insertRowsToSupabase = async () => {
    await insertRows(tableName, rows);
};

// TODO: chooce where to show the export to Supabase button (only in the data import page)
defineProps({
    showExportToSupabase: {
        type: Boolean,
        default: false,
    },
});
</script>
