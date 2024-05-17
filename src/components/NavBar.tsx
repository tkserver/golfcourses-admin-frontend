import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Admin Panel</div>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/admin" className="hover:underline">Courses</Link>
          <Link to="/admin/add" className="hover:underline">Add Course</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
