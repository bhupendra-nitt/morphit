import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Excel/CSV to Database Mapper</h1>
      <nav className="space-x-4">
        <Link href="/upload" className="text-blue-500 hover:underline">Upload File</Link>
        <Link href="/mapping" className="text-blue-500 hover:underline">Column Mapping</Link>
        <Link href="/transform" className="text-blue-500 hover:underline">Data Transformation</Link>
        <Link href="/preview" className="text-blue-500 hover:underline">Data Preview</Link>
        <Link href="/database-config" className="text-blue-500 hover:underline">Database Configuration</Link>
      </nav>
    </div>
  );
}