import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Upload, Search, Users, Download, Heart, Eye, Shield, Clock, Award } from 'lucide-react';
import { Button } from '@/components/Button';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <BookOpen className="mx-auto text-primary" size={80} />
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
            Welcome to <span className="text-primary">NotesHub</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-12">
            Your university's premier platform for sharing and discovering academic notes
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              onClick={() => navigate('/dashboard')}
              className="text-lg px-8 py-4 flex items-center gap-2"
            >
              <Search size={24} />
              Browse Notes
            </Button>
            <Button 
              onClick={() => navigate('/upload')}
              variant="outline"
              className="text-lg px-8 py-4 flex items-center gap-2"
            >
              <Upload size={24} />
              Add Notes
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <Upload className="mx-auto mb-4 text-primary" size={48} />
              <h3 className="text-xl font-bold mb-2">Upload Notes</h3>
              <p className="text-gray-600">Share your notes with fellow students</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <Search className="mx-auto mb-4 text-primary" size={48} />
              <h3 className="text-xl font-bold mb-2">Search & Filter</h3>
              <p className="text-gray-600">Find notes by subject, course, or tags</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <Users className="mx-auto mb-4 text-primary" size={48} />
              <h3 className="text-xl font-bold mb-2">Collaborate</h3>
              <p className="text-gray-600">Learn together with your community</p>
            </motion.div>
          </div>
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 max-w-5xl mx-auto"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-center text-gray-600 mb-16">Get started in three simple steps</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Create Account</h3>
              <p className="text-gray-600">Sign up as a student or faculty member. It's quick and free!</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Upload or Browse</h3>
              <p className="text-gray-600">Share your notes or search for notes by subject, course, and semester</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Download & Learn</h3>
              <p className="text-gray-600">Preview, download, comment, and like notes to help your peers</p>
            </div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 max-w-6xl mx-auto"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">Why Choose NotesHub?</h2>
          <p className="text-center text-gray-600 mb-16">Everything you need for collaborative learning</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Download className="text-primary mb-3" size={36} />
              <h3 className="font-bold text-lg mb-2">Easy Downloads</h3>
              <p className="text-gray-600 text-sm">Download notes in PDF, DOCX, and image formats instantly</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Eye className="text-primary mb-3" size={36} />
              <h3 className="font-bold text-lg mb-2">Preview Before Download</h3>
              <p className="text-gray-600 text-sm">View PDF and image notes directly in your browser</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Heart className="text-primary mb-3" size={36} />
              <h3 className="font-bold text-lg mb-2">Like & Comment</h3>
              <p className="text-gray-600 text-sm">Engage with notes through likes and comments</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Shield className="text-primary mb-3" size={36} />
              <h3 className="font-bold text-lg mb-2">Quality Control</h3>
              <p className="text-gray-600 text-sm">Admin-approved notes ensure high-quality content</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Clock className="text-primary mb-3" size={36} />
              <h3 className="font-bold text-lg mb-2">Always Updated</h3>
              <p className="text-gray-600 text-sm">Get access to the latest notes uploaded by your peers</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Award className="text-primary mb-3" size={36} />
              <h3 className="font-bold text-lg mb-2">Track Your Stats</h3>
              <p className="text-gray-600 text-sm">Monitor your uploads, downloads, and contributions</p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 text-center bg-primary text-white rounded-2xl p-8 md:p-12 max-w-4xl mx-auto"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Start Sharing Knowledge Today</h2>
          <p className="text-base md:text-xl mb-8 opacity-90">
            Upload your notes, help your peers, and build a stronger academic community together
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">10,000+</div>
              <div className="opacity-90">Notes Shared</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">5,000+</div>
              <div className="opacity-90">Active Students</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="opacity-90">Courses Covered</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
