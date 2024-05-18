import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import CourseList from './CourseList';
import CourseForm from './CourseForm';
import EditCourse from './EditCourse';
import axios from 'axios';
import { CourseData } from '../types';

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState<CourseData>({
    name: '',
    url: '',
    coursetype: '',
    address: '',
    city: '',
    county: '',
    state: '',
    zip: '',
    country: '',
    phone: '',
    web: '',
    twitter: '',
    facebook: '',
    instagram: null,
    rangeballs: '',
    tips: '',
    season: '',
    cost: '',
    proshop: '',
    tees: '',
    balls: '',
    instruction: '',
    locker: '',
    par: '',
    yards: '',
    rating: '',
    slope: '',
    architect: '',
    caddie: '',
    banquet: false,
    signaturehole: '',
    opened: '',
    greens: '',
    fairways: '',
    waterhazards: false,
    sandbunkers: '',
    holes: '',
    yardagemarkers: '',
    acceptteetimes: false,
    earliestcallteetime: '',
    trainingfacilities: '',
    onsitegolfpro: '',
    spikes: false,
    guests: '',
    access: '',
    discounts: '',
    rentals: false,
    pullcarts: false,
    walking: false,
    restaurant: '',
    bar: false,
    hours: '',
    food: false,
    availableproducts: '',
    homes: false,
    latitude: '',
    longitude: '',
    description: '',
    scorecard: '',
    image: '',
    region: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setCourseData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setCourseData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/courses', courseData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      setMessage('Course added successfully!');
      setTimeout(() => {
        setMessage('');
        navigate('/admin');
      }, 2000);
    } catch (error) {
      console.error('Error adding course:', error);
      setMessage('Failed to add course.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  return (
    <div>
      <nav className="bg-green-600 p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/admin" className="text-lg font-bold hover:text-purple-300">Course Admin</Link>
          <div className="space-x-4 flex items-center">
            <Link to="/admin" className="hover:text-purple-300">Course List</Link>
            <Link to="/admin/add" className="hover:text-purple-300">Add Course</Link>
            <button onClick={handleLogout} className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800">Logout</button>
          </div>
        </div>
      </nav>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<CourseList />} />
          <Route
            path="add"
            element={
              <CourseForm
                courseData={courseData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                message={message}
              />
            }
          />
          <Route path="edit/:id" element={<EditCourse />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPanel;
