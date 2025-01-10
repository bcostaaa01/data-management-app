import { ref } from "vue";
import { defineStore } from "pinia";
import supabase from "../supabase/config";

export const useTablesStore = defineStore("tables", () => {
  const tables = ref<any[]>([]);
  const table = ref<any>(null);
  const name = ref<string | null>(null);
  const error = ref<string | null>(null);
  const isConnectingToTable = ref(false);

  const fetchTable = async (tableName: string) => {
    console.log("Fetching table:", tableName);
    isConnectingToTable.value = true;
    console.log("isConnectingToTable set to:", isConnectingToTable.value);

    const { data, error: fetchError } = await supabase
      .from(tableName)
      .select("*");

    table.value = data;
    name.value = tableName;
    console.log(table.value);

    if (fetchError) {
      console.error("Error fetching tables:", fetchError);
      error.value = fetchError.message;
    } else {
      tables.value = data;
      error.value = null;
      isConnectingToTable.value = false;
    }

    console.log("isConnectingToTable set to:", isConnectingToTable.value);
  };

  return { tables, error, fetchTable, isConnectingToTable, table, name };
});
