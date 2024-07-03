import { GoogleOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from 'services/loginApiService';
import './stylesLogin.css';

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const formRef = useRef<any>(null);
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   const storedUsers = localStorage.getItem('registeredUsers');
  //   if (storedUsers) {
  //     setUsers(JSON.parse(storedUsers));
  //   }
  // },[]);

    // Fetch data using the token after component mounts
  //   const fetchData = async () => {
  //     const token = getToken();
  //     if (token) {
  //       try {
  //         const response = await axios.get(`${HOST_MAIN}/api/auth`, {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         });
  //         console.log('Data:', response.data);
  //       } catch (error) {
  //         console.error('Fetch error:', error);
  //       }
  //     }
  //   };

  //   fetchData();
  // }, 

  const handleLogin = async (values: {email: string, password: string}) => {
    try {
      // const response = await axios.post(`${HOST_MAIN}/api/auth`, { email, password });
      // const { token, user } = response.data; // Assuming API returns user data with roleId and token
      // message.success(`Welcome, ${user.role}!`);
      // localStorage.setItem('userData', JSON.stringify(user));
      // localStorage.setItem('token', token); // Save the token in local storage
      await loginUser(values.email, values.password);
      const storeUser: any = localStorage.getItem("user")

      if (!storeUser) {
        console.log("Failed to get data local");
      }

      const user = JSON.parse(storeUser);
      console.log(user);
      console.log(user.data.role);
      if (user && user.data) {
      switch (user.data.role) {
        case "admin": // Admin
          navigate('/admin');
          break;
        case "student": // Student
          navigate('/student');
          break;
        case "instructor": // Instructor
          navigate('/instructor');
          break;
        default:
          navigate('/home');
      }
    }

    } catch (error) {
      console.error('Login error:', error);
      message.error('Invalid email or password');
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Validation failed:', errorInfo);
    message.error('Failed to Login! Please check your information.');
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
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
          <Button type="primary" htmlType="submit" className="w-full h-10 bg-red-500 hover:bg-blue-600">
            Login
          </Button>
          <Button icon={<GoogleOutlined />} type="primary" className="flex items-center justify-center w-full h-10">
            Continue with Google
          </Button>
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
