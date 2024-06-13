import { MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import React from 'react';

const ForgotPassword: React.FC = () => {
  const onFinish = (values: { email: string }) => {
    console.log('Success:', values);
    message.success('Password reset link has been sent to your email address.');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error('Failed to send password reset link. Please try again.');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center">Forgot Password</h2>
        <Form
          name="forgot_password"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="space-y-4"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email address!' }]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
              type="email"
              className="rounded-md"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Send Reset Link
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
