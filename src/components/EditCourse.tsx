import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditCourse: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [courseData, setCourseData] = useState({
    name: '',
    url: '',
    coursetype: '',
    address: '',
    city: '',
    county: '',
    state: '',
    zip: '',
    phone: '',
    holes: '',
    region: '',
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/courses/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        setCourseData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourse();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3001/courses/${id}`, courseData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Course</h2>
      {Object.keys(courseData).map((key) => (
        <div key={key}>
          <label>{key}</label>
          <input type="text" name={key} value={courseData[key as keyof typeof courseData]} onChange={handleChange} />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default EditCourse;
