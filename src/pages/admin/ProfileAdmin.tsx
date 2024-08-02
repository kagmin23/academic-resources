import { Button, Form, Input, Typography, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { getCurrentUser } from 'services/AdminsApi/UserService';
import 'tailwindcss/tailwind.css';

const { Text } = Typography;
const { TextArea } = Input;

const ProfileAdmin: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await getCurrentUser();
        if (response.success) {
          setCurrentUser(response.data);
        } else {
          notification.error({
            message: 'Error',
            description: 'Failed to fetch current user information',
          });
        }
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'Failed to fetch current user information',
        });
      }
    };

    fetchCurrentUser();
  }, []);

  const handleSave = async (values: any) => {
    notification.success({
      message: 'Success',
      description: 'Profile updated successfully',
    });
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold">Profile Information</h1>
        <p className="text-gray-600">Manage your personal information.</p>
        <div className="mt-4">
          <section>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Basic Information</h2>
              <p className="text-gray-600">Manage your profile details.</p>
            </div>
            <div className="space-y-4">
              <ProfileItem
                label="Name"
                value={currentUser.name}
                onSave={handleSave}
              />
              <ProfileItem
                label="Email"
                value={currentUser.email}
                onSave={handleSave}
              />
              <ProfileItem
                label="Role"
                value={currentUser.role}
                onSave={handleSave}
              />
              <ProfileItem
                label="Date of Birth"
                value={currentUser.dob}
                onSave={handleSave}
              />
            </div>
          </section>
          <section>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Additional Information</h2>
              <p className="text-gray-600">Manage additional profile details.</p>
            </div>
            <div className="space-y-4">
              <ProfileItem
                label="Bio"
                value={currentUser.description || 'Not provided'}
                onSave={handleSave}
                isTextArea
              />
              <ProfileItem
                label="Phone Number"
                value={currentUser.phone_number || 'Not provided'}
                onSave={handleSave}
              />
              <ProfileItem
                label="Avatar"
                value={<img className="w-16 h-16 rounded-full" src={currentUser.avatar} alt="avatar" />}
                onSave={handleSave}
                isFileUpload
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

type ProfileItemProps = {
  label: string;
  value: string | React.ReactNode;
  onSave: (values: any) => void;
  isFileUpload?: boolean;
  isTextArea?: boolean;
};

const ProfileItem: React.FC<ProfileItemProps> = ({
  label,
  value,
  onSave,
  isFileUpload = false,
  isTextArea = false,
}) => {
  const [form] = Form.useForm();

  const handleSave = (values: any) => {
    onSave(values);
  };

  const onFinish = (values: any) => {
    handleSave(values);
  };

  return (
    <div className="p-4 border rounded-lg">
      <h4 className="text-lg font-medium">{label}</h4>
      {isFileUpload ? (
        <Form form={form} name={`update${label}`} onFinish={onFinish} layout="vertical">
          <Form.Item
            name={`new${label.replace(' ', '')}`}
            label={`Update ${label}`}
            rules={[{ required: true, message: `Please select an update for ${label.toLowerCase()}!` }]}
          >
            <Input type="file" accept="image/*" />
          </Form.Item>
          <Form.Item>
            <div className="flex justify-end">
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </div>
          </Form.Item>
        </Form>
      ) : isTextArea ? (
        <Form form={form} name={`update${label}`} onFinish={onFinish} layout="vertical">
          <Form.Item
            name={`new${label.replace(' ', '')}`}
            label={`Update ${label}`}
            rules={[{ required: true, message: `Please input an update for ${label.toLowerCase()}!` }]}
          >
            <TextArea rows={4} defaultValue={value as string} />
          </Form.Item>
          <Form.Item>
            <div className="flex justify-end">
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </div>
          </Form.Item>
        </Form>
      ) : (
        <div className="flex items-center justify-between">
          <Text className="text-gray-800">{value}</Text>
        </div>
      )}
    </div>
  );
};

export default ProfileAdmin;
