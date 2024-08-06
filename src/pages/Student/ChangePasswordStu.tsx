import { Button, Form, Input, notification } from 'antd';
import React, { useState } from 'react';
import { getCurrentUser } from 'services/AdminsApi/UserService';
import { changeUserPassword } from 'services/All/changePasswordApiService';

const ChangePasswordStu: React.FC = () => {
  return (
    <div className="flex h-screen">
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold">Passwords and security</h1>
        <p className="text-gray-600">Manage passwords and security settings.</p>
        <div className="mt-4">
          <section className="mb-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Password recovery</h2>
            </div>
            <div className="space-y-4">
              <InfoItem label="Change Password" />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

type InfoItemProps = {
  label: string;
};

const InfoItem: React.FC<InfoItemProps> = ({ label }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [form] = Form.useForm();
  const [userId, setUserId] = useState<string | null>(null);

  const toggleDropdown = async () => {
    setIsDropdownVisible(!isDropdownVisible);

    if (!isDropdownVisible && !userId) {
      try {
        const response = await getCurrentUser();
        setUserId(response.data._id);
      } catch (error: any) {
        notification.error({
          message: "Failed to fetch User information!",
          description:
            error.message || "Failed to fetch User information. Please try again.",
        })
      };
    }
  };

  const onFinish = async (values: any) => {
    console.log('Form values:', values); // Debug log
    const { currentPassword, newPassword, confirmPassword } = values;

    if (newPassword !== confirmPassword) {
      notification.error({
        message: 'Error',
        description: 'The new password and confirm password do not match!',
      });
      return;
    }

    if (!userId) {
      notification.error({
        message: 'Error',
        description: 'User ID not found. Please try again.',
      });
      return;
    }

    try {
      await changeUserPassword(userId, currentPassword, newPassword);
      notification.success({
        message: 'Success',
        description: 'Password has been updated successfully!',
      });
      form.resetFields();
    } catch (error: any) {
      notification.error({
        message: "Failed to Change Password!",
        description:
          error.message || "Failed to Change Password. Please try again.",
      })
    };
  };

  return (
    <div className="p-4 border rounded-lg">
      <div className="flex justify-between items-center cursor-pointer" onClick={toggleDropdown}>
        <div>
          <h4 className="text-lg font-medium">{label}</h4>
          <span className="text-gray-800">Haven't changed password yet</span>
        </div>
        <Button className="text-gray-500">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" className={`h-5 w-5 transition-transform ${isDropdownVisible ? 'rotate-90' : ''}`} role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path fill="currentColor" d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"></path>
          </svg>
        </Button>
      </div>
      {isDropdownVisible && (
        <div className="mt-4 space-y-4">
          <Form form={form} name="change_password" onFinish={onFinish} layout="vertical">
            <Form.Item
              name="currentPassword"
              label="Current Password"
              rules={[{ required: true, message: 'Please input your current password!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="newPassword"
              label="New Password"
              rules={[{ required: true, message: 'Please input your new password!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={['newPassword']}
              hasFeedback
              rules={[
                { required: true, message: 'Please confirm your new password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="ml-8 text-lg font-semibold">
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
};

export default ChangePasswordStu;
