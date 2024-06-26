"use client";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Form = ({ type }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const router = useRouter();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one digit';
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      return 'Password must contain at least one special character';
    }
    return '';
  };

  const getPasswordStrength = (password) => {
    if (password.length < 6) return 'Weak';
    if (password.length >= 6 && password.length < 10) return 'Medium';
    if (password.length >= 10) return 'Strong';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (type === 'register') {
      const emailValid = validateEmail(email);
      if (!emailValid) {
        setEmailError('Invalid email format');
        return;
      } else {
        setEmailError('');
      }

      const passwordValid = validatePassword(password);
      if (passwordValid) {
        setPasswordError(passwordValid);
        return;
      } else {
        setPasswordError('');
      }
    }

    try {
      const res = await axios.post(`http://localhost:5000/api/auth/${type}`, {
        email,
        name,
        password
      });

      localStorage.setItem('token', res.data.token);
      router.push('/');
    } catch (err) {
      console.error(err);
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (type === 'register') {
      setPasswordStrength(getPasswordStrength(newPassword));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10">
      {type === 'register' && (
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mt-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      )}
      <div>
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          className="w-full p-2 border border-gray-300 rounded mt-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
      </div>
      <div>
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          className="w-full p-2 border border-gray-300 rounded mt-2"
          value={password}
          onChange={handlePasswordChange}
        />
        {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
        {type === 'register' && (
          <p className={`text-sm mt-1 ${
            passwordStrength === 'Weak' ? 'text-red-500' :
            passwordStrength === 'Medium' ? 'text-yellow-500' :
            passwordStrength === 'Strong' ? 'text-green-500' :
            ''
          }`}>Password Strength: {passwordStrength}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded mt-4"
      >
        {type === 'register' ? 'Register' : 'Login'}
      </button>
    </form>
  );
};

export default Form;
