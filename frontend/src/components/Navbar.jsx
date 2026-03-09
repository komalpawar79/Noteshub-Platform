import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, User, LogOut, Shield, Search, Menu, X } from 'lucide-react';
import { Button } from './Button';
import { useState } from 'react';

export function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-lg md:text-2xl font-bold text-primary">
            <BookOpen size={24} className="md:w-8 md:h-8" />
            <span>NotesHub</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-2">
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="outline" className="flex items-center gap-2 text-sm px-3 py-2">
                    <Search size={16} />
                    Browse
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="secondary" className="flex items-center gap-2 text-sm px-3 py-2">
                    <User size={16} />
                    Profile
                  </Button>
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin">
                    <Button variant="primary" className="flex items-center gap-2 text-sm px-3 py-2">
                      <Shield size={16} />
                      Admin
                    </Button>
                  </Link>
                )}
                <Button
                  variant="secondary"
                  onClick={onLogout}
                  className="flex items-center gap-2 text-sm px-3 py-2"
                >
                  <LogOut size={16} />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={() => navigate('/login')} className="text-sm px-4 py-2">
                  Login
                </Button>
                <Button variant="primary" onClick={() => navigate('/register')} className="text-sm px-4 py-2">
                  Register
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-2">
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                    <Search size={18} />
                    Browse
                  </Button>
                </Link>
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="secondary" className="w-full flex items-center justify-center gap-2">
                    <User size={18} />
                    Profile
                  </Button>
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="primary" className="w-full flex items-center justify-center gap-2">
                      <Shield size={18} />
                      Admin
                    </Button>
                  </Link>
                )}
                <Button
                  variant="secondary"
                  onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <LogOut size={18} />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}
                  className="w-full"
                >
                  Login
                </Button>
                <Button 
                  variant="primary" 
                  onClick={() => { navigate('/register'); setMobileMenuOpen(false); }}
                  className="w-full"
                >
                  Register
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
