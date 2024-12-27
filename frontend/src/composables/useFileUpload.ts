import { ref } from "vue";

export function useFileUpload() {
    const file = ref<File | null>(null);

    const handleFileUpload = (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
            file.value = target.files[0];
        }
    };

    return { file, handleFileUpload };
}