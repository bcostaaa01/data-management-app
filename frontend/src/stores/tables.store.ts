import { ref } from "vue";
import { defineStore } from "pinia";
import supabase from "../supabase/config";

export const useTablesStore = defineStore("tables", () => {
  const tables = ref<any[]>([]);
  const error = ref<string | null>(null);

  const fetchTable = async (tableName: string) => {
    const { data, error: fetchError } = await supabase
      .from(tableName)
      .select("*");
    if (fetchError) {
      console.error("Error fetching tables:", fetchError);
      error.value = fetchError.message;
    } else {
      tables.value = data;
      error.value = null;
    }
  };

  return { tables, error, fetchTable };
});
