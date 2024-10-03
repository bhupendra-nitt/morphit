interface DatabaseSelectorProps {
  onSelect: (database: string) => void;
}

export default function DatabaseSelector({ onSelect }: DatabaseSelectorProps) {
  const databases = ['MySQL', 'PostgreSQL', 'SQLite'];

  return (
    <div>
      <label className="block mb-2">Select Database</label>
      <select
        onChange={(e) => onSelect(e.target.value)}
        className="block w-full p-2 border rounded"
      >
        <option value="">Choose a database</option>
        {databases.map(db => (
          <option key={db} value={db}>{db}</option>
        ))}
      </select>
    </div>
  );
}