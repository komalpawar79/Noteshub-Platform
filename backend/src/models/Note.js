const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  subject: { type: String, required: true },
  course: { type: String, required: true },
  semester: Number,
  tags: [String],
  fileUrl: { type: String, required: true },
  fileType: { type: String, enum: ['pdf', 'docx', 'image'], required: true },
  cloudinaryId: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  analytics: {
    views: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 },
    likes: { type: Number, default: 0 }
  },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  rating: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 }
}, { timestamps: true });

noteSchema.index({ title: 'text', description: 'text', tags: 'text' });
noteSchema.index({ subject: 1, course: 1, semester: 1 });

module.exports = mongoose.model('Note', noteSchema);
