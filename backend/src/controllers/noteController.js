const Note = require('../models/Note');
const User = require('../models/User');
const cloudinary = require('../config/cloudinary');

exports.uploadNote = async (req, res) => {
  try {
    const { title, description, subject, course, semester, tags } = req.body;
    
    if (!req.file) return res.status(400).json({ message: 'File required' });

    const fileType = req.file.mimetype.includes('pdf') ? 'pdf' : 
                     req.file.mimetype.includes('word') ? 'docx' : 'image';

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'notes', resource_type: 'auto' },
        (error, result) => error ? reject(error) : resolve(result)
      );
      uploadStream.end(req.file.buffer);
    });

    const note = await Note.create({
      title,
      description,
      subject,
      course,
      semester,
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
      fileUrl: result.secure_url,
      fileType,
      cloudinaryId: result.public_id,
      uploadedBy: req.user._id
    });

    await User.findByIdAndUpdate(req.user._id, { 
      $inc: { 'stats.uploads': 1 },
      $push: { uploadedNotes: note._id }
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const { search, subject, course, semester, status, sort } = req.query;
    const query = {};

    if (search) query.$text = { $search: search };
    if (subject) query.subject = { $regex: subject, $options: 'i' };
    if (course) query.course = course;
    if (semester) query.semester = semester;
    if (status) query.status = status;
    else if (req.user.role !== 'admin') query.status = 'approved';

    const sortOptions = sort === 'popular' ? { 'analytics.views': -1 } :
                       sort === 'downloads' ? { 'analytics.downloads': -1 } :
                       sort === 'likes' ? { 'analytics.likes': -1 } :
                       { createdAt: -1 };

    const notes = await Note.find(query)
      .populate('uploadedBy', 'name avatar')
      .sort(sortOptions)
      .limit(50);

    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { $inc: { 'analytics.views': 1 } },
      { new: true }
    ).populate('uploadedBy', 'name avatar department');

    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.likeNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    const isLiked = note.likedBy.includes(req.user._id);

    if (isLiked) {
      note.likedBy.pull(req.user._id);
      note.analytics.likes -= 1;
    } else {
      note.likedBy.push(req.user._id);
      note.analytics.likes += 1;
    }

    await note.save();
    res.json({ likes: note.analytics.likes, isLiked: !isLiked });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.downloadNote = async (req, res) => {
  try {
    await Note.findByIdAndUpdate(req.params.id, { $inc: { 'analytics.downloads': 1 } });
    await User.findByIdAndUpdate(req.user._id, { 
      $inc: { 'stats.downloads': 1 },
      $addToSet: { downloadedNotes: req.params.id }
    });
    res.json({ message: 'Download tracked' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateNoteStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });

    // Remove from cloudinary
    if (note.cloudinaryId) {
      await cloudinary.uploader.destroy(note.cloudinaryId);
    }

    // Remove note ID from all users' uploadedNotes and downloadedNotes arrays
    await User.updateMany(
      { $or: [{ uploadedNotes: note._id }, { downloadedNotes: note._id }] },
      { 
        $pull: { 
          uploadedNotes: note._id,
          downloadedNotes: note._id 
        }
      }
    );

    await note.deleteOne();
    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
