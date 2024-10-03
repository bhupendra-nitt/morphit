import React, { useState } from 'react';

interface TransformationEditorProps {
  onSave: (transformation: string) => void;
}

export default function TransformationEditor({ onSave }: TransformationEditorProps) {
  const [transformation, setTransformation] = useState('');

  const handleSave = () => {
    onSave(transformation);
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Data Transformation</h2>
      <textarea
        value={transformation}
        onChange={(e) => setTransformation(e.target.value)}
        className="w-full h-40 p-2 border rounded"
        placeholder="Enter your transformation function here. E.g., (row) => ({ ...row, fullName: `${row.firstName} ${row.lastName}` })"
      />
      <button
        onClick={handleSave}
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Save Transformation
      </button>
    </div>
  );
}
