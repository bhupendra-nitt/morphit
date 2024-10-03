import type { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from '@/middleware/auth';
import { transformData } from '@/lib/dataTransformer';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { transformation } = req.body;

    try {
      // Save the transformation function to session or database
      // For demonstration, we'll just echo it back
      res.status(200).json({ message: 'Transformation saved', transformation });
    } catch (error) {
      res.status(500).json({ error: 'Failed to save transformation' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;