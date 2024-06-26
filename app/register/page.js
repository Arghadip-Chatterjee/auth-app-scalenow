"use client";
import Link from 'next/link';
import Form from '../../components/Form';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

const Register = () => {
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
                <Form type="register" />
            </div>
            <div className="flex items-center justify-center">
                <p>Have an account?</p>
                <Link href="/login">
                    <h3 className="text-blue-500">Login</h3>
                </Link>
            </div>
        </div>
    );
};

export default Register;
