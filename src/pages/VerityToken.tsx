import { Form, Typography, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { verifyEmailAPI } from 'services/verifyEmailApiService';
import '../assets/mainLogoAcademic.png';

const { Title } = Typography;

interface ErrorResponse {
  message: string;
}

const VerifyToken: React.FC = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  useEffect(() => {
    if (token) {
      const verifyToken = async () => {
        try {
          const res = await verifyEmailAPI(token);
          if (res) {
            notification.success({
              message: "Email Verified Successfully",
              description: "You can now log in to the system.",
            });
            navigate("/log-in");
          }
        } catch (error) {
          notification.error({
            message: "Verification Failed",
            description: "Your token is expired or incorrect!",
          });
        }
      };
      verifyToken();
    }
  }, [token, navigate]);

  const onFinish = async (token: string) => {
    setLoading(true);
    try {
      const response = verifyEmailAPI(token);
      notification.success({
        message: 'Verification Successfully',
        description: 'Your email has been verified successfully!',
      });
      navigate('/log-in');
    } catch (error: unknown) {
      notification.error({
        message: 'Verification Failed',
        description: (error as ErrorResponse).message || 'Invalid verification code. Please try again.',
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
          <img src="mainLogoAcademic.png" alt="Academic" className="w-32 h-32" />
        </div>

        <Title level={3} className="text-center">
          Verify Your Email
        </Title>

        <Form form={form} onFinish={onFinish} className="space-y-4">
          <p
            className="flex items-center justify-center w-full h-12 text-white align-middle bg-green-600 hover:bg-green-700"
          >
            Your account verified! Please Check Your Email in 24h.
          </p>
        </Form>

        <div className="flex flex-row mt-4 text-center text-gray-600">
          <p>Didn't receive the email?</p> <a href="resend-email" className="pl-1 text-blue-600">Resend</a>
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