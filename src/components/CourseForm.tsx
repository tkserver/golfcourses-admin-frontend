import React, { useState } from 'react';
import axios from 'axios';

const CourseForm: React.FC = () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/courses', courseData, {
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
      <h2>Add New Course</h2>
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

export default CourseForm;
