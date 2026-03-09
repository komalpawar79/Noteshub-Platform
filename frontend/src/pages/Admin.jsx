import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, Clock, Eye, Search, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { admin, notes } from '@/services/api';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

export function Admin() {
  const [stats, setStats] = useState(null);
  const [pendingNotes, setPendingNotes] = useState([]);
  const [usersData, setUsersData] = useState({ users: [], totalUsers: 0, currentPage: 1, totalPages: 1 });
  const [activeTab, setActiveTab] = useState('notes');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ role: '', status: '', page: 1, limit: 10 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStats();
    fetchPendingNotes();
    
    const interval = setInterval(() => {
      fetchStats();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsers();
      
      // Auto-refresh users every 30 seconds
      const interval = setInterval(() => {
        fetchUsers();
      }, 30000);
      
      return () => clearInterval(interval);
    }
  }, [activeTab, filters]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeTab === 'users') {
        setFilters(prev => ({ ...prev, page: 1 }));
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchStats = async () => {
    try {
      const { data } = await admin.getStats();
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPendingNotes = async () => {
    try {
      const { data } = await notes.getAll({ status: 'pending' });
      setPendingNotes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await admin.getUsers({
        ...filters,
        search: searchTerm
      });
      setUsersData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleNoteStatus = async (id, status) => {
    try {
      await notes.updateStatus(id, status);
      fetchPendingNotes();
      fetchStats();
      alert(`Note ${status}`);
    } catch (error) {
      alert('Action failed');
    }
  };

  const handleBlockUser = async (id) => {
    if (!confirm('Toggle user status?')) return;
    try {
      await admin.blockUser(id);
      fetchUsers();
      alert('User status updated');
    } catch (error) {
      alert('Action failed');
    }
  };

  const handleChangeRole = async (id, currentRole) => {
    const newRole = prompt('Enter new role (student/faculty/admin):', currentRole);
    if (!newRole || !['student', 'faculty', 'admin'].includes(newRole)) return;
    
    try {
      await admin.updateUserRole(id, newRole);
      fetchUsers();
      alert('Role updated');
    } catch (error) {
      alert('Action failed');
    }
  };

  const handleDeleteUser = async (id) => {
    if (!confirm('Delete this user permanently?')) return;
    try {
      await admin.deleteUser(id);
      fetchUsers();
      alert('User deleted');
    } catch (error) {
      alert('Delete failed');
    }
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-sm text-gray-500 mb-8">Real-time updates every 30 seconds</p>

        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <Users className="text-primary mb-2" size={32} />
              <p className="text-3xl font-bold">{stats.totalUsers}</p>
              <p className="text-gray-600">Total Users</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <FileText className="text-primary mb-2" size={32} />
              <p className="text-3xl font-bold">{stats.totalNotes}</p>
              <p className="text-gray-600">Total Notes</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <Users className="text-blue-600 mb-2" size={32} />
              <p className="text-3xl font-bold">{stats.totalStudents}</p>
              <p className="text-gray-600">Students</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <Users className="text-green-600 mb-2" size={32} />
              <p className="text-3xl font-bold">{stats.totalFaculty}</p>
              <p className="text-gray-600">Faculty</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <Download className="text-purple-600 mb-2" size={32} />
              <p className="text-3xl font-bold">{stats.totalDownloads}</p>
              <p className="text-gray-600">Total Downloads</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <FileText className="text-green-600 mb-2" size={32} />
              <p className="text-3xl font-bold">{stats.notesUploadedToday}</p>
              <p className="text-gray-600">Uploaded Today</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <Clock className="text-yellow-600 mb-2" size={32} />
              <p className="text-3xl font-bold">{stats.pendingNotes}</p>
              <p className="text-gray-600">Pending Approval</p>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <Eye className="text-indigo-600 mb-2" size={32} />
              <p className="text-3xl font-bold">{stats.totalViews}</p>
              <p className="text-gray-600">Total Views</p>
            </motion.div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex gap-4 mb-6 border-b">
            <button
              onClick={() => setActiveTab('notes')}
              className={`pb-2 px-4 ${activeTab === 'notes' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
            >
              Pending Notes
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`pb-2 px-4 ${activeTab === 'users' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
            >
              Users Management
            </button>
          </div>

          {activeTab === 'notes' && (
            <div className="space-y-4">
              {pendingNotes.map((note) => (
                <div key={note._id} className="border rounded-lg p-4 flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{note.title}</h3>
                    <p className="text-gray-600 text-sm">{note.description}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {note.subject} • {note.course}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleNoteStatus(note._id, 'approved')}
                      variant="primary"
                      className="text-sm"
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleNoteStatus(note._id, 'rejected')}
                      variant="secondary"
                      className="text-sm"
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
              {pendingNotes.length === 0 && (
                <p className="text-center text-gray-500 py-8">No pending notes</p>
              )}
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <div className="flex gap-4 mb-6 flex-wrap">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  value={filters.role}
                  onChange={(e) => setFilters({ ...filters, role: e.target.value, page: 1 })}
                >
                  <option value="">All Roles</option>
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="admin">Admin</option>
                </select>
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 1 })}
                >
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="blocked">Blocked</option>
                </select>
              </div>

              {loading ? (
                <div className="text-center py-12">Loading users...</div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-semibold">Name</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold">Email</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold">Role</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold">Uploads</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold">Joined</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                          <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {usersData.users.map((user) => (
                          <tr
                            key={user._id}
                            className="border-b hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                {user.avatar ? (
                                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                                ) : (
                                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                                    {user.name[0]}
                                  </div>
                                )}
                                <span className="font-medium">{user.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                user.role === 'admin' ? 'bg-red-100 text-red-700' :
                                user.role === 'faculty' ? 'bg-blue-100 text-blue-700' :
                                'bg-green-100 text-green-700'
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm">{user.stats.uploads}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              {new Date(user.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                              }`}>
                                {user.status || 'active'}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleBlockUser(user._id)}
                                  className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
                                >
                                  {user.status === 'blocked' ? 'Unblock' : 'Block'}
                                </button>
                                <button
                                  onClick={() => handleChangeRole(user._id, user.role)}
                                  className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                                >
                                  Role
                                </button>
                                <button
                                  onClick={() => handleDeleteUser(user._id)}
                                  className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {usersData.users.length === 0 && (
                    <p className="text-center text-gray-500 py-8">No users found</p>
                  )}

                  {usersData.totalUsers > 0 && (
                    <div className="mt-6 flex items-center justify-between">
                      <p className="text-sm text-gray-600">
                        Showing {((usersData.currentPage - 1) * filters.limit) + 1}–
                        {Math.min(usersData.currentPage * filters.limit, usersData.totalUsers)} of {usersData.totalUsers} users
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="secondary"
                          onClick={() => handlePageChange(usersData.currentPage - 1)}
                          disabled={usersData.currentPage === 1}
                          className="flex items-center gap-1"
                        >
                          <ChevronLeft size={16} />
                          Previous
                        </Button>
                        
                        <div className="flex gap-1">
                          {[...Array(Math.min(5, usersData.totalPages))].map((_, i) => {
                            const pageNum = i + 1;
                            return (
                              <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                className={`px-3 py-1 rounded ${
                                  usersData.currentPage === pageNum
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          })}
                        </div>

                        <Button
                          variant="secondary"
                          onClick={() => handlePageChange(usersData.currentPage + 1)}
                          disabled={usersData.currentPage === usersData.totalPages}
                          className="flex items-center gap-1"
                        >
                          Next
                          <ChevronRight size={16} />
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
