import React, { useEffect, useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { getCurrentUser } from 'services/AdminsApi/getCurrentUserApiService';
import { changeUserPassword } from 'services/All/changePasswordApiService';


const ChangePasswordAd: React.FC = () => {
  const [form] = Form.useForm();
  const [currentUser, setCurrentUser] = useState<any>(null); // Adjust type as per your getCurrentUser response structure

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const response = await getCurrentUser();
      if (response.success) {
        setCurrentUser(response.data);
      } else {
        throw new Error(response.message || 'Failed to fetch current user data.');
      }
    } catch (error) {
      console.error('Fetch current user error:', error);
      notification.error({
        message: 'Fetch Current User Error',
        description: 'Failed to fetch current user data. Please try again later.',
      });
    }
  };

  const onFinish = async (values: any) => {
    const { currentPassword, newPassword, confirmPassword } = values;
    try {
      if (newPassword !== confirmPassword) {
        throw new Error('The new passwords do not match.');
      }
      
      if (!currentUser) {
        throw new Error('Current user data not available.');
      }

      const response = await changeUserPassword(currentUser._id, currentPassword, newPassword);
      
      if (response.success) {
        notification.success({
          message: 'Password Changed',
          description: 'Your password has been changed successfully.',
        });
        form.resetFields();
      } else {
        notification.error({
          message: 'Password Change Failed',
          description: response.message || 'Failed to change password.',
        });
      }
    } catch (error) {
      console.error('Password change error:', error);
      const errorMessage = typeof error === 'string' ? error : 'Failed to change password. Please try again later.';
      notification.error({
        message: 'Password Change Error',
        description: errorMessage,
      });
    }
  };

  return (
    <div className="flex h-screen">
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold">Passwords and security</h1>
        <p className="text-gray-600">Manage passwords and security settings.</p>
        <div className="mt-4">
          <section className="mb-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Change Password</h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
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
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ChangePasswordAd;
