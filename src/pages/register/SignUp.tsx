import { Button, Checkbox, Input } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const SignUp: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <div className="flex justify-center mb-4">
          <img src="mainLogoAcademic.png" alt="Edumy" className="w-32 h-32" />
        </div>
        <h2 className="text-2xl font-bold text-center">Welcome to Edumy</h2>
        <p className="text-center text-gray-600">Sign Up and Start Learning!</p>
        <div className="space-y-4">
          <Input placeholder="Full Name" size="large" />
          <Input placeholder="Email Address" size="large" />
          <Input.Password placeholder="Password" size="large" />
          <Checkbox>
            I'm in for emails with axciting discounts and personalized recommendations
          </Checkbox>
          <Button type="primary" className="w-full h-12 bg-red-500 hover:bg-red-600">Next</Button>
        </div>
        <div className="text-center text-gray-600">
          <p>By signing up, you agress to our <a href="#" className="text-blue-600">Terms of Use</a> and <a href="#" className="text-blue-600">Privacy Policy</a>.</p>
        </div>
        <div className="text-center text-gray-600">
          <p>Already have an account? <Link to="/log-in" className="text-blue-600">Login</Link></p>
        </div>
        <footer className="text-center text-gray-600">
          <p>© 2024 Edumy. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default SignUp;