import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Users, Calendar, Star } from 'lucide-react';
import landingimage from '../assets/healthy-lifestyle-running-outdoors.jpg'; 

const LandingPage = () => {
    return (
        <div className="scroll-container min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
            </div>

            <div className="relative min-h-screen flex items-center justify-center px-4 py-8">
                <div className="max-w-4xl w-full">
                    {/* Main Content Card */}
                    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20">
                        {/* Header Section */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-4 py-2 mb-6">
                                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                                <span className="text-sm font-semibold text-gray-700">India's #1 Sports Platform</span>
                            </div>
                            
                            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                                Welcome to{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600">
                                    QuickCourt
                                </span>
                            </h1>
                            
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                                Discover amazing sports venues, connect with players, and book your favorite courts instantly. 
                                Your sporting journey starts here!
                            </p>
                        </div>

                        {/* Hero Image */}
                        <div className="relative mb-8 group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
                            <img
                                src={landingimage}
                                alt="Sports Court"
                                className="relative rounded-2xl w-full max-w-2xl mx-auto object-cover shadow-xl group-hover:shadow-2xl transition-shadow duration-300"
                            />
                            
                            {/* Floating Stats Cards */}
                            <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg p-4 hidden md:block">
                                <div className="flex items-center space-x-2">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                        <Users className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">10K+</div>
                                        <div className="text-xs text-gray-600">Active Players</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 hidden md:block">
                                <div className="flex items-center space-x-2">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">500+</div>
                                        <div className="text-xs text-gray-600">Venues</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-300">
                                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <MapPin className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-1">Find Venues</h3>
                                <p className="text-sm text-gray-600">Discover courts near you</p>
                            </div>
                            
                            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 transition-all duration-300">
                                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-1">Connect Players</h3>
                                <p className="text-sm text-gray-600">Join the community</p>
                            </div>
                            
                            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all duration-300">
                                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Calendar className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-1">Book Instantly</h3>
                                <p className="text-sm text-gray-600">Reserve your spot</p>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="text-center">
                            <Link to="/Signup">
                                <button className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                                    <span className="mr-2">Start Your Journey</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                    
                                    {/* Button Glow Effect */}
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
                                </button>
                            </Link>
                            
                            <p className="text-sm text-gray-500 mt-4">
                                Join thousands of sports enthusiasts today
                            </p>
                        </div>
                    </div>

                    {/* Bottom Stats */}
                    <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                            <div className="text-2xl font-bold text-gray-900">500+</div>
                            <div className="text-sm text-gray-600">Sports Venues</div>
                        </div>
                        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                            <div className="text-2xl font-bold text-gray-900">10K+</div>
                            <div className="text-sm text-gray-600">Active Users</div>
                        </div>
                        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                            <div className="text-2xl font-bold text-gray-900">15+</div>
                            <div className="text-sm text-gray-600">Sports Types</div>
                        </div>
                        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                            <div className="text-2xl font-bold text-gray-900">4.8★</div>
                            <div className="text-sm text-gray-600">User Rating</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;