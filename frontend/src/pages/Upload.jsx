import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload as UploadIcon } from 'lucide-react';
import { notes } from '@/services/api';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';

export function Upload() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    course: '',
    semester: '',
    tags: ''
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a file');

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    data.append('file', file);

    try {
      setLoading(true);
      await notes.upload(data);
      alert('Note uploaded successfully! Pending admin approval.');
      navigate('/');
    } catch (error) {
      alert(error.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2">Upload Notes</h1>
        <p className="text-gray-600 mb-8">Share your notes with the community</p>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-md">
          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <Input
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Data Structures Complete Notes"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description *</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the notes"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Subject *</label>
              <Input
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="e.g., Computer Science"
              />
            </div>
          <div>
            <label className="block text-sm font-medium mb-2">Course *</label>
            <select
              required
              value={formData.course}
              onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select Course</option>
              <option value="BCA">BCA</option>
              <option value="BTech">BTech</option>
              <option value="MCA">MCA</option>
              <option value="MTech">MTech</option>
              <option value="BSc">BSc</option>
              <option value="MSc">MSc</option>
              <option value="BA">BA</option>
              <option value="MA">MA</option>
              <option value="BCom">BCom</option>
              <option value="MCom">MCom</option>
            </select>
          </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Semester</label>
            <Input
              type="number"
              value={formData.semester}
              onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
              placeholder="e.g., 3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
            <Input
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="e.g., algorithms, data structures, exam prep"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">File (PDF, DOCX, or Image) *</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <UploadIcon className="mx-auto mb-4 text-gray-400" size={48} />
              <input
                type="file"
                accept=".pdf,.docx,.jpg,.jpeg,.png"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <span className="text-primary font-medium">Choose a file</span>
                <span className="text-gray-500"> or drag and drop</span>
              </label>
              {file && <p className="mt-2 text-sm text-gray-600">{file.name}</p>}
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Uploading...' : 'Upload Notes'}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
