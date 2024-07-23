import { NextApiRequest, NextApiResponse } from 'next';
import Note from '@/models/notes';
import dbConnect from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'POST') {
    const { meetingId, content } = req.body;

    const note = new Note({
      meetingId,
      content,
    });

    await note.save();

    res.status(201).json(note);
  } else {
    res.status(405).end();
  }
}