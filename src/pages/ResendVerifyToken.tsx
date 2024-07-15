import { Button, Form, Input, Typography, notification } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HOST_MAIN } from 'services/apiService';
import mainLogoAcademic from '../assets/mainLogoAcademic.png';

const { Title } = Typography;

interface ErrorResponse {
  message: string;
}

const ResendVerifyToken: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleResend = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${HOST_MAIN}/api/auth/resend-token`, {
        email: email,
      });

      notification.success({
        message: 'Email Resent',
        description: response.data.message || 'Verification email has been resent successfully!',
      });
      navigate("/verify-email")
    } catch (error: unknown) {
      notification.error({
        message: 'Resend Failed',
        description: (error as ErrorResponse).message || 'Failed to resend verification email. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 background-transition"></div>

      <div className="relative z-10 flex flex-col justify-center w-full max-w-md p-8 space-y-3 shadow-2xl bg-teal-50 rounded-xl lg:ml-auto lg:mr-16">
        <div className="flex justify-center">
          <img src={mainLogoAcademic} alt="Academic" className="w-32 h-32" />
        </div>

        <Title level={3} className="text-center">
          Resend Verification Email
        </Title>

        <Form className="space-y-4">
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input
              type="email"
              placeholder="Email"
              size="large"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Button
            type="primary"
            className="w-full h-12 text-white bg-green-600 hover:bg-green-700"
            loading={loading}
            onClick={handleResend}
          >
            Resend Email
          </Button>
        </Form>

        <div className="flex flex-row mt-4 text-center text-gray-600">
          <p>Already verified? <Link to="/log-in" className="pl-1 text-blue-600">Login</Link></p>
        </div>

        <footer className="mt-4 text-center text-gray-600">
          <p>© 2024 Academic. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default ResendVerifyToken;
