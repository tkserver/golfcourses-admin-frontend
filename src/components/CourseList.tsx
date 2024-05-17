import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3001/courses', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        setCourses(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div>
      <h2>Courses</h2>
      <Link to="/admin/add">Add New Course</Link>
      <ul>
        {courses.map((course: any) => (
          <li key={course.id}>
            {course.name} - <Link to={`/admin/edit/${course.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
