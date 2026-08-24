import { ref } from "vue";

const EXCEL_EXTENSIONS = ["xlsx", "xls"];

export function useFileUpload() {
    const file = ref<File | null>(null);

    const handleFileUpload = (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
            file.value = target.files[0];
        }
    };

    const readFile = (): Promise<string | ArrayBuffer> => {
        return new Promise((resolve, reject) => {
            if (!file.value) {
                reject(new Error("No file selected"));
                return;
            }

            const extension = file.value.name.split(".").pop()?.toLowerCase();
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.result === null) {
                    reject(new Error("Failed to read file"));
                    return;
                }
                resolve(reader.result);
            };
            reader.onerror = () => reject(reader.error ?? new Error("Failed to read file"));

            if (extension && EXCEL_EXTENSIONS.includes(extension)) {
                reader.readAsArrayBuffer(file.value);
            } else {
                reader.readAsText(file.value);
            }
        });
    };

    return { file, handleFileUpload, readFile };
}
