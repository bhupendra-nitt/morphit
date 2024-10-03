import React from 'react';

interface PreviewProps {
  data: any[];
}

export default function Preview({ data }: PreviewProps) {
  if (!data || data.length === 0) {
    return <p>No data to preview</p>;
  }

  const headers = Object.keys(data[0]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          {headers.map((header) => (
            <th key={header} className="py-3 px-6 text-left">{header}</th>
          ))}
        </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
        {data.slice(0, 10).map((row, index) => (
          <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
            {headers.map((header) => (
              <td key={header} className="py-3 px-6 text-left whitespace-nowrap">
                {row[header]}
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}