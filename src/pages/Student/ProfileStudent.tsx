
import { Button, Form, Input, Typography, notification, message, Modal } from 'antd';
import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import { getUserDetail } from 'services/All/getUserDetailApiService';
import { updateUser } from 'services/All/updateUserApiService';
import { User } from 'models/types';
import { Link, useParams, useNavigate } from 'react-router-dom';

const { Text } = Typography;

interface FormValues {
  name: string;
  avatar: string;
  email: string;
  phone_number: string;
  dob: string;
  description: string;
  video: string;
}

const SettingStudent: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        console.error("userId is undefined");
        message.error('userId is undefined');
        return;
      }
      try {
        const response = await getUserDetail(userId);
        const userData: User = response.data;
        form.setFieldsValue({
          name: userData.name,
          email: userData.email,
          avatar: userData.avatar,
          phone_number: userData.phone_number,
          description: userData.description,
          video: userData.video,
          dob: userData.dob ? new Date(userData.dob).toISOString().split('T')[0] : '',
        });
        setLoading(false);
      } catch (error) {
        console.error("Failed to Fetch User", error);
        notification.error({
          message: 'Error',
          description: 'Failed to fetch user data',
        });
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, form]);

  const prepareUserData = (values: FormValues) => {
    return {
      ...values,
      role: '', 
      status: false, 
    };
  };

  const onFinish = async (values: FormValues) => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    if (!userId) {
      console.error("userId is undefined");
      return;
    }
    try {
      const values = form.getFieldsValue();
      const userData = prepareUserData(values);
      await updateUser(userId, userData);
      notification.success({
        message: 'Success',
        description: 'Updated user data successfully',
      });
      navigate('/student/profile-student');
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update user data',
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      <main className="flex-1 p-6 overflow-auto hide-scrollbar mx-12">
        <h1 className="text-2xl font-bold">Edit My Profile</h1>
        <div className="mt-4">
          
            <Form
              form={form}
              onFinish={onFinish}
              layout="vertical"
              className="space-y-4"
            >
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: 'Please input your Email!' }]}
              >
                <Input />
              </Form.Item>

            
              <Form.Item
                name="phone_number"
                label="Phone Number"
                rules={[{ required: false }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="dob"
                label="Date of Birth"
                rules={[{ required: false }]}
              >
                <Input type="date" />
              </Form.Item>
              <Form.Item
                name="description"
                label="Bio"
                rules={[{ required: false }]}
              >
                <Input.TextArea minLength={6} rows={6} />
              </Form.Item>
              <Form.Item
                name="avatar"
                label="Avatar URL"
                rules={[{ required: false }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="video"
                label="Video URL"
                rules={[{ required: false }]}
              >
                <Input />
              </Form.Item>

              <Form.Item className='pt-7 pb-10 w-full flex justify-center'>
                <Button type="primary" htmlType="submit">Save Change</Button>
                <Link to="/student/profile-student">
                  <Button className='bg-red-600 text-white ml-10'>Cancel Change</Button>
                </Link>
              </Form.Item>
            </Form>
            <Modal title="Confirm Change" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
              <p>Do you want to save the changes?</p>
            </Modal>
          
        </div>
      </main>
    </div>
  );
};



export default SettingStudent;
