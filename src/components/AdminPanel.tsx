import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import CourseList from './CourseList';
import CourseForm from './CourseForm';
import EditCourse from './EditCourse';
import axios from 'axios';

interface CourseData {
  name: string;
  url: string;
  coursetype: string;
  address: string;
  city: string;
  county: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  web: string;
  twitter: string;
  facebook: string;
  instagram: string | null;
  rangeballs: string;
  tips: string;
  season: string;
  cost: string;
  proshop: string;
  tees: string;
  balls: string;
  instruction: string;
  locker: string;
  par: string;
  yards: string;
  rating: string;
  slope: string;
  architect: string;
  caddie: string;
  banquet: boolean;
  signaturehole: string;
  opened: string;
  greens: string;
  fairways: string;
  waterhazards: boolean;
  sandbunkers: string;
  holes: string;
  yardagemarkers: string;
  acceptteetimes: boolean;
  earliestcallteetime: string;
  trainingfacilities: string;
  onsitegolfpro: string;
  spikes: boolean;
  guests: string;
  access: string;
  discounts: string;
  rentals: boolean;
  pullcarts: string;
  walking: string;
  restaurant: string;
  bar: boolean;
  hours: string;
  food: boolean;
  availableproducts: string;
  homes: boolean;
  latitude: string;
  longitude: string;
  description: string;
  scorecard: string;
  image: string;
  region: string;
}

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
    pullcarts: '',
    walking: '',
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

  return (
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
  );
};

export default AdminPanel;
