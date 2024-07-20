import { CheckCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { Button, Form, Input, Radio, Upload, message } from 'antd';
import { RadioChangeEvent } from 'antd/lib';
import { User } from 'models/types';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerViaGoogle } from 'services/registerGoogleApiService';
import customUpload from 'utils/upLoad';

const SignUp: React.FC = () => {
  const [form] = Form.useForm();
  const [value, setValue] = useState<string>('student');
  const [current, setCurrent] = useState<number>(0);
  const [formData, setFormData] = useState<User>();
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([false, false, false, false, false]);
  const [showRadioGroup, setShowRadioGroup] = useState<boolean>(true);
  const [uploadStatus, setUploadStatus] = useState<string>('uploading');
  const navigate = useNavigate();

  
  const onChangeRole = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  // const customUpload = (options: any) => {
  //   const { file, onSuccess } = options;
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file as Blob);
  //   reader.onload = () => {
  //     setFormData();
  //     if (onSuccess) onSuccess('ok');
  //     setUploadStatus('done');
  //   };
  // };
  
  
  const handleRegisterGoogleIns = async (credentialResponse: CredentialResponse) => {
    try {
      const { credential } = credentialResponse;
      console.log("credential", credential)
      if (!credential) throw new Error("Google credential is missing");
  
      const dataUser = await registerViaGoogle(credential, "instructor");
      console.log("dataUser", dataUser)
      message.success("Register Succesfully!");
      navigate("/verify-email");
    } catch (error) {
      console.log("Error Occurred: ",error);
      // const errorMessage = error.response?.data?.message || error.message || "Your Google Account isn't registered!";
      // notification.error({
      //   message: "Register via Google Failed!",
      //   description: errorMessage.includes("Email already registered!")
      //     ? "This email is already registered. Please use a different email or log in."
      //     : errorMessage
      // });
    }
  };
  
  

  const onError = () => {
    console.error()
  }

  const steps = [
    {
      title: 'Sign Up',
      content: (
        <Form form={form} name="signup" initialValues={{ remember: true }} className="space-y-2">
          <Form.Item
            name="role"
            rules={[{ required: true, message: 'Please select the role!' }]}
          >
            <Input placeholder="Role" size="middle" />
          </Form.Item>

          <GoogleLogin onSuccess={handleRegisterGoogleIns} onError={onError} />
        </Form>
      ),
    },
    {
      title: 'Update',
      content: (
        <Form form={form} className="space-y-4">
          <Form.Item name="video">
            <Upload customRequest={() => customUpload} listType="picture" maxCount={1}>
              <Button icon={uploadStatus === 'done' ? <CheckCircleOutlined style={{ color: 'green' }} /> : <UploadOutlined />}>
                {uploadStatus === 'done' ? 'Upload Completed' : 'Upload Video'}
              </Button>
            </Upload>
          </Form.Item>


          <Form.Item
            name="description"
            rules={[{ required: true, message: 'Please enter the description' }]}
          >
            <Input.TextArea placeholder="Update description" size="large" rows={4} />
          </Form.Item>
          <Form.Item
            name="phone_number"
            label="Phone Number"
            rules={[{ required: true, message: 'Please enter the phone number' }]}
          >
            <Input placeholder="Update Phone Number" size="small" />
          </Form.Item>
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

        <GoogleLogin onSuccess={handleRegisterGoogleIns} onError={onError} />

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
