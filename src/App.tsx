import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import Home from './components/Home';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import NavBar from './components/NavBar';

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={
          <PrivateRoute>
            <AdminPanel />
          </PrivateRoute>
        } />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
