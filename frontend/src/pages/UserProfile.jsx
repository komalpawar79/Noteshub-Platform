import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, ExternalLink } from 'lucide-react';
import { auth } from '@/services/api';
import { ProfileSkeleton } from '@/components/Skeleton';

export function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const { data } = await auth.getUserById(id);
      setUser(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ProfileSkeleton />;
  if (!user) return <div className="text-center py-12">User not found</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="bg-white rounded-xl shadow-md p-8 mb-6">
          <div className="flex items-center gap-4 mb-6">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full object-cover" />
            ) : (
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-3xl font-bold text-primary">
                {user.name[0]}
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
              <span className="inline-block mt-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                {user.role}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            {user.bio && <p className="text-gray-700">{user.bio}</p>}
            {user.department && (
              <p className="text-gray-600">Department: {user.department}</p>
            )}
            {user.semester && (
              <p className="text-gray-600">Semester: {user.semester}</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6 text-center">
          <Upload className="mx-auto mb-2 text-primary" size={32} />
          <p className="text-3xl font-bold text-primary">{user.stats.uploads}</p>
          <p className="text-gray-600">Notes Uploaded</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Uploaded Notes ({user.uploadedNotes?.length || 0})</h2>
          
          <div className="space-y-3">
            {user.uploadedNotes?.length > 0 ? (
              user.uploadedNotes.map((note) => (
                <div 
                  key={note._id} 
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/notes/${note._id}`)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{note.title}</h3>
                        <ExternalLink size={16} className="text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{note.subject} • {note.course}</p>
                      <span className="text-xs text-gray-500 mt-2 inline-block">
                        {new Date(note.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-8">No uploaded notes yet</p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
