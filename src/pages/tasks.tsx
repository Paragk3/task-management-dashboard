import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'User is not authenticated' });
  }

  // Proceed with the route for authorized users
  // ... implementation of the API Route
  res.json({ message: 'You are authenticated' });
}