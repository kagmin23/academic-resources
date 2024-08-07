import { Button, Form, Input, Modal, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from 'services/AdminsApi/UserService';
import { updateUser } from 'services/All/updateUserApiService';
import 'tailwindcss/tailwind.css';

interface FormValues {
  name: string;
  avatar: string;
  email: string;
  phone_number: string;
  dob: string;
  description: string;
  video: string;
}

const ProfileAdmin: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await getCurrentUser();
        if (response.success) {
          setCurrentUser(response.data);
          form.setFieldsValue(response.data);
        } else {
          notification.error({
            message: 'Error',
            description: 'Failed to fetch current user information',
          });
        }
      } catch (error: any) {
        notification.error({
          message: "Failed to get User information!",
          description: error.message || "Failed to get User information. Please try again.",
        });
      }
    };

    fetchCurrentUser();
  }, [form]);

  const handleSave = () => {
    setIsModalOpen(true);
  };

  const prepareUserData = (values: FormValues) => {
    return {
      ...values,
      role: '', 
      status: false, 
    };
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    try {
      const values = form.getFieldsValue();
      const userData = prepareUserData(values);
      await updateUser(currentUser._id, userData);
      notification.success({
        message: 'Success',
        description: 'Updated user data successfully',
      });
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

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      <main className="flex-1 p-6 mx-12 overflow-auto hide-scrollbar">
        <h1 className="text-2xl font-bold">Edit My Profile</h1>
        <div className="mt-4">
          <Form
            form={form}
            onFinish={handleSave}
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

            <Form.Item className='flex justify-center w-full pb-10 pt-7'>
              <Button type="primary" htmlType="submit">Save Changes</Button>
              <Link to="/instructor/profile-instructor/">
                <Button className='ml-10 text-white bg-red-600'>Cancel Changes</Button>
              </Link>
            </Form.Item>
          </Form>
          <Modal
            title="Confirm Change"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>Do you want to save the changes?</p>
          </Modal>
        </div>
      </main>
    </div>
  );
};

export default ProfileAdmin;
