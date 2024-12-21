import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
    return (
        <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200">
            <h3 className="text-xl font-semibold text-gray-800">{job.job_title}</h3>
            <p className="text-gray-600">{job.company_name}</p>
            <p className="text-gray-500">{job.location}</p>
            <Link to={`/jobs/${job.id}`} className="text-blue-500 hover:underline mt-2 block">
                View details
            </Link>
        </div>
    );
};

export default JobCard;
