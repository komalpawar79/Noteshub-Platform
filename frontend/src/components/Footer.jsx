import { BookOpen, Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="text-primary" size={32} />
              <span className="text-2xl font-bold">NotesHub</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your university's premier platform for sharing and discovering academic notes.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/dashboard" className="hover:text-primary transition">Browse Notes</Link></li>
              <li><Link to="/upload" className="hover:text-primary transition">Upload Notes</Link></li>
              <li><Link to="/profile" className="hover:text-primary transition">Profile</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-primary transition">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-primary transition">
                <Mail size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition">
                <Github size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition">
                <Linkedin size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition">
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} NotesHub. All rights reserved. Built with ❤️ for students.</p>
        </div>
      </div>
    </footer>
  );
}
