require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  department: String,
  stats: {
    uploads: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 },
    contributions: { type: Number, default: 0 }
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const existingAdmin = await User.findOne({ email: 'admin@noteshub.com' });
    if (existingAdmin) {
      console.log('❌ Admin already exists!');
      console.log('Email: admin@noteshub.com');
      console.log('Password: admin123');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);

    await User.create({
      name: 'Admin User',
      email: 'admin@noteshub.com',
      password: hashedPassword,
      role: 'admin',
      department: 'Administration',
      stats: { uploads: 0, downloads: 0 }
    });

    console.log('✅ Admin user created successfully!');
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Admin Login Credentials:');
    console.log('Email:    admin@noteshub.com');
    console.log('Password: admin123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createAdmin();
