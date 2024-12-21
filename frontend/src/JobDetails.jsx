import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [showFullDescription, setShowFullDescription] = useState(false);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/job-detail/${id}`)
            .then((res) => res.json())
            .then((data) => setJob(data))
            .catch((error) => console.error(error));
    }, [id]);

    if (!job) return <p>Loading...</p>;

    const toggleDescription = () => setShowFullDescription(!showFullDescription);

    return (
        <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-screen-lg">
            <div className="space-y-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{job.job_title}</h1>
                    <p className="text-xl text-gray-700 font-semibold">{job.company_name}</p>
                    <p className="text-gray-500">{job.location}</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Job Highlights</h2>
                    <ul className="space-y-2">
                        {job.skills && <li className="text-gray-700"><strong>Skills:</strong> {job.skills.join(', ')}</li>}
                        {job.pay && <li className="text-gray-700"><strong>Pay:</strong> {job.pay}</li>}
                        {job.posted_time && <li className="text-gray-700"><strong>Posted:</strong> {job.posted_time}</li>}
                    </ul>
                </div>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Job Description</h2>
                    <p className="text-gray-700">
                        {showFullDescription ? job.job_description : `${job.job_description.substring(0, 300)}...`}
                    </p>
                    <button onClick={toggleDescription} className="text-blue-600 font-semibold mt-2">
                        {showFullDescription ? 'See Less' : 'See More'}
                    </button>
                </div>

                {job.employment_details && (
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
                        <h2 className="text-2xl font-semibold mb-4">Employment Details</h2>
                        <p className="text-gray-700">{job.employment_details.join(', ')}</p>
                    </div>
                )}
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-md w-full max-w-xs max-h-fit">
                <div className="space-y-4">
                    <div className="flex justify-between text-gray-700">
                        <div><strong>Job type:</strong> {job.type || 'N/A'}</div>
                        <div><strong>Location:</strong> {job.location}</div>
                    </div>
                    <div className="flex justify-between text-gray-700">
                        <div><strong>Workplace:</strong> {job.workplace || 'Remote'}</div>
                        <div><strong>Published on:</strong> {job.posted_time}</div>
                    </div>

                    <div className="text-gray-700">
                        <strong>Location:</strong> {job.location}, {job.region || 'N/A'}
                    </div>
                    <div className="text-gray-700">
                        <strong>Job Type:</strong> {job.type}
                    </div>

                    <a
                        href={job.job_link}
                        className="block text-center bg-blue-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 mt-6"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Apply Now
                    </a>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;
