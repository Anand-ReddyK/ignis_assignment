import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg';

const Header = () => {
    return (
        <header className="bg-white shadow-md">
            <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center">
                    <img src={logo} alt="Company Logo" className="h-10 mr-4" />
                    <Link to="/" className="text-xl font-semibold text-gray-800">Company Name</Link>
                </div>

                <nav className="space-x-6">
                    <Link to="#" className="text-gray-600 hover:text-gray-800">For job seekers</Link>
                    <Link to="#" className="text-gray-600 hover:text-gray-800">For employers</Link>
                    <Link to="#" className="text-gray-600 hover:text-gray-800">Pricing</Link>
                    <Link to="#" className="text-gray-600 hover:text-gray-800">Post a job</Link>
                    <Link 
                        to="#" 
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Sign up
                    </Link>
                    <Link 
                        to="#" 
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Log in
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
