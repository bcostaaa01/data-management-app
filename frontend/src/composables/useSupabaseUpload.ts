import supabase from "../supabase/config";


export function useSupabaseUpload() {
    // TODO: Implement supabase upload
    // TODO: Implement supabase create bucket

    const uploadFile = async (file: File) => {
        const { data, error } = await supabase.storage.from('test').upload(file.name,file);
        if (error) {
            console.error('Error uploading file:', error);
        } else {
            console.log('File uploaded successfully:', data);
        }
    };

    const createBucket = async () => {
        const { data, error } = await supabase.storage.createBucket('my-bucket');
        if (error) {
            console.error('Error creating bucket:', error);
        } else {
            console.log('Bucket created successfully:', data);
        }
    };

    return { uploadFile, createBucket };
}
