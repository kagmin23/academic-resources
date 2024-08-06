import { Button, Form, Input, message, notification } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { forgotPassword } from 'services/forgotPasswordApiService';
import './stylesLogin.css';

const ForgotPassword: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleForgotPassword = async (values: any) => {
    try {
      console.log('Forgot password for email:', values.email);
      await forgotPassword(values.email);
      message.success('Password reset instructions sent to your email. Please check your email!');
      form.resetFields();
      navigate("/log-in");
    } catch (error: any) {
      notification.error({
        message: "Failed to Reset Password!",
        description:
          error.message || "Failed to Reset Password. Please try again.",
      })
    };
  };

  const onForgotFailed = (errorInfo: any) => {
    message.error('Failed to Reset Password! Please check your information.');
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 background-transition"></div>
      <div className="relative z-10 flex flex-col justify-center w-full max-w-md p-8 space-y-8 shadow-2xl bg-teal-50 rounded-xl lg:ml-auto lg:mr-16">
        <div className="flex justify-center">
          <img src="mainLogoAcademic.png" alt="Academic" className="w-32 h-32" />
        </div>
        <h2 className="text-3xl font-bold text-center">Forgot Password</h2>
        <p className="italic text-center text-gray-600">Enter your email to reset your password!</p>
        <Form
          form={form}
          name="forgot_password"
          onFinish={handleForgotPassword}
          onFinishFailed={onForgotFailed}
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
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full h-10 bg-red-500 hover:bg-blue-600">
              Reset Password
            </Button>
          </Form.Item>
        </Form>
        <div className="flex justify-between">
          <p className="text-gray-600">Remember your password? <Link to="/log-in" className="text-blue-600">Log In</Link></p>
        </div>
        <footer className="text-center text-gray-600">
          <p>© 2024 Academic. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default ForgotPassword;
