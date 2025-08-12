import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="min-h-screen w-screen bg-white flex items-center justify-center px-4 overflow-hidden">
            <div className="text-center p-8 rounded-2xl shadow-lg max-w-3xl w-full ">
                {/* Heading */}
                <h1 className="text-5xl font-extrabold text-crimson mb-6 tracking-wide"> Welcome to
                    <span className="text-5xl font-extrabold text-crimson mb-6 tracking-wide" style={{ color: 'crimson' }}> Quick Court</span>
                </h1>

                {/* Center Image */}
                <div className="flex justify-center mb-6">
                    <img
                        src="https://img.freepik.com/free-vector/background-young-people-watching-match_23-2147693127.jpg?semt=ais_hybrid&w=740"
                        alt="Sports Court"
                        className="rounded-xl w-full max-w-md object-cover"
                    />
                </div>

                {/* Button */}
                <button
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br 
                       focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full"
                >
                    <Link to="/Signup"><h2>Go Ahead</h2></Link>
                </button>
            </div>
        </div>
    );
};

export default LandingPage;