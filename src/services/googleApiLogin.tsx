import { GooglePlusOutlined } from '@ant-design/icons';
import { useGoogleLogin } from '@react-oauth/google';
import { Button, message } from 'antd';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HOST_MAIN } from './apiService';

const GoogleLogin: React.FC = () => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async tokenResponse => {
      try {
        // Lấy thông tin người dùng từ Google
        const userInfoResponse = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`
        );
        const googleId = userInfoResponse.data.id;
        console.log("google_id", googleId);

        // Gửi google_id qua phương thức POST
        await axios.post(`${HOST_MAIN}/api/auth/google`, {
          google_id: googleId,
        });

        // Sử dụng phương thức GET để lấy thông tin người dùng
        const response = await axios.get(`${HOST_MAIN}/api/auth`);
        const { role } = response.data.data;

        // Lưu token vào localStorage nếu có
        const { token } = response.data;
        if (token) {
          localStorage.setItem('token', token);
        }

        // Chuyển hướng dựa trên role
        if (role === 'student') {
          navigate('/student');
        } else if (role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
        
      } catch (error) {
        console.error('Login error:', error);
        message.error('Login failed. Please try again.');
      }
    },
    onError: error => {
      console.log('Login Failed:', error);
      message.error('Google login failed. Please try again.');
    },
  });

  return (
    <Button onClick={() => login()}
      className="w-full text-white bg-blue-500 h-9">
      <GooglePlusOutlined />Continue with Google
    </Button>
  );
};

export default GoogleLogin;
