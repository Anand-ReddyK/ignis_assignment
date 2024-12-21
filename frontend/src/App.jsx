import React from 'react';
import { Routes, Route } from 'react-router-dom';
import JobList from './JobList';
import JobDetails from './JobDetails';
import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Search from './components/Search';

const App = () => {
    return (
      <div>
        <Header/>
        <Routes>
            <Route path="/" element={<JobList />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
        </Routes>
        <Footer/>
      </div>
    );
};

export default App;
