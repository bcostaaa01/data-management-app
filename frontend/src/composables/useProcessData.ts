import Papa from "papaparse";

export const useProcessData = () => {
  const processData = async (data: any) => {
    const parsedData = Papa.parse(data, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header: string) => header.trim(),
    });

    const columns = Object.keys(parsedData.data[0]).map((key) => ({
      field: key,
      header: key,
    }));

    console.log("Processed data:", parsedData.data);
    console.log("Processed columns:", columns);

    return {
      data: parsedData.data,
      columns: columns,
    };
  };

  return { processData };
};
