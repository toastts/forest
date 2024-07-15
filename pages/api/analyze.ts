import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { data } = req.body;

    try {
      const apiUrl = 'https://api.openai.com/v1/completions';
      console.log('API URL:', apiUrl); // Log the URL to ensure it's correct

      const response = await axios.post(apiUrl, {
        prompt: `Analyze the following onboarding data: ${JSON.stringify(data)}`,
        max_tokens: 150,
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error sending data to ChatGPT:', error);
      res.status(500).json({ error: 'Error sending data to ChatGPT' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}