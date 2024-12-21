import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [location, setLocation] = useState('');
    const [jobType, setJobType] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);

    const fetchJobs = async (url = `http://127.0.0.1:8000/api/jobs/?page=${currentPage}`) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            setJobs(data.results);
            setNextPage(data.next);
            setPrevPage(data.previous);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, [currentPage]);

    const handlePagination = (url) => {
        if (url) {
            fetchJobs(url);
            const urlParams = new URL(url).searchParams;
            setCurrentPage(Number(urlParams.get('page')) || 1);
        }
    };

    const filteredJobs = jobs.filter((job) => {
        const jobTitle = job.job_title || '';
        const companyName = job.company_name || '';
        const jobLocation = job.location || '';
        const jobTypeValue = job.employment_details[0] || '';

        return (
            (jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            jobLocation.toLowerCase().includes(location.toLowerCase())) &&
            jobTypeValue.toLowerCase().includes(jobType.toLowerCase())
        );
    });

    return (
        <div className="max-w-screen-xl mx-auto px-4 py-8">
            <div className="bg-white p-8 shadow-md rounded-lg mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Search for Jobs</h2>
                <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col">
                        <label className="text-gray-700 mb-2">Job title</label>
                        <input
                            type="text"
                            className="border border-gray-300 p-2 rounded-md"
                            placeholder="Job title"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-700 mb-2">Location</label>
                        <input
                            type="text"
                            className="border border-gray-300 p-2 rounded-md"
                            placeholder="Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-gray-700 mb-2">Job type</label>
                        <select
                            className="border border-gray-300 p-2 rounded-md"
                            value={jobType}
                            onChange={(e) => setJobType(e.target.value)}
                        >
                            <option value="">Select job type</option>
                            <option value="Full Time">Full-time</option>
                            <option value="Part Time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                            <option value="On Site">On Site</option>
                        </select>
                    </div>
                </form>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
                ) : (
                    <p>No jobs found based on your search criteria.</p>
                )}
            </div>

            <div className="flex justify-center space-x-4">
                <button
                    className={`px-4 py-2 text-white rounded-md ${prevPage ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'}`}
                    onClick={() => handlePagination(prevPage)}
                    disabled={!prevPage}
                >
                    Previous
                </button>
                <button
                    className={`px-4 py-2 text-white rounded-md ${nextPage ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'}`}
                    onClick={() => handlePagination(nextPage)}
                    disabled={!nextPage}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default JobList;
