import { CheckCircleOutlined, GoogleOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Radio, DatePicker, notification } from 'antd';
import { RadioChangeEvent } from 'antd/lib';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser, RegisterUser } from '../../services/registerApiService';
import FileUploader from './UploadFile';

const SignUp: React.FC = () => {
  const [form] = Form.useForm();
  const [value, setValue] = useState<string>('student');
  const [current, setCurrent] = useState<number>(0);
  const [formData, setFormData] = useState<any>({});
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([false, false]);
  const [showRadioGroup, setShowRadioGroup] = useState<boolean>(true);
  const [preview, setPreview] = useState<{ avatarUrl?: string; videoUrl?: string }>({});
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

  const handleVideoUploadSuccess = (url: string) => {
    form.setFieldsValue({ videoUrl: url });
    setPreview(prev => ({ ...prev, videoUrl: url }));
  };

  const handleAvatarUploadSuccess = (url: string) => {
    form.setFieldsValue({ avatarUrl: url });
    setPreview(prev => ({ ...prev, avatarUrl: url }));
  };

  const onFinish = async () => {
    try {
      const values = await form.validateFields();

      let userData: RegisterUser;

      if (value === 'student') {
        userData = {
          email: values.email,
          password: values.password,
          name: values.name,
          role: 'student',
          avatar: values.avatarUrl || '',
          phone_number: '',
        };
      } else if (value === 'instructor') {
        userData = {
          email: values.email,
          password: values.password,
          name: values.name,
          role: 'instructor',
          avatar: values.avatarUrl || '',
          video: values.videoUrl || '',
          phone_number: values.phoneNumber || '',
        };
      } else {
        throw new Error('Invalid role');
      }

      const response = await registerUser(userData);
      console.log('Registration successful:', response);

      notification.success({
        message: 'Success',
        description: 'Registration successful. Please check your email.',
      });

      navigate('/verify-email');
    } catch (error) {
      console.error('Registration failed:', error);

      notification.error({
        message: 'Registration Error',
        description: 'There was an error with your registration. Please try again.',
      });
    }
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
            name="confirm_password"
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
            <Button type="primary" onClick={onNext} className="w-full h-10 text-white bg-red-500 hover:bg-red-600">
              Next
            </Button>
          </div>
          <Link to="/sign-up-google">
            <Button type="primary" className="w-full h-10 my-2">
              <GoogleOutlined /> Continue with Google
            </Button>
          </Link>
        </Form>
      ),
    },
    {
      title: 'Update',
      content: (
        <Form form={form} className="space-y-4">
          <div className="flex gap-4 flex-wrap">
            {value === 'instructor' && (
              <Form.Item
                name="video"
                rules={[{ required: true, message: 'Please upload a video!' }]}
              >Video
                <FileUploader type="video" onUploadSuccess={handleVideoUploadSuccess} />
              </Form.Item>
            )}
            <Form.Item
              name="avatar"
            >Avatar
              <FileUploader type="image" onUploadSuccess={handleAvatarUploadSuccess} />
            </Form.Item>
          </div>
          <Form.Item
            name="description"
            rules={[{ required: true, message: 'Please enter the description' }]}
          >
            <Input.TextArea placeholder="Update description" size="large" rows={4} />
          </Form.Item>
          <Form.Item
            name="dob"
            rules={[{ required: true, message: 'Please select your date of birth!' }]}
          >
            <DatePicker placeholder="Select Date of Birth" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="phone_number"
            label="Phone Number"
            rules={[{ required: true, message: 'Please enter the phone number' }]}
          >
            <Input placeholder="Update Phone Number" size="middle" />
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
              className={`w-4 h-4 rounded-full ${completedSteps[index] ? 'bg-green-600' : 'bg-gray-300'}`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
