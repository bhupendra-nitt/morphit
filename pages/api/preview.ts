import type { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from '@/middleware/auth';
import { parseFile } from '@/lib/fileParser';
import { transformData } from '@/lib/dataTransformer';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      // In a real application, you would retrieve the file path and transformation from the session or database
      const filePath = '/path/to/uploaded/file.csv';
      const transformation = '(row) => ({ ...row, fullName: `${row.firstName} ${row.lastName}` })';

      let data = await parseFile(filePath, '.csv');
      data = transformData(data, transformation);

      res.status(200).json({ data: data.slice(0, 10) }); // Send only first 10 rows for preview
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate preview' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;