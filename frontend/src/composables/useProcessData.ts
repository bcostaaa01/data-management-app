import Papa from "papaparse";
import * as XLSX from "xlsx";

const EXCEL_EXTENSIONS = ["xlsx", "xls"];

interface ProcessedData {
  data: Record<string, any>[];
  columns: { field: string; header: string }[];
}

const buildColumns = (row: Record<string, any> | undefined) => {
  return Object.keys(row ?? {}).map((key) => ({
    field: key,
    header: key,
  }));
};

const processCsv = (data: string): ProcessedData => {
  const parsedData = Papa.parse(data, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header: string) => header.trim(),
  });

  const rows = parsedData.data as Record<string, any>[];

  return {
    data: rows,
    columns: buildColumns(rows[0]),
  };
};

const processExcel = (data: ArrayBuffer): ProcessedData => {
  const workbook = XLSX.read(data, { type: "array", cellDates: true });
  const firstSheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[firstSheetName];

  const [headerRow, ...bodyRows] = XLSX.utils.sheet_to_json<any[]>(sheet, {
    header: 1,
  });

  if (!headerRow) {
    return { data: [], columns: [] };
  }

  const headers = headerRow.map((header) => String(header ?? "").trim());

  const rows = bodyRows.map((row) => {
    const record: Record<string, any> = {};
    headers.forEach((header, index) => {
      record[header] = row[index] ?? null;
    });
    return record;
  });

  return {
    data: rows,
    columns: buildColumns(rows[0] ?? Object.fromEntries(headers.map((header) => [header, null]))),
  };
};

export const useProcessData = () => {
  const processData = async (data: string | ArrayBuffer, fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();

    const processedData =
      extension && EXCEL_EXTENSIONS.includes(extension)
        ? processExcel(data as ArrayBuffer)
        : processCsv(data as string);

    console.log("Processed data:", processedData.data);
    console.log("Processed columns:", processedData.columns);

    return processedData;
  };

  return { processData };
};
