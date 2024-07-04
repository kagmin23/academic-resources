import { GoogleOutlined } from '@ant-design/icons';
import { useGoogleLogin } from '@react-oauth/google';
import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleLogin: React.FC = () => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      console.log('Login Success:', tokenResponse);
      // Xử lý tokenResponse ở đây (ví dụ, gửi nó tới server của bạn)
      navigate('/student'); // Điều hướng đến trang student
    },
    onError: error => {
      console.log('Login Failed:', error);
    },
  });

  return (
    <Button onClick={() => login()}
            className="w-full h-10 text-white bg-blue-500">
      <GoogleOutlined />Continue with Google
    </Button>
  );
};

export default GoogleLogin;

