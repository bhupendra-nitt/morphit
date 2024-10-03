import { useState } from 'react';
import { useRouter } from 'next/router';
import FileUpload from '../components/FileUpload';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const handleFileUpload = async (uploadedFile: File) => {
    setFile(uploadedFile);
    const formData = new FormData();
    formData.append('file', uploadedFile);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        await router.push('/mapping');
      } else {
        console.error('File upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Upload Excel/CSV File</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      {file && <p className="mt-4">File uploaded: {file.name}</p>}
    </div>
  );
}