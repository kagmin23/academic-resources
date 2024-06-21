import { Button, Checkbox, Form, Input, message, Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp: React.FC = () => {
  const [form] = Form.useForm();
  const [value, setValue] = useState<string>('student'); // Initialize with default value 'student'
  const [roleChecked, setRoleChecked] = useState<boolean>(false);

  const onChangeRole = (e: RadioChangeEvent) => {
    console.log('role checked', e.target.value);
    setValue(e.target.value);
    setRoleChecked(true);
  };

  const onFinish = (values: any) => {
    console.log('Received values:', values);
    if (!roleChecked) {
      message.error('Please select your role (Student or Instructor)!');
      return;
    }
    message.success('You have Signed up successfully!');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error('Failed to Sign up! Please check your information.');
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 background-transition"></div>
      
      <div className="relative z-10 flex flex-col justify-center w-full max-w-md p-8 space-y-3 shadow-2xl bg-teal-50 rounded-xl lg:ml-auto lg:mr-16">
        <div className="flex justify-center">
          <img src="mainLogoAcademic.png" alt="Edumy" className="w-32 h-32" />
        </div>
        
        <h2 className="text-3xl font-bold text-center">Welcome to Edumy</h2>
        <p className="italic text-center text-gray-600">Sign Up and Start Learning!</p>
        
        <Radio.Group onChange={onChangeRole} value={value}>
          <Radio value="student">Student</Radio>
          <Radio value="instructor">Instructor</Radio>
        </Radio.Group>
        
        <Form
          form={form}
          name="signup"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="space-y-4"
        >
          <Form.Item
            name="fullName"
            rules={[{ required: true, message: 'Please input your full name!' }]}
          >
            <Input placeholder="User Name" size="large" />
          </Form.Item>
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
          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('The two passwords that you entered do not match!');
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" size="large" />
          </Form.Item>
          
          <Checkbox>
            Remember me
          </Checkbox>
          
          <Button type="primary" htmlType="submit" className="w-full h-12 bg-red-500 hover:bg-red-600">
            Next
          </Button>
        </Form>
        
        <div className="text-center text-gray-600">
          <p>By signing up, you agree to our <a href="#" className="text-blue-600">Terms of Use</a> and <a href="#" className="text-blue-600">Privacy Policy</a>.</p>
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
