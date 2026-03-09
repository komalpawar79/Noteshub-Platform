import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, User, LogOut, Shield, Search } from 'lucide-react';
import { Button } from './Button';

export function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
          <BookOpen size={32} />
          NotesHub
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/dashboard">
                <Button variant="outline" className="flex items-center gap-2">
                  <Search size={18} />
                  Browse
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="secondary" className="flex items-center gap-2">
                  <User size={18} />
                  Profile
                </Button>
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin">
                  <Button variant="primary" className="flex items-center gap-2">
                    <Shield size={18} />
                    Admin
                  </Button>
                </Link>
              )}
              <Button
                variant="secondary"
                onClick={onLogout}
                className="flex items-center gap-2"
              >
                <LogOut size={18} />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button variant="primary" onClick={() => navigate('/register')}>
                Register
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
