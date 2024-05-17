import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';

interface Course {
  id: number;
  name: string;
  coursetype: string;
  address: string;
  city: string;
  phone: string;
  region: string;
  holes: string;
}

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState<number | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3001/courses', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        const sortedCourses: Course[] = response.data.sort((a: Course, b: Course) => 
          a.name.localeCompare(b.name)
        );
        setCourses(sortedCourses);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourses();
  }, []);

  const handleDelete = async () => {
    if (courseToDelete === null) return;

    try {
      await axios.delete(`http://localhost:3001/courses/${courseToDelete}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      setCourses(courses.filter((course) => course.id !== courseToDelete));
      closeModal();
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const openModal = (id: number) => {
    setCourseToDelete(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCourseToDelete(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Courses</h2>
      <Link to="/admin/add" className="inline-block mb-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 shadow-md">
        Add New Course
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.map((course: Course) => (
        <div key={course.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-2">{course.name}</h3>
            <p className="text-gray-700 mb-1"><strong>Type:</strong> {course.coursetype}</p>
            <p className="text-gray-700 mb-1"><strong>Location:</strong> {course.city}, {course.region}</p>
            <p className="text-gray-700 mb-1"><strong>Phone:</strong> {course.phone}</p>
          </div>
          <div className="bg-gray-100 px-6 py-4 flex justify-end space-x-3">
            <Link to={`/admin/edit/${course.id}`} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 inline-flex items-center">
              <FontAwesomeIcon icon={faEdit} className="mr-2" />
              Edit
            </Link>
            <button onClick={() => openModal(course.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 inline-flex items-center">
              <FontAwesomeIcon icon={faTrash} className="mr-2" />
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      onConfirm={handleDelete}
      title="Confirm Delete"
      message="Are you sure you want to delete this course?"
    />
  </div>
);
};

export default CourseList;
