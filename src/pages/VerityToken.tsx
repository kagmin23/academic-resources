import { Button, Form, Input, Typography, notification } from 'antd';
import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HOST_MAIN } from 'services/apiService';
import '../assets/mainLogoAcademic.png';

const { Title } = Typography;

interface ErrorResponse {
  message: string;
}

const VerifyToken: React.FC = () => {
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm(); // Get the form instance here
  const navigate = useNavigate();

  const sendEmailVerification = async (email: string) => {
    setLoading(true);
    try {
      const response = await axios.post(`${HOST_MAIN}/api/auth/verify-email`, { email });
      setEmailSent(true);
      notification.success({
        message: 'Email Sent',
        description: response.data.message || 'An email with the verification code has been sent to your email address.',
      });
      setRegisteredEmail(email);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        console.log('Failed to send email:', axiosError);
        notification.error({
          message: 'Error',
          description: axiosError.response?.data?.message || 'Failed to send verification email. Please try again later.',
        });
      } else {
        console.error('Unexpected error:', error);
        notification.error({
          message: 'Error',
          description: 'An unexpected error occurred. Please try again later.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const onFinish = (values: any) => {
    // Validate email and verification code
    if (values.email === registeredEmail && values.verificationCode === '123456') {
      // Here you would typically validate against a real verification code sent to the user
      notification.success({
        message: 'Verification Successful',
        description: 'Your email has been verified successfully!',
      });
      navigate('/log-in'); // Redirect to login page after successful verification
    } else {
      notification.error({
        message: 'Verification Failed',
        description: 'Invalid email or verification code. Please try again.',
      });
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 background-transition"></div>

      <div className="relative z-10 flex flex-col justify-center w-full max-w-md p-8 space-y-3 shadow-2xl bg-teal-50 rounded-xl lg:ml-auto lg:mr-16">
        <div className="flex justify-center">
          <img src="mainLogoAcademic.png" alt="Academic" className="w-32 h-32" />
        </div>

        <Title level={3} className="text-center">
          Verify Your Email
        </Title>

        <Form form={form} onFinish={onFinish} className="space-y-4">
          {!emailSent ? (
            <div>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  {
                    pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                    message: 'Please enter a valid email address!',
                  },
                ]}
              >
                <Input
                  placeholder="Re-enter your registration email to authenticate"
                  size="large"
                />
              </Form.Item>
              <Button
                type="primary"
                onClick={() => {
                  const email = form.getFieldValue('email');
                  sendEmailVerification(email);
                }}
                className="w-full h-12 text-white bg-red-500 hover:bg-red-600"
                loading={loading}
              >
                Send Verification Email
              </Button>
            </div>
          ) : (
            <div>
              <Form.Item
                name="verificationCode"
                rules={[{ required: true, message: 'Please input the verification code!' }]}
              >
                <Input
                  placeholder="Verification Code"
                  size="large"
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full h-12 text-white bg-green-600 hover:bg-green-700"
              >
                Verify
              </Button>
            </div>
          )}
        </Form>

        <div className="mt-4 text-center text-gray-600">
          <p>Didn't receive the email? <a href="#" className="text-blue-600">Resend</a></p>
        </div>

        <div className="text-center text-gray-600">
          <p>Already verified? <Link to="/log-in" className="text-blue-600">Login</Link></p>
        </div>

        <footer className="mt-4 text-center text-gray-600">
          <p>© 2024 Academic. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default VerifyToken;
