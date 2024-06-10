import { FacebookOutlined, GoogleOutlined, TwitterOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <div className="flex justify-center mb-4">
          <img src="https://demo.createdbycocoon.com/moodle/edumy/splash/asset/footer_logo.png" alt="Academic-Resources" className="h-12" />
        </div>
        <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
        <p className="text-center text-gray-600">Login To Your Academic Account!</p>
        <div className="flex flex-col space-y-2">
          <Button icon={<FacebookOutlined />} type="primary" className="flex items-center justify-center w-full h-12">
            Continue with Facebook
          </Button>
          <Button icon={<TwitterOutlined />} type="primary" className="flex items-center justify-center w-full h-12">
          Continue with Twitter
          </Button>
          <Button icon={<GoogleOutlined />} type="primary" className="flex items-center justify-center w-full h-12">
          Continue with Google
          </Button>
        </div>
        <div className="space-y-4">
          <Input placeholder="Email Address" size="large" />
          <Input.Password placeholder="Password" size="large" />
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-gray-600">Remember Me</span>
            </label>
            <a href="#" className="text-blue-600">Forgot Password?</a>
          </div>
          <Button type="primary" className="w-full h-12 bg-red-500 hover:bg-red-600">Sign In</Button>
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