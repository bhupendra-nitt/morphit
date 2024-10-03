import type { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from '@/middleware/auth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { type } = req.query;

    if (type === 'file') {
      // Fetch file columns from session or database
      res.status(200).json({ columns: ['column1', 'column2', 'column3'] });
    } else if (type === 'db') {
      // Fetch database columns based on the selected database
      res.status(200).json({ columns: ['id', 'name', 'email'] });
    } else {
      res.status(400).json({ error: 'Invalid type parameter' });
    }
  } else if (req.method === 'POST') {
    // Save the column mapping
    const mapping = req.body;
    // Save mapping to session or database
    res.status(200).json({ message: 'Mapping saved successfully', mapping });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;