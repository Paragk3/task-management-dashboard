// pages/api/tasks/create.js
import { getSession } from 'next-auth/react';
import { prisma } from '../../../lib/prisma'; 

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    try {
      const { title, description, status, priority, dueDate } = req.body;
      const result = await prisma.task.create({
        data: {
          title,
          description,
          status,
          priority,
          dueDate,
          user: { connect: { email: session.user.email } },
        },
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}