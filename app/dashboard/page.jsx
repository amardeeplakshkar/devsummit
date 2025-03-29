'use client'


import React, { useState } from 'react';
import { posts } from '@/test';
import { FileText, CheckCircle, Clock, User, Calendar, MapPin, Activity, RadicalIcon as FilemedicalIcon } from 'lucide-react';

function App ()
{
    const [verifiedPosts, setVerifiedPosts] = useState(
        new Set(posts.filter(post => post.verified).map(post => post.id))
    );

    const handleVerify = (postId) =>
    {
        setVerifiedPosts(prev =>
        {
            const newSet = new Set(prev);
            newSet.add(postId);
            return newSet;
        });
    };

    return (
        <div suppressHydrationWarning className="min-h-screen bg-gray-50">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">Doctor's Dashboard</h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid gap-6">
                    {posts.map(post => (
                        <div key={post.id} className="bg-white rounded-lg shadow overflow-hidden">
                            <div className="p-6">
                                <div className="flex items-center space-x-4 mb-4">
                                    <img
                                        src={post.patient.profileImage}
                                        alt={post.patient.fullName}
                                        className="h-12 w-12 rounded-full"
                                    />
                                    <div className="flex-grow">
                                        <div className="flex items-center space-x-2">
                                            <User size={16} className="text-gray-500" />
                                            <h3 className="text-lg text-black font-semibold">{post.patient.fullName}</h3>
                                        </div>
                                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                                            <div className="flex items-center space-x-1">
                                                <Calendar size={16} />
                                                <span>{post.createdAt.toLocaleDateString()}</span>
                                            </div>
                                            {post.patient.location && (
                                                <div className="flex items-center space-x-1">
                                                    <MapPin size={16} />
                                                    <span>{post.patient.location}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="ml-auto">
                                        {verifiedPosts.has(post.id) ? (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                                <CheckCircle size={16} className="mr-1" /> Verified
                                            </span>) : (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                                                <Clock size={16} className="mr-1" /> Pending
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-800">Patient Details</h4>
                                            <div className="mt-2 text-gray-400 text-sm">
                                                <p>Age: {post.patient.age}</p>
                                                <p>Gender: {post.patient.gender}</p>
                                                <p>Email: {post.patient.email}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-800">Medical History</h4>
                                            <p className="mt-2 text-gray-400 text-sm">{post.patient.medicalHistory}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500 flex items-center">
                                                <Activity size={16} className="mr-1" /> Current Symptoms
                                            </h4>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {post.patient.symptoms.map((symptom, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs"
                                                    >
                                                        {symptom}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500 flex items-center">
                                                <FilemedicalIcon size={16} className="mr-1" /> Diagnosed Conditions
                                            </h4>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {post.patient.illness.map((illness, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs"
                                                    >
                                                        {illness}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-gray-700 mb-4">{post.content}</p>
                                {Array.isArray(post.imageUrl) ? post.imageUrl.map((img, i) => (
                                    <img key={i} src={img} alt="Medical report" className="w-full h-64 object-cover rounded-lg mb-4" />
                                )) : (
                                    <img src={post.imageUrl} alt="Medical report" className="w-full h-64 object-cover rounded-lg mb-4" />
                                )}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {post.reportUrl.map((url, index) => (
                                        <a
                                            key={index}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                                        >
                                            <FileText size={16} className="mr-1" />
                                            Report {index + 1}
                                        </a>
                                    ))}
                                </div>

                                {!verifiedPosts.has(post.id) && (
                                    <button
                                        onClick={() => handleVerify(post.id)}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        <CheckCircle size={16} className="mr-2" />
                                        Verify Data
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}

export default App