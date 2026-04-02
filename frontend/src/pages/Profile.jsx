import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, Camera, ExternalLink } from 'lucide-react';
import { auth } from '@/services/api';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { useNavigate } from 'react-router-dom';
import { ProfileSkeleton } from '@/components/Skeleton';

export function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [avatarFile, setAvatarFile] = useState(null);
  const [activeTab, setActiveTab] = useState('stats');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await auth.getProfile();
      setUser(data);
      setFormData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      
      // Only append changed fields
      if (formData.name !== user.name) data.append('name', formData.name);
      if (formData.bio !== user.bio) data.append('bio', formData.bio || '');
      if (formData.department !== user.department) data.append('department', formData.department || '');
      if (avatarFile) data.append('avatar', avatarFile);
      
      const response = await auth.updateProfile(data);
      setUser(response.data);
      setFormData(response.data);
      setEditing(false);
      setAvatarFile(null);
      alert('Profile updated successfully');
    } catch (error) {
      console.error(error);
      alert('Update failed: ' + (error.response?.data?.message || error.message));
    }
  };

  if (!user) return <ProfileSkeleton />;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="bg-white rounded-xl shadow-md p-4 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row items-start justify-between mb-6 gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
              <div className="relative">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full object-cover" />
                ) : (
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-3xl font-bold text-primary">
                    {user.name[0]}
                  </div>
                )}
                {editing && (
                  <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-primary/90">
                    <Camera size={16} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setAvatarFile(e.target.files[0])}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <div>
                <h1 className="text-xl md:text-3xl font-bold break-words">{user.name}</h1>
                <p className="text-xs md:text-base text-gray-600 break-all">{user.email}</p>
                <span className="inline-block mt-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  {user.role}
                </span>
              </div>
            </div>
            <Button onClick={() => setEditing(!editing)} variant="outline" className="w-full md:w-auto">
              {editing ? 'Cancel' : 'Edit Profile'}
            </Button>
          </div>

          {editing ? (
            <form onSubmit={handleUpdate} className="space-y-4">
              {avatarFile && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-sm text-green-700">✓ Image selected: {avatarFile.name}</p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Bio</label>
                <textarea
                  value={formData.bio || ''}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Department</label>
                <Input
                  value={formData.department || ''}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                />
              </div>
              <Button type="submit">Save Changes</Button>
            </form>
          ) : (
            <div className="space-y-2">
              {user.bio && <p className="text-gray-700">{user.bio}</p>}
              {user.department && (
                <p className="text-gray-600">Department: {user.department}</p>
              )}
              {user.semester && (
                <p className="text-gray-600">Semester: {user.semester}</p>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl shadow-md p-6 text-center"
          >
            <Upload className="mx-auto mb-2 text-primary" size={32} />
            <p className="text-3xl font-bold text-primary">{user.stats.uploads}</p>
            <p className="text-gray-600">Notes Uploaded</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl shadow-md p-6 text-center"
          >
            <Download className="mx-auto mb-2 text-primary" size={32} />
            <p className="text-3xl font-bold text-primary">{user.stats.downloads}</p>
            <p className="text-gray-600">Notes Downloaded</p>
          </motion.div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
          <div className="flex gap-2 md:gap-4 mb-6 border-b overflow-x-auto">
            <button
              onClick={() => setActiveTab('stats')}
              className={`pb-2 px-2 md:px-4 text-sm md:text-base whitespace-nowrap ${activeTab === 'stats' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
            >
              Statistics
            </button>
            <button
              onClick={() => setActiveTab('uploaded')}
              className={`pb-2 px-2 md:px-4 text-sm md:text-base whitespace-nowrap ${activeTab === 'uploaded' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
            >
              Uploaded ({user.uploadedNotes?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('downloaded')}
              className={`pb-2 px-2 md:px-4 text-sm md:text-base whitespace-nowrap ${activeTab === 'downloaded' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
            >
              Downloaded ({user.downloadedNotes?.length || 0})
            </button>
          </div>

          {activeTab === 'stats' && (
            <div className="text-center py-8 text-gray-600">
              View your uploaded and downloaded notes in the tabs above
            </div>
          )}

          {activeTab === 'uploaded' && (
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
                        <div className="flex items-center gap-2 mt-2">
                          <span className={`text-xs px-2 py-1 rounded ${
                            note.status === 'approved' ? 'bg-green-100 text-green-700' :
                            note.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {note.status}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(note.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-8">No uploaded notes yet</p>
              )}
            </div>
          )}

          {activeTab === 'downloaded' && (
            <div className="space-y-3">
              {user.downloadedNotes?.length > 0 ? (
                user.downloadedNotes.map((note) => (
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
                          Downloaded on {new Date(note.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-8">No downloaded notes yet</p>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
