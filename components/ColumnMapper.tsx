interface ColumnMapperProps {
  fileColumns: string[];
  dbColumns: string[];
  onMapping: (fileColumn: string, dbColumn: string) => void;
}

export default function ColumnMapper({ fileColumns, dbColumns, onMapping }: ColumnMapperProps) {
  return (
    <div>
      {fileColumns.map(fileColumn => (
        <div key={fileColumn} className="mb-4">
          <label className="block mb-2">{fileColumn}</label>
          <select
            onChange={(e) => onMapping(fileColumn, e.target.value)}
            className="block w-full p-2 border rounded"
          >
            <option value="">Select DB Column</option>
            {dbColumns.map(dbColumn => (
              <option key={dbColumn} value={dbColumn}>{dbColumn}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
