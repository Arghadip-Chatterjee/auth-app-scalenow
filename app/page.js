"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';

const Page = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          router.push('/register');
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log(error)
        localStorage.removeItem('token');
        router.push('/register');
      }
    } else {
      router.push('/register');
    }
  }, [router]);


  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (!isAuthenticated) {
    <span className="loading loading-spinner text-secondary"></span>
    return null; // Optionally, you can return a loader or a fallback UI
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">You are Logged in!!</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Page;
