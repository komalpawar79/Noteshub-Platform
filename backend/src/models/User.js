const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'faculty', 'admin'], default: 'student' },
  status: { type: String, enum: ['active', 'blocked'], default: 'active' },
  avatar: String,
  bio: String,
  department: String,
  semester: Number,
  interests: [String],
  subscribedSubjects: [String],
  uploadedNotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
  downloadedNotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  stats: {
    uploads: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 }
  }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
