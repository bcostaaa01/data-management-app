<template>
    <fwb-modal v-if="show" @close="show = false">
        <template #header>
            <h3 class="text-xl font-bold">{{ t("reports.sendReport") }}</h3>
        </template>
        <template #body>
            <form class="flex flex-col space-y-6" @submit.prevent="submitForm">
                <label>Email address:
                    <input type="email" name="email" required
                        class="text-black border-2 dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-700 w-full rounded-md p-2 mt-2" />
                </label>
                <fwb-button>{{ t("reports.sendReport") }}</fwb-button>
            </form>
        </template>
    </fwb-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FwbButton, FwbModal } from 'flowbite-vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const show = ref(false);
const selectedFile = ref<File | null>(null);

const handleOpen = (file: File) => {
    selectedFile.value = file;
    show.value = true;
};

async function submitForm(event: Event) {
    event.preventDefault();

    const formData = Object.fromEntries(new FormData(event.target as HTMLFormElement).entries());

    try {
        const response = await fetch("https://www.form-to-email.com/api/s/j2fi5XjHrCO1", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: formData.email,
                name: "Consulting Solutions GmbH",
                subject: "Report",
                message: "This is a test message",
                file: selectedFile.value,
            }),
        });

        if (response.ok) {
            console.log("Email sent successfully");
        } else {
            console.error("Failed to send email");
        }
    } catch (error) {
        console.error("Failed to send email", error);
    }
}

defineExpose({
    show,
    handleOpen
});
</script>