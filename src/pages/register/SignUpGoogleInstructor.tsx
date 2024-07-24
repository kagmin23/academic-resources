import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { Button, Form, Input, Radio, message } from 'antd';
import { RadioChangeEvent } from 'antd/lib';
import { User } from 'models/types';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerViaGoogle } from 'services/registerGoogleApiService';

const SignUp: React.FC = () => {
  const [form] = Form.useForm();
  const [value, setValue] = useState<string>("");
  const [formData, setFormData] = useState<User>();
  const [showRadioGroup, setShowRadioGroup] = useState<boolean>(true);
  const navigate = useNavigate();

  const onChangeRole = (e: RadioChangeEvent) => {
    setValue(e.target.value);
    // Reset form fields when role changes
    form.resetFields();
  };

  const handleRegisterGoogle = async (credentialResponse: CredentialResponse) => {
    try {
      if (value === 'instructor') {
        console.log("value", value)
        const fieldsValue = form.getFieldsValue();
        const { description, phone_number, video } = fieldsValue;

        if (!description || !phone_number || !video) {
          message.error("Please provide all required fields for instructor registration.");
          return;
        }
      }
      const { credential } = credentialResponse;
      console.log("credential", credential)
      if (!credential) throw new Error("Google credential is missing");



      const dataUser = await registerViaGoogle(credential, value);
      console.log("dataUser", dataUser)
      message.success("Register Successfully!");
      navigate("/verify-email");
    } catch (error) {
      console.log("Error Occurred: ", error);
      message.error("Registration failed.");
    }
  };

  const onError = () => {
    console.error();
  };

  //   const handleVideoChange = (file: RcFile) => {
  //     setFormData(prev => ({
  //       ...prev,
  //       video: file
  //     }));
  //     return false; // Prevent automatic upload
  //   };

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
          <Form form={form} layout="vertical">
            <Form.Item>
              <Radio.Group onChange={onChangeRole} value={value}>
                <Radio value="student">Student</Radio>
                <Radio value="instructor">Instructor</Radio>
              </Radio.Group>
            </Form.Item>

            {value === 'instructor' && (
              <>
                <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please input your description!' }]}>
                  <Input.TextArea />
                </Form.Item>
                <Form.Item name="phone_number" label="Phone Number" rules={[{ required: true, message: 'Please input your phone number!' }]}>
                  <Input />
                </Form.Item>
                <Form.Item
                  name="video"
                  rules={[{ required: false, message: 'Please enter the video URL' }]}>
                  <Input placeholder="Video URL" size="middle" />
                </Form.Item>
                <p className="text-xs italic font-bold text-red-500">* Please enter the information for Instructor required before!</p>
              </>
            )}

            <Form.Item>
              <GoogleLogin onSuccess={handleRegisterGoogle} onError={onError} />
            </Form.Item>
          </Form>
        )}

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
