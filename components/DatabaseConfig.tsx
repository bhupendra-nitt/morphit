// @ts-nocheck
import { useState } from 'react';

interface DatabaseConfigProps {
  database: string;
}

export default function DatabaseConfig({ database }: DatabaseConfigProps) {
  const [config, setConfig] = useState({
    host: '',
    port: '',
    username: '',
    password: '',
    database: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/database', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...config, type: database }),
      });

      if (response.ok) {
        console.log('Database configuration saved');
      } else {
        console.error('Failed to save database configuration');
      }
    } catch (error) {
      console.error('Error saving database configuration:', error);
    }
  };

  // @ts-ignore
  // @ts-ignore
  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <h2 className="text-xl font-bold mb-2">{database} Configuration</h2>
      {['host', 'port', 'username', 'password', 'database'].map(field => (
        <div key={field} className="mb-4">
          <label className="block mb-2">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
          <input
            type={field === 'password' ? 'password' : 'text'}
            name={field}
            value={config[field]}
            onChange={handleChange}
            className="block w-full p-2 border rounded"
          />
        </div>
      ))}
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Save Configuration
      </button>
    </form>
  );
}