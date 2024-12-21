// src/pages/Search.jsx
import React, { useState } from 'react';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [location, setLocation] = useState('');
    const [jobType, setJobType] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ searchQuery, location, jobType });
    };

    return (
        <div className="bg-gray-50 py-12">
            <div className="max-w-screen-xl mx-auto px-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Find your dream job</h2>
                <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
                                <option value="full-time">Full-time</option>
                                <option value="part-time">Part-time</option>
                                <option value="contract">Contract</option>
                                <option value="internship">Internship</option>
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200 w-full md:w-auto"
                    >
                        Search
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Search;
