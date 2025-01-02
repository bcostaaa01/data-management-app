import supabase from "../supabase/config";

export const useSupabaseStorage = () => {
  const listFiles = async (bucket: string, path: string) => {
    const { data, error } = await supabase.storage.from(bucket).list(path);
    if (error) {
      console.error("Error listing files:", error);
      return [];
    }
    return data || [];
  };

  return { listFiles };
};
