import { NextApiRequest, NextApiResponse } from 'next';
// import jwt from 'jsonwebtoken'; // Removed as it's no longer needed

// const JWT_SECRET = process.env.JWT_SECRET || ''; // Removed as it's no longer needed

export function withAuth(handler: { (req: NextApiRequest, res: NextApiResponse): Promise<void>; /* ... other overloads ... */ }) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // Authentication check disabled
    // Simply call the handler without any token verification
    return handler(req, res);

    // Previous authentication logic removed
  };
}