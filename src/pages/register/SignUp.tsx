import { CheckCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Radio, Upload, notification } from 'antd';
import { RadioChangeEvent } from 'antd/lib';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/registerApiService';

const SignUp: React.FC = () => {
  const [form] = Form.useForm();
  const [value, setValue] = useState<string>('student');
  const [current, setCurrent] = useState<number>(0);
  const [formData, setFormData] = useState<any>({});
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([false, false, false, false, false]);
  const [showRadioGroup, setShowRadioGroup] = useState<boolean>(true);
  const [uploadStatus, setUploadStatus] = useState<string>('uploading');
  const navigate = useNavigate();

  const onChangeRole = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  const onNext = async () => {
    try {
      const values = await form.validateFields();
      const updatedCompletedSteps = [...completedSteps];
      updatedCompletedSteps[current] = true;
      setFormData({ ...formData, ...values });
      setCurrent(current + 1);

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
      const finalFormData = { ...formData, ...values, role: value };

      setFormData(finalFormData);
      
      const response = await registerUser(finalFormData);

      if (response.pendingApproval) {
        notification.info({
          message: 'Pending Approval',
          description: 'Your account is pending approval by an admin. You will be notified once approved.',
        });
        navigate('/pending-approval');
      } else {
        notification.success({
          message: 'Success',
          description: 'You have signed up successfully!',
        });
        navigate('/verify-email');
      }
    } catch (error) {
      console.error('Registration error:', error);
      notification.error({
        message: 'Registration Error',
        description: 'There was an error during the registration process. Please try again.',
      });
    }
  };

  const customUpload = (options: any) => {
    const { file, onSuccess } = options;
    const reader = new FileReader();
    reader.readAsDataURL(file as Blob);
    reader.onload = () => {
      setFormData({ ...formData, avatar: reader.result });
      if (onSuccess) onSuccess('ok');
      setUploadStatus('done');
    };
  };

  const steps = [
    {
      title: 'Sign Up',
      content: (
        <Form form={form} name="signup" initialValues={{ remember: true }} className="space-y-2">
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="User Name" size="middle" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email address!' },
              {
                pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                message: 'Please enter a valid email address!',
              },
            ]}
          >
            <Input placeholder="Email Address" size="middle" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message: 'Your password must be from 8 to 16 characters long, must contain at least 1 uppercase character, lowercase character and numeric character',
              },
            ]}
          >
            <Input.Password placeholder="Password" size="middle" />
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
            <Input.Password placeholder="Confirm Password" size="middle" />
          </Form.Item>
          <Checkbox>Remember me</Checkbox>
          <div className="flex justify-between">
            <Button type="primary" onClick={onNext} className="w-full h-12 text-white bg-red-500 hover:bg-red-600">
              Next
            </Button>
          </div>
        </Form>
      ),
    },
    {
      title: 'Update',
      content: (
        <Form form={form} className="space-y-4">
          <Form.Item name="avatar">
            <Upload customRequest={customUpload} listType="picture" maxCount={1}>
              <Button icon={uploadStatus === 'done' ? <CheckCircleOutlined style={{ color: 'green' }} /> : <UploadOutlined />}>
                {uploadStatus === 'done' ? 'Upload Complete' : 'Upload Avatar'}
              </Button>
            </Upload>
          </Form.Item>

          <Form.Item name="bio">
            <Input.TextArea placeholder="Update bio" size="large" rows={4} />
          </Form.Item>

          <Form.Item
            name="github"
            label="GitHub Link"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
          >
            <Input placeholder="GitHub Link" size="middle" />
          </Form.Item>
          <Form.Item
            name="youtube"
            label="YouTube Link"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
          >
            <Input placeholder="YouTube Link" size="middle" />
          </Form.Item>
          <Form.Item
            name="facebook"
            label="Facebook Link"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
          >
            <Input placeholder="Facebook Link" size="middle" />
          </Form.Item>

          <div className="flex justify-between">
            <Button onClick={onPrev} className="text-blue-400">
              Previous
            </Button>
            <Button type="primary" onClick={onFinish} className="text-white bg-green-600 hover:bg-green-700">
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
          <img src="mainLogoAcademic.png" alt="Academic" className="w-32 h-32" />
        </div>

        <h2 className="text-3xl font-bold text-center">Welcome to Academic</h2>
        <p className="italic text-center text-gray-600">Sign Up and Start Learning!</p>

        {showRadioGroup && (
          <Radio.Group onChange={onChangeRole} value={value}>
            <Radio value="student">Student</Radio>
            <Radio value="instructor">Instructor</Radio>
          </Radio.Group>
        )}

        <div className="steps-content">{steps[current].content}</div>

        <div className="flex justify-center mt-4 space-x-2">
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

        <div className="mt-4 text-center text-gray-600">
          <p>By signing up, you agree to our <a href="#" className="text-blue-600">Terms of Use</a> and <a href="#" className="text-blue-600">Privacy Policy</a>.</p>
        </div>

        <div className="text-center text-gray-600">
          <p>Already have an account? <Link to="/log-in" className="text-blue-600">Login</Link></p>
        </div>

        <footer className="mt-4 text-center text-gray-600">
          <p>© 2024 Academic. All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default SignUp;
