import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, Heart, Eye, Send } from 'lucide-react';
import { notes, comments as commentsApi } from '@/services/api';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

export function NoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    fetchNote();
    fetchComments();
  }, [id]);

  const fetchNote = async () => {
    try {
      const { data } = await notes.getById(id);
      setNote(data);
      setIsLiked(data.likedBy?.includes(localStorage.getItem('userId')));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await commentsApi.getAll(id);
      setComments(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = async () => {
    try {
      const { data } = await notes.like(id);
      setNote({ ...note, analytics: { ...note.analytics, likes: data.likes } });
      setIsLiked(data.isLiked);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownload = async () => {
    try {
      await notes.download(id);
      const link = document.createElement('a');
      link.href = note.fileUrl;
      link.download = note.title;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const { data } = await commentsApi.add(id, newComment);
      setComments([data, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error(error);
    }
  };

  if (!note) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white rounded-xl shadow-md p-8 mb-6">
          <h1 className="text-3xl font-bold mb-4">{note.title}</h1>
          <p className="text-gray-600 mb-6">{note.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
              {note.subject}
            </span>
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
              {note.course}
            </span>
            {note.tags?.map((tag) => (
              <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-6 mb-6">
            <span className="flex items-center gap-2 text-gray-600">
              <Eye size={20} />
              {note.analytics.views} views
            </span>
            <span className="flex items-center gap-2 text-gray-600">
              <Download size={20} />
              {note.analytics.downloads} downloads
            </span>
            <span className="flex items-center gap-2 text-gray-600">
              <Heart size={20} fill={isLiked ? '#FF6600' : 'none'} />
              {note.analytics.likes} likes
            </span>
          </div>

          <div className="flex gap-4">
            <Button onClick={handleDownload} className="flex items-center gap-2">
              <Download size={18} />
              Download
            </Button>
            <Button
              onClick={handleLike}
              variant={isLiked ? 'primary' : 'outline'}
              className="flex items-center gap-2"
            >
              <Heart size={18} fill={isLiked ? 'white' : 'none'} />
              {isLiked ? 'Liked' : 'Like'}
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 mb-6">
          <h2 className="text-2xl font-bold mb-4">Preview</h2>
          {note.fileType === 'pdf' ? (
            <iframe 
              src={`${note.fileUrl}#toolbar=0`}
              className="w-full border rounded"
              style={{ height: '600px' }}
              title="PDF Preview"
            />
          ) : note.fileType === 'image' ? (
            <img src={note.fileUrl} alt={note.title} className="w-full rounded" />
          ) : note.fileType === 'docx' ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">Preview not available for DOCX files</p>
              <Button onClick={handleDownload} className="flex items-center gap-2 mx-auto">
                <Download size={18} />
                Download to View
              </Button>
            </div>
          ) : (
            <p className="text-gray-600">Preview not available for this file type</p>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4">Comments ({comments.length})</h2>

          <form onSubmit={handleAddComment} className="mb-6 flex gap-2">
            <Input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1"
            />
            <Button type="submit">
              <Send size={18} />
            </Button>
          </form>

          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment._id} className="border-b pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div 
                    className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/20 transition"
                    onClick={() => navigate(`/user/${comment.userId?._id}`)}
                  >
                    {comment.userId?.name?.[0]}
                  </div>
                  <span 
                    className="font-medium cursor-pointer hover:text-primary transition"
                    onClick={() => navigate(`/user/${comment.userId?._id}`)}
                  >
                    {comment.userId?.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700 ml-10">{comment.text}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
