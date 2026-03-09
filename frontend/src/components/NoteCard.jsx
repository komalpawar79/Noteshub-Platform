import { motion } from 'framer-motion';
import { FileText, Download, Eye, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { notes } from '@/services/api';
import { Card } from './Card';

export function NoteCard({ note: initialNote }) {
  const navigate = useNavigate();
  const [note, setNote] = useState(initialNote);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async (e) => {
    e.stopPropagation();
    try {
      const { data } = await notes.like(note._id);
      setNote({ ...note, analytics: { ...note.analytics, likes: data.likes } });
      setIsLiked(data.isLiked);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card
      onClick={() => navigate(`/notes/${note._id}`)}
      className="cursor-pointer"
    >
      <div className="flex items-start gap-4">
        <div className="bg-primary/10 p-3 rounded-lg">
          <FileText className="text-primary" size={24} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1">{note.title}</h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{note.description}</p>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
              {note.subject}
            </span>
            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
              {note.course}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Eye size={16} />
              {note.analytics.views}
            </span>
            <span className="flex items-center gap-1">
              <Download size={16} />
              {note.analytics.downloads}
            </span>
            <button
              onClick={handleLike}
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <Heart 
                size={16} 
                fill={isLiked ? '#FF6600' : 'none'}
                className={isLiked ? 'text-primary' : ''}
              />
              {note.analytics.likes}
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}
