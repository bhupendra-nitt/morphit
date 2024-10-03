// lib/fileParser.ts
import xlsx from 'xlsx';
import csv from 'csv-parse/sync';
import fs from 'fs/promises';

export async function parseFile(filePath: string, extension: string): Promise<any[]> {
  const fileContent = await fs.readFile(filePath);

  if (extension === '.csv') {
    return csv.parse(fileContent, { columns: true, skip_empty_lines: true });
  } else if (['.xlsx', '.xls'].includes(extension)) {
    const workbook = xlsx.read(fileContent);
    const sheetName = workbook.SheetNames[0];
    return xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
  } else {
    throw new Error('Unsupported file type');
  }
}