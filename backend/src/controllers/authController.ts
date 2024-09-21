// backend/src/controllers/authController.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Example authentication logic
    if (email === 'admin@example.com' && password === 'admin') {
      const token = 'example-token'; // Generate a real token in a production environment
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: 'Authentication failed' });
    }
  } else {
    res.status(405).end();
  }
}