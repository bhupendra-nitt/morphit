import { useState, useEffect } from 'react';
import ColumnMapper from '../components/ColumnMapper';

export default function MappingPage() {
  const [fileColumns, setFileColumns] = useState<string[]>([]);
  const [dbColumns, setDbColumns] = useState<string[]>([]);
  const [mapping, setMapping] = useState<Record<string, string>>({});

  useEffect(() => {
    // Fetch file columns and database columns
    const fetchColumns = async () => {
      try {
        const fileResponse = await fetch('/api/mapping?type=file');
        const dbResponse = await fetch('/api/mapping?type=db');

        if (fileResponse.ok && dbResponse.ok) {
          const fileData = await fileResponse.json();
          const dbData = await dbResponse.json();
          setFileColumns(fileData.columns);
          setDbColumns(dbData.columns);
        }
      } catch (error) {
        console.error('Error fetching columns:', error);
      }
    };

    fetchColumns();
  }, []);

  const handleMapping = (fileColumn: string, dbColumn: string) => {
    setMapping(prev => ({ ...prev, [fileColumn]: dbColumn }));
  };

  const handleSaveMapping = async () => {
    try {
      const response = await fetch('/api/mapping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mapping),
      });

      if (response.ok) {
        console.log('Mapping saved successfully');
      } else {
        console.error('Failed to save mapping');
      }
    } catch (error) {
      console.error('Error saving mapping:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Column Mapping</h1>
      <ColumnMapper
        fileColumns={fileColumns}
        dbColumns={dbColumns}
        onMapping={handleMapping}
      />
      <button
        onClick={handleSaveMapping}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Save Mapping
      </button>
    </div>
  );
}