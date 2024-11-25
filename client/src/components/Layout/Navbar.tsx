import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth(); 

  return (
    <nav>
      <ul className="flex space-x-4">
        {isAuthenticated && (
          <>
            <li>
              <Link to="/" className="text-white hover:text-gray-300">Anasayfa</Link>
            </li>
            <li>
              <button
                onClick={logout}
                
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
