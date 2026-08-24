import supabase from "../supabase/config";


export function useSupabaseUpload() {
    const uploadFile = async (file: File) => {
        const { data, error } = await supabase.storage.from('reports').upload(file.name, file);
        if (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
        return data;
    };

    const uploadFileToFolder = async (file: File, fileName: string, folder: string) => {
        const { data, error } = await supabase.storage
            .from('reports')
            .upload(folder + '/' + fileName, file, { upsert: true });
        if (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
        return data;
    };

    const createBucket = async (bucketName: string, options: { public: boolean } = { public: true }) => {
        const { data, error } = await supabase.storage.createBucket(bucketName, options);
        if (error) {
            const alreadyExists = /already exists/i.test(error.message ?? '');
            if (alreadyExists) {
                return null;
            }
            console.error('Error creating bucket:', error);
            throw error;
        }
        return data;
    };

    return { uploadFile, uploadFileToFolder, createBucket };
}
