import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CourseForm from './CourseForm';
import CourseList from './CourseList';
import EditCourse from './EditCourse';

const AdminPanel: React.FC = () => {
  return (
    <div>
      <h1>Admin Panel</h1>
      <Routes>
        <Route path="/" element={<CourseList />} />
        <Route path="add" element={<CourseForm />} />
        <Route path="edit/:id" element={<EditCourse />} />
      </Routes>
    </div>
  );
};

export default AdminPanel;
