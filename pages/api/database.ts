import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/databaseConnector';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const config = req.body;

    try {
      await connectToDatabase(config);
      // Save configuration to session or database
      res.status(200).json({ message: 'Database connected and configuration saved', config });
    } catch (error) {
      res.status(500).json({ error: 'Failed to connect to database' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;