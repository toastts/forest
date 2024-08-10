'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { TablesInsert } from '@/lib/database.types';

export default function NotesPage() {
  const [content, setContent] = useState('');

  const saveNote = async () => {
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, user_id: 1 }), // Replace with actual user_id
      });

      if (!response.ok) {
        console.error('Failed to save note');
      }
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <textarea
        className="w-1/2 h-1/2 p-4 border border-gray-300 rounded"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type your note here..."
      />

      <Textarea placeholder="Enter your response" />

    </div>
  );
}
