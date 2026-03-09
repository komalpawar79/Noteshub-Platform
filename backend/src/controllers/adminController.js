const User = require('../models/User');
const Note = require('../models/Note');

exports.getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', role = '', status = '' } = req.query;
    
    const query = {};
    
    // Search by name or email
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Filter by role
    if (role) query.role = role;
    
    // Filter by status (treat null/undefined as active)
    if (status) {
      if (status === 'active') {
        query.$or = [{ status: 'active' }, { status: { $exists: false } }, { status: null }];
      } else {
        query.status = status;
      }
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [users, totalUsers] = await Promise.all([
      User.find(query)
        .select('-password')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      User.countDocuments(query)
    ]);
    
    // Set default status for users without status field
    const usersWithStatus = users.map(user => ({
      ...user.toObject(),
      status: user.status || 'active'
    }));
    
    res.json({
      users: usersWithStatus,
      totalUsers,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalUsers / parseInt(limit))
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.blockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    user.status = user.status === 'active' ? 'blocked' : 'active';
    await user.save();
    
    res.json({ message: `User ${user.status}`, user: { ...user.toObject(), password: undefined } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalFaculty = await User.countDocuments({ role: 'faculty' });
    const totalNotes = await Note.countDocuments();
    const pendingNotes = await Note.countDocuments({ status: 'pending' });
    
    // Get today's date range
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const notesUploadedToday = await Note.countDocuments({
      createdAt: { $gte: today, $lt: tomorrow }
    });
    
    const totalViews = await Note.aggregate([
      { $group: { _id: null, total: { $sum: '$analytics.views' } } }
    ]);
    
    const totalDownloads = await Note.aggregate([
      { $group: { _id: null, total: { $sum: '$analytics.downloads' } } }
    ]);

    res.json({
      totalUsers,
      totalStudents,
      totalFaculty,
      totalNotes,
      pendingNotes,
      notesUploadedToday,
      totalViews: totalViews[0]?.total || 0,
      totalDownloads: totalDownloads[0]?.total || 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
