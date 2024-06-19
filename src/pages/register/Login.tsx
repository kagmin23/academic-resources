import { GoogleOutlined } from '@ant-design/icons';
import { Button, Input, message } from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const users = [
    {
      email: "admin",
      password: "123",
      roleId: 1, // SET ROlE
      role: "Admin",
    },
    {
      email: "user",
      password: "123",
      roleId: 2,
      role: "Student",
    },
    {
      email: "instructor",
      password: "123",
      roleId: 3,
      role: "Instructor",
    },
  ];

  const handleLogin = () => {
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      message.success(`Welcome, ${user.role}!`);
      localStorage.setItem('userData', JSON.stringify(user));
  
      switch (user.role) {
        case 'Guest':
          navigate('/guest');
          break;
        case 'Student':
          navigate('/student');
          break;
        case 'Instructor':
          navigate('/instructor');
          break;
        case 'Admin':
          navigate('/admin');
          break;
        default:
          navigate('/home');
      }
    } else {
      message.error('Invalid email or password');
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <div className="flex justify-center mb-4">
          <img src="mainLogoAcademic.png" alt="Academic-Resources" className="w-32 h-32" />
        </div>
        <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
        <p className="text-center text-gray-600">Login To Your Academic Account!</p>

        <div className="space-y-4">
          <Input placeholder="Email Address" size="large" value={email} onChange={e => setEmail(e.target.value)} />
          <Input.Password placeholder="Password" size="large" value={password} onChange={e => setPassword(e.target.value)} />
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-gray-600">Remember Me</span>
            </label>
            <a href="/forgot-password" className="text-blue-600">Forgot Password?</a>
          </div>
          
          <div className="flex flex-col space-y-2">
          <Button icon={<GoogleOutlined />} type="primary" className="flex items-center justify-center w-full h-12">
          Continue with Google
          </Button>
        </div>
          <Button type="primary" className="w-full h-12 bg-red-500 hover:bg-red-600" onClick={handleLogin}>Login </Button>
        </div>

        <div className="flex justify-between mt-4">
          <p className="text-gray-600">Don't have an account? <Link to="/sign-up" className="text-blue-600">Sign Up</Link></p>
        </div>
        <footer className="text-center text-gray-600">
          <p>© 2024 Academic. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Login;