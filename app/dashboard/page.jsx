'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import CreatePost from '@/components/CreatePost';
import { posts as mockPosts } from '@/test';
import { FileText, CheckCircle, Clock, User, Calendar, MapPin, Activity } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNavigation } from "@/components/ui/carousel";

export default function Dashboard ()
{
    const { user } = useUser();
    const [userRole, setUserRole] = useState(null);
    const [posts, setPosts] = useState(mockPosts);
    const [verifiedPosts, setVerifiedPosts] = useState(
        new Set(posts.filter(post => post.verified).map(post => post.id))
    );

    useEffect(() =>
    {
        const fetchUserRole = async () =>
        {
            try
            {
                const response = await fetch(`/api/user/role?clerkId=${user?.id}`);
                if (response.ok)
                {
                    const data = await response.json();
                    setUserRole(data.role); // "patient", "doctor", or "ngo"
                }
            } catch (error)
            {
                console.error("Error fetching user role:", error);
            }
        };

        if (user) fetchUserRole();
    }, [user]);


    const fetchPosts = async () =>
    {
        try
        {
            const response = await fetch('/api/posts');
            if (response.ok)
            {
                const data = await response.json();
                setPosts(data);
                setVerifiedPosts(new Set(data.filter(post => post.verified).map(post => post.id)));
            }
        } catch (error)
        {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() =>
    {
        fetchPosts();
        const interval = setInterval(fetchPosts, 30000);
        return () => clearInterval(interval);
    }, []);

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
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        {userRole === 'patient' ? "My Posts" :
                            userRole === 'doctor' ? "Patient Posts" :
                                userRole === 'ngo' ? "Verified Posts" : "Dashboard"}
                    </h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {userRole === 'patient' && (
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
                        <CreatePost />
                    </div>
                )}
                <button onClick={() => fetchPosts()}>
                    Refresh Posts
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                            <h3 className="text-lg font-semibold">{post.patient.fullName}</h3>
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
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                                                <Clock size={16} className="mr-1" /> Pending
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Patient Details</h4>
                                            <div className="mt-2 text-sm text-gray-700">
                                                <p>Age: {post.patient.age}</p>
                                                <p>Gender: {post.patient.gender}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Medical History</h4>
                                            <p className="mt-2 text-sm text-gray-700">{post.patient.medicalHistory}</p>
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
                                    </div>
                                </div>

                                <p className="text-gray-700 mb-4">{post.content}</p>

                                <Carousel>
                                    <CarouselContent>
                                        {Array.isArray(post.imageUrl) ? post.imageUrl.map((img, i) => (
                                            <CarouselItem key={i}>
                                                <img src={img} alt="Medical report" className="w-full h-64 object-cover rounded-lg mb-4" />
                                            </CarouselItem>
                                        )) : (
                                            <CarouselItem>
                                                <img src={post.imageUrl} alt="Medical report" className="w-full h-64 object-cover rounded-lg mb-4" />
                                            </CarouselItem>
                                        )}
                                    </CarouselContent>
                                    <CarouselNavigation className="absolute -bottom-20 left-auto top-auto w-full justify-end gap-2" />
                                </Carousel>

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

                                {userRole === 'doctor' && !verifiedPosts.has(post.id) && (
                                    <button
                                        onClick={() => handleVerify(post.id)}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        <CheckCircle size={16} className="mr-2" />
                                        Verify Post
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}