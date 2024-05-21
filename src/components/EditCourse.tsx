import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../axiosConfig';
import { CourseData } from '../types';
import CourseForm from './CourseForm';

const EditCourse: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await apiClient.get(`/courses/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        const data = response.data;
        setCourseData({
          ...data,
          banquet: data.banquet === 'Yes',
          waterhazards: data.waterhazards === 'Yes',
          acceptteetimes: data.acceptteetimes === 'Yes',
          spikes: data.spikes === 'Yes',
          rentals: data.rentals === 'Yes',
          pullcarts: data.pullcarts === 'Yes',
          walking: data.walking === 'Yes',
          bar: data.bar === 'Yes',
          food: data.food === 'Yes',
          homes: data.homes === 'Yes',
        });
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchCourseData();
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
    if (!courseData) return;
    const updatedCourseData = {
      ...courseData,
      banquet: courseData.banquet ? 'Yes' : 'No',
      waterhazards: courseData.waterhazards ? 'Yes' : 'No',
      acceptteetimes: courseData.acceptteetimes ? 'Yes' : 'No',
      spikes: courseData.spikes ? 'Yes' : 'No',
      rentals: courseData.rentals ? 'Yes' : 'No',
      pullcarts: courseData.pullcarts ? 'Yes' : 'No',
      walking: courseData.walking ? 'Yes' : 'No',
      bar: courseData.bar ? 'Yes' : 'No',
      food: courseData.food ? 'Yes' : 'No',
      homes: courseData.homes ? 'Yes' : 'No',
    };

    try {
      await apiClient.put(`/courses/${id}`, updatedCourseData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      setMessage('Course updated successfully!');
      setTimeout(() => {
        navigate('/admin');
      }, 2000);
    } catch (error) {
      console.error('Error updating course:', error);
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
