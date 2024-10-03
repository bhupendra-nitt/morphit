import { useState } from 'react';
import TransformationEditor from '../components/TransformationEditor';

export default function TransformPage() {
  const [message, setMessage] = useState('');

  const handleSaveTransformation = async (transformation: string) => {
    try {
      const response = await fetch('/api/transform', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transformation }),
      });

      if (response.ok) {
        setMessage('Transformation saved successfully');
      } else {
        setMessage('Failed to save transformation');
      }
    } catch (error) {
      setMessage('Error saving transformation');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Data Transformation</h1>
      <TransformationEditor onSave={handleSaveTransformation} />
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}