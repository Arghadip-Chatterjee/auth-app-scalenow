"use client";
import Link from 'next/link';
import Form from '../../components/Form';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

const Login = () => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const decoded = jwtDecode(token);
            // Check if token is expired
            if (decoded.exp * 1000 >= Date.now()) {
              router.push('/'); // Redirect to home page if authenticated
            }
          } catch (error) {
            console.error('Invalid token:', error);
            localStorage.removeItem('token');
          }
        }
      }, [router]);

    return (
        <div className="flex-col items-center justify-center">
            <div className='mx-auto p-5 m-5'>
                <Form type="login" />
            </div>
            <div className="flex items-center justify-center">
                <p>Don&apos;t have an account?</p>
                <Link href="/register">
                    <h3 className="text-blue-500">Register</h3>
                </Link>
            </div>
        </div>
    );
};

export default Login;