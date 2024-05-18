import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  return (
    <nav className="bg-green-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/admin" className="text-lg font-bold hover:text-purple-300">
          Course Admin
        </NavLink>
        <div className="space-x-4 flex items-center">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `hover:text-purple-300 ${isActive ? 'font-bold underline' : ''}`
            }
          >
            Course List
          </NavLink>
          <NavLink
            to="/admin/add"
            className={({ isActive }) =>
              `hover:text-purple-300 ${isActive ? 'font-bold underline' : ''}`
            }
          >
            Add Course
          </NavLink>
          <button
            onClick={handleLogout}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
