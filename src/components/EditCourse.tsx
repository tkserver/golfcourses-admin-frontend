import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import CourseForm from './CourseForm';

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

const EditCourse: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/courses/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        const data = response.data;
        setCourseData({
          ...data,
          banquet: data.banquet === 'Yes',
          waterhazards: data.waterhazards === 'Yes',
          acceptteetimes: data.acceptteetimes === 'Yes',
          spikes: data.spikes === 'Yes',
          rentals: data.rentals === 'Yes',
          bar: data.bar === 'Yes',
          food: data.food === 'Yes',
          homes: data.homes === 'Yes',
        });
        console.log("Fetched course data:", data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourse();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setCourseData((prevData) => ({
        ...prevData!,
        [name]: checked,
      }));
    } else {
      setCourseData((prevData) => ({
        ...prevData!,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedCourseData = {
      ...courseData!,
      instagram: courseData!.instagram || null,
      banquet: courseData!.banquet ? 'Yes' : 'No',
      waterhazards: courseData!.waterhazards ? 'Yes' : 'No',
      acceptteetimes: courseData!.acceptteetimes ? 'Yes' : 'No',
      spikes: courseData!.spikes ? 'Yes' : 'No',
      rentals: courseData!.rentals ? 'Yes' : 'No',
      bar: courseData!.bar ? 'Yes' : 'No',
      food: courseData!.food ? 'Yes' : 'No',
      homes: courseData!.homes ? 'Yes' : 'No',
    };

    try {
      await axios.put(`http://localhost:3001/courses/${id}`, updatedCourseData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      setMessage('Course updated successfully!');
      setTimeout(() => {
        navigate('/admin');
      }, 2000);
    } catch (error) {
      console.error(error);
      setMessage('Failed to update course.');
    }
  };

  if (!courseData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Edit Course</h2>
      <CourseForm
        courseData={courseData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        message={message}
      />
    </div>
  );
};

export default EditCourse;
