import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

interface ProcessedData {
  data: Record<string, any>[];
  columns: { field: string; header: string }[];
}

export const useGeneratePdf = () => {
  const convertToPdf = async (processedData?: ProcessedData) => {
    if (!processedData) return;

    const headers = processedData.columns.map((column) => column.header);
    const rows = processedData.data.map((row) =>
      processedData.columns.map((column) => row[column.field])
    );

    try {
      const pdf = new jsPDF();

      pdf.setFontSize(16);
      pdf.text("Sales Report", 10, 10);

      pdf.setFontSize(12);

      autoTable(pdf, {
        head: [headers],
        body: rows,
        margin: { horizontal: 10 },
        headStyles: { fillColor: "#5dbe9d" },
        styles: { fontSize: 10 },
      });

      const pdfBlob = pdf.output('blob');
      return pdfBlob;
    } catch (error) {
      console.error("Error generating PDF:", error);
      throw error;
    }
  };

  return { convertToPdf };
};
