import { Button, Checkbox, Form, Input, Radio, Upload, notification } from 'antd';
import { RadioChangeEvent } from 'antd/lib';
import { UploadOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp: React.FC = () => {
  const [form] = Form.useForm();
  const [value, setValue] = useState<string>('student');
  const [current, setCurrent] = useState<number>(0);
  const [formData, setFormData] = useState<any>({});
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([false, false, false, false]);
  const [showRadioGroup, setShowRadioGroup] = useState<boolean>(true); // State to show/hide radio group

  const onChangeRole = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const onNext = async () => {
    try {
      const values = await form.validateFields();
      const updatedCompletedSteps = [...completedSteps];
      updatedCompletedSteps[current] = true;
      setCompletedSteps(updatedCompletedSteps);
      setFormData({ ...formData, ...values });
      setCurrent(current + 1);

      // Hide radio group when moving to next step after Sign Up
      if (current === 0) {
        setShowRadioGroup(false);
      }
    } catch (error) {
      console.log('Validation Failed:', error);
    }
  };

  const onPrev = () => {
    setCurrent(current - 1);
  };

  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      const updatedCompletedSteps = [...completedSteps];
      updatedCompletedSteps[current] = true;
      setCompletedSteps(updatedCompletedSteps);
      setFormData({ ...formData, ...values });
      console.log('Final Form Data:', formData);

      notification.success({
        message: 'Success',
        description: 'You have signed up successfully!',
      });
    } catch (error) {
      console.log('Validation Failed:', error);
    }
  };

  const skipStep = () => {
    const updatedCompletedSteps = [...completedSteps];
    updatedCompletedSteps[current] = true;
    setCompletedSteps(updatedCompletedSteps);
    setCurrent(current + 1);
  };

  const steps = [
    {
      title: 'Sign Up',
      content: (
        <Form form={form} name="signup" initialValues={{ remember: true }} className="space-y-4">
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
          <Checkbox>Remember me</Checkbox>
          <div className="flex justify-between">
            <Button type="primary" onClick={onNext} className="w-full h-12 bg-red-500 hover:bg-red-600 text-white">
              Next
            </Button>
          </div>
        </Form>
      ),
    },
    {
      title: 'Update Avatar',
      content: (
        <Form form={form} className="space-y-4">
          <Form.Item
            name="avatar"
            rules={[{ required: true, message: 'Please upload your avatar!' }]}
          >
            <Upload name="avatar" listType="picture" maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload Avatar</Button>
            </Upload>
          </Form.Item>
          <div className="flex justify-between">
            <Button onClick={onPrev} className=" text-blue-400 ">
              Previous
            </Button>
            <Button type="primary" onClick={onNext} className="  text-white">
              Next
            </Button>
          </div>
        </Form>
      ),
    },
    {
      title: 'Update Bio',
      content: (
        <Form form={form} className="space-y-4">
          <Form.Item
            name="bio"
            rules={[{ required: true, message: 'Please input your bio!' }]}
          >
            <Input.TextArea placeholder="Bio" size="large" rows={4} />
          </Form.Item>
          <div className="flex justify-between">
            <Button onClick={onPrev} className=" text-blue-400">
              Previous
            </Button>
            <Button type="primary" onClick={onNext} className=" hover:bg-red-600 text-white">
              Next
            </Button>
          </div>
        </Form>
      ),
    },
    {
      title: 'Update Phone',
      content: (
        <Form form={form} className="space-y-4">
          <Form.Item 
            name="phone"
            label="Phone Number"
            rules={[
              { required: true, message: 'Please input your phone number!' },
              
            ]}
          >
            <Input addonBefore={'+84 VN'} placeholder="Phone Number" size="large" />
          </Form.Item>
          <div className="flex justify-between">
            <Button onClick={onPrev} className=" text-blue-400">
              Previous
            </Button>
            <Button type="primary" onClick={onNext} className=" hover:bg-red-600 text-white">
              Next
            </Button>
          </div>
        </Form>
      ),
    },
    {
      title: 'Optional Fields',
      content: (
        <Form form={form} className="space-y-4">
      <Form.Item
        name="github"
        label="GitHub Link"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        <Input placeholder="GitHub Link" size="large" />
      </Form.Item>
      <Form.Item
        name="youtube"
        label="YouTube Link"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        <Input placeholder="YouTube Link" size="large" />
      </Form.Item>
      <Form.Item
        name="facebook"
        label="Facebook Link"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        <Input placeholder="Facebook Link" size="large" />
      </Form.Item>
      <div className="flex justify-between">
        <Button onClick={onPrev} className="text-blue-400">
          Previous
        </Button>
        <Button type="primary" onClick={onFinish} className="bg-red-600 hover:bg-red-600 text-white">
          Finish
        </Button>
      </div>
    </Form>
      ),
    },
  ];

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 background-transition"></div>

      <div className="relative z-10 flex flex-col justify-center w-full max-w-md p-8 space-y-3 shadow-2xl bg-teal-50 rounded-xl lg:ml-auto lg:mr-16">
        <div className="flex justify-center">
          <img src="mainLogoAcademic.png" alt="Edumy" className="w-32 h-32" />
        </div>

        <h2 className="text-3xl font-bold text-center">Welcome to Edumy</h2>
        <p className="italic text-center text-gray-600">Sign Up and Start Learning!</p>

        {showRadioGroup && (
          <Radio.Group onChange={onChangeRole} value={value}>
            <Radio value="student">Student</Radio>
            <Radio value="instructor">Instructor</Radio>
          </Radio.Group>
        )}

        <div className="steps-content">{steps[current].content}</div>

        <div className="flex justify-center space-x-2 mt-4">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                current === index
                  ? 'bg-blue-500'
                  : completedSteps[index]
                  ? 'bg-green-500'
                  : 'bg-gray-400'
              }`}
            />
          ))}
        </div>

        <div className="text-center text-gray-600 mt-4">
          <p>By signing up, you agree to our <a href="#" className="text-blue-600">Terms of Use</a> and <a href="#" className="text-blue-600">Privacy Policy</a>.</p>
        </div>

        <div className="text-center text-gray-600">
          <p>Already have an account? <Link to="/log-in" className="text-blue-600">Login</Link></p>
        </div>

        <footer className="text-center text-gray-600 mt-4">
          <p>© 2024 Edumy. All Rights Reserved.</p>
        </footer>
      </div>

      <div className="absolute top-4 right-4">
        {current < steps.length - 1 && (
          <Button type="text" onClick={skipStep} className="text-blue-600">
            Skip
          </Button>
        )}
      </div>
    </div>
  );
};

export default SignUp;
