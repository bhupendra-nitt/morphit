import { useState } from 'react';
import DatabaseSelector from '../components/DatabaseSelector';
import DatabaseConfig from '../components/DatabaseConfig';

export default function DatabaseConfigPage() {
  const [selectedDb, setSelectedDb] = useState('');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Database Configuration</h1>
      <DatabaseSelector onSelect={setSelectedDb} />
      {selectedDb && <DatabaseConfig database={selectedDb} />}
    </div>
  );
}