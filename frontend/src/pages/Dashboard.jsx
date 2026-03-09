import { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { notes } from '@/services/api';
import { NoteCard } from '@/components/NoteCard';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';

export function Dashboard() {
  const navigate = useNavigate();
  const [notesList, setNotesList] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ subject: '', course: '', sort: 'latest' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, [filters]);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const { data } = await notes.getAll({ ...filters, search });
      setNotesList(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNotes();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-4xl font-bold">Discover Notes</h1>
            <p className="text-gray-600">Browse and download notes shared by students and faculty</p>
          </div>
          <Button 
            onClick={() => navigate('/upload')} 
            className="flex items-center gap-2"
          >
            <Plus size={20} />
            Add Notes
          </Button>
        </div>
      </motion.div>

      <form onSubmit={handleSearch} className="mb-6 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="Search notes by title, description, or tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button type="submit">Search</Button>
      </form>

      <div className="flex gap-4 mb-6 flex-wrap">
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          value={filters.sort}
          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
        >
          <option value="latest">Latest (Newly Added)</option>
          <option value="popular">Most Popular (Most Views)</option>
          <option value="downloads">Most Downloaded</option>
          <option value="likes">Most Liked</option>
        </select>
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-64"
          value={filters.course}
          onChange={(e) => setFilters({ ...filters, course: e.target.value })}
        >
          <option value="">All Courses</option>
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
        <Input
          placeholder="Filter by subject (e.g., Computer Science)"
          value={filters.subject}
          onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
          className="w-64"
        />
        {(filters.subject || filters.course) && (
          <Button
            variant="secondary"
            onClick={() => setFilters({ ...filters, subject: '', course: '' })}
          >
            Clear Filters
          </Button>
        )}
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {notesList.map((note) => (
            <NoteCard key={note._id} note={note} />
          ))}
        </motion.div>
      )}

      {!loading && notesList.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No notes found. Try adjusting your filters.
        </div>
      )}
    </div>
  );
}
