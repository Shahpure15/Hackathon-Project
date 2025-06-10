import React, { useState, useEffect } from 'react';
import JobSwiper from '../components/JobSwiper';
import api from '../services/api';
import '../styles/joblist.css';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get('/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleSwipeLeft = (job) => {
    api.post('/jobs/swipe', { jobId: job._id, action: 'reject' });
    console.log('Rejected:', job.position);
  };

  const handleSwipeRight = (job) => {
    api.post('/jobs/swipe', { jobId: job._id, action: 'accept' });
    console.log('Accepted:', job.position);
  };

  if (loading) return <div className="loading">Loading jobs...</div>;

  return (
    <div className="job-list-page">
      <h1>Find Your Next Opportunity</h1>
      <p>Swipe right to save, left to skip</p>
      
      <JobSwiper 
        jobs={jobs} 
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
      />
    </div>
  );
};

export default JobList;