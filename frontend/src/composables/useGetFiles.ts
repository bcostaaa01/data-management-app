import { ref } from 'vue';
import supabase from '../supabase/config';

export const useGetFilesFromBucket = () => {
    const files = ref<any[]>([]);

    const getFiles = async () => {
        const { data, error } = await supabase.storage.from('test').list('private');

        if (error) {
            console.error('Error fetching files:', error);
        } else {
            console.log(data);
            files.value = data || [];
        }
    };

    return { files, getFiles };
};
