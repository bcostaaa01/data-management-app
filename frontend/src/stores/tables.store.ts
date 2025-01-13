import { ref } from "vue";
import { defineStore } from "pinia";
import supabase from "../supabase/config";

export const useTablesStore = defineStore("tables", () => {
  const tables = ref<any[]>([]);
  const table = ref<any>(null);
  const columns = ref<any[]>([]);
  const name = ref<string | null>(null);
  const error = ref<string | null>(null);
  const isConnectingToTable = ref(false);

  const fetchTable = async (tableName: string) => {
    isConnectingToTable.value = true;

    const { data, error: fetchError } = await supabase
      .from(tableName)
      .select("*");

    table.value = data;
    columns.value = Object.keys(data?.[0] || {}).map((key) => ({
      field: key,
      header: key,
    }));
    name.value = tableName;

    if (fetchError) {
      console.error("Error fetching tables:", fetchError);
      error.value = fetchError.message;
    } else {
      tables.value = data;
      error.value = null;
      isConnectingToTable.value = false;
    }
  };

  const insertRows = async (tableName: string, rows: any[]) => {
    console.log("Inserting rows into table:", tableName);
    const { data, error } = await supabase
      .from(tableName)
      .insert(rows)
      .select();
    if (error) {
      console.error("Error inserting rows:", error);
    } else {
      console.log("Rows inserted successfully:", data);
    }
  };

  return {
    tables,
    error,
    fetchTable,
    isConnectingToTable,
    table,
    name,
    insertRows,
    columns,
  };
});
