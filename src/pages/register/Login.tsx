import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { Button, Form, Input, message, notification } from 'antd';
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentLogin, loginViaGoogle } from 'services/googleApiLogin';
import { loginUser } from 'services/loginApiService';
import './stylesLogin.css';

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const formRef = useRef<any>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: { email: string, password: string }) => {
    setLoading(true);
    try {
      const user = await loginUser(values.email, values.password);
      if (user) {
        switch (user.role) {
          case 'admin':
            navigate('/admin');
            break;
          case 'student':
            navigate('/student');
            break;
          case 'instructor':
            navigate('/instructor');
            break;
          default:
            navigate('/');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    try {
      const { credential } = credentialResponse;
      if (!credential) {
        throw new Error("Google credential is missing");
      }

      const token = await loginViaGoogle(credential);
      if (token) {
        const user = await getCurrentLogin(token);
        if (user?.data) {
          localStorage.setItem("user", JSON.stringify(user));
          notification.success({
            message: "Login Successfully!",
          });
          navigate("/student");
        }
      }
    } catch (error: any) {
      notification.error({
        message: "Login via Google Failed!",
        description: error.message || "Your Google Account isn't registered!",
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error('Failed to Login! Please check your information.');
  };

  const onError = () => {
    console.error()
  }

  return (
      <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
        {loading && (
          <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
            <div className="flex items-center text-white">
              <svg className="w-5 h-5 mr-3 animate-spin" viewBox="0 0 24 24"></svg>
              <span>Loading...</span>
            </div>
          </div>
        )}
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 background-transition"></div>
        <div className="relative z-10 flex flex-col justify-center w-full max-w-md p-8 space-y-5 shadow-2xl bg-teal-50 rounded-xl lg:ml-auto lg:mr-16">
          <div className="flex justify-center">
            <img src="mainLogoAcademic.png" alt="Academic" className="w-32 h-32" />
          </div>
          <h2 className="text-3xl font-bold text-center">Welcome Back</h2>
          <p className="italic text-center text-gray-600">Login To Your Academic Account!</p>
          <Form
            form={form}
            name="login"
            initialValues={{ remember: true }}
            onFinish={handleLogin}
            onFinishFailed={onFinishFailed}
            className="space-y-4"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please input your email address!' },
                { type: 'email', message: 'Please enter a valid email address!' },
              ]}
            >
              <Input placeholder="Email Address" size="large" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder="Password" size="large" />
            </Form.Item>
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 text-gray-600">Remember Me</span>
              </label>
              <Link to="/forgot-password" className="text-blue-600">Forgot Password?</Link>
            </div>
            <Button type="primary" htmlType="submit" className="w-full h-10 bg-red-500 hover:bg-blue-600" loading={loading}>
              Login
            </Button>

            <GoogleLogin onSuccess={handleGoogleLogin} onError={onError} />
            
          </Form>
          <div className="flex justify-between">
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
