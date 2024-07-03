import { Button, Form, Input, Typography, notification } from 'antd';
import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

const { Text } = Typography;

interface FormValues {
  name: string;
  email: string;
  password: string;
  facebook: string;
  linkedin: string;
}

const SettingStudent: React.FC = () => {
  const [itemStates, setItemStates] = useState<{ [key: string]: boolean }>({
    'Email': false,
    'User Name': false,
    'Giới thiệu': false,
    'Avatar': false,
    'GitHub': false,
    'Facebook': false,
    'YouTube': false,
    'TikTok': false,
  });

  const [email, setEmail] = useState<string>('ngoclnse@gmail.com');
  const [userName, setUserName] = useState<string>('lenhungock17hcm');
  const [bio, setBio] = useState<string>('Chưa cập nhật');
  const [avatar, setAvatar] = useState<string>('https://files.fullstack.edu.vn/f8-prod/user_photos/379503/65826d8841a16.jpg');
  const [socialLinks, setSocialLinks] = useState<{ [key: string]: string }>({
    'GitHub': '',
    'Facebook': '',
    'YouTube': '',
    'TikTok': '',
  });

  const handleItemClick = (label: string) => {
    setItemStates({ ...itemStates, [label]: !itemStates[label] });
  };

  const handleEmailSave = (values: any) => {
    setEmail(values.newEmail);
    setItemStates({ ...itemStates, 'Email': false });
    notification.success({
      message: 'Success',
      description: 'Updated Email successfully',
    });
  };

  const handleUserNameSave = (values: any) => {
    setUserName(values.newUserName);
    setItemStates({ ...itemStates, 'User Name': false });
    notification.success({
      message: 'Success',
      description: 'Updated User Name successfully',
    });
  };

  const handleBioSave = (values: any) => {
    setBio(values.newBio);
    setItemStates({ ...itemStates, 'Giới thiệu': false });
    notification.success({
      message: 'Success',
      description: 'Updated Bio successfully',
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target) {
          setAvatar(e.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    setItemStates({ ...itemStates, 'Avatar': false });
    notification.success({
      message: 'Success',
      description: 'Updated Avatar successfully',
    });
  };

  const handleSocialLinkSave = (values: any) => {
    setSocialLinks({ ...socialLinks, [values.label]: values.newSocialLink });
    setItemStates({ ...itemStates, [values.label]: false });
    notification.success({
      message: 'Success',
      description: `Updated ${values.label} successfully`,
    });
  };

  return (
    <div className="flex h-screen">
      <main className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold">Information</h1>
        <p className="text-gray-600">Manage your personal information.</p>
        <div className="mt-4">
          <section className="mb-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Basic information</h2>
              <p className="text-gray-600">Manage your display name, username, bio and avatar.</p>
            </div>
            <div className="space-y-4">
              <div className='p-4 border rounded-lg'>
                <ProfileItem
                  label="Email"
                  value={email}
                  isOpen={itemStates['Email']}
                  onItemClick={handleItemClick}
                  onSave={handleEmailSave}
                />
              </div>
              <div className='p-4 border rounded-lg'>
                <ProfileItem
                  label="User Name"
                  value={userName}
                  isOpen={itemStates['User Name']}
                  onItemClick={handleItemClick}
                  onSave={handleUserNameSave}
                />
              </div>
              <div className='p-4 border rounded-lg'>
                <ProfileItem
                  label="Bio"
                  value={bio}
                  isOpen={itemStates['Giới thiệu']}
                  onItemClick={handleItemClick}
                  onSave={handleBioSave}
                />
              </div>
              <div className='p-4 border rounded-lg'>
                <ProfileItem
                  label="Avatar"
                  value={<img className="w-16 h-16 rounded-full" src={avatar} alt="avatar" />}
                  isOpen={itemStates['Avatar']}
                  onItemClick={handleItemClick}
                  onSave={handleAvatarChange}
                  isFileUpload
                />
              </div>
            </div>
          </section>
          <section>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Social network information</h2>
              <p className="text-gray-600">Manage links to your social media sites.</p>
            </div>
            <div className="space-y-4">
              {Object.keys(socialLinks).map((social) => (
                <div className='p-4 border rounded-lg' key={social}>
                  <ProfileItem
                    label={social}
                    value={socialLinks[social]}
                    isOpen={itemStates[social]}
                    onItemClick={handleItemClick}
                    onSave={handleSocialLinkSave}
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

type ProfileItemProps = {
  label: string;
  value: React.ReactNode;
  isOpen: boolean;
  onItemClick: (label: string) => void;
  onSave: (values: any) => void;
  isFileUpload?: boolean;
};

const ProfileItem: React.FC<ProfileItemProps> = ({
  label,
  value,
  isOpen,
  onItemClick,
  onSave,
  isFileUpload = false,
}) => {
  const [form] = Form.useForm();

  const handleSave = (values: any) => {
    onSave(values);
  };

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    notification.success({
      message: 'Success',
      description: `Updated ${label} successfully`,
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between cursor-pointer" onClick={() => onItemClick(label)}>
        <div>
          <h4 className="text-lg font-medium">{label}</h4>
          <Text className="text-gray-800">{value}</Text>
        </div>
        <Button className="text-gray-500">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="chevron-right"
            className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-90' : ''}`}
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path
              fill="currentColor"
              d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
            ></path>
          </svg>
        </Button>
      </div>
      {isOpen && (
        <div className="mt-4 space-y-4">
          <Form form={form} name={`update${label.replace(' ', '')}`} onFinish={onFinish}>
            {isFileUpload ? (
              <Form.Item
                name="updateFile"
                label={`Update ${label}`}
                rules={[{ required: true, message: `Please select an update ${label.toLowerCase()}!` }]}
              >
                <Input type="file" accept="image/*" />
              </Form.Item>
            ) : (
              <Form.Item
                name={`update${label.replace(' ', '')}`}
                label={`Update ${label}`}
                rules={[{ required: true, message: `Please input your update ${label.toLowerCase()}!` }]}
              >
                <Input />
              </Form.Item>
            )}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
};

export default SettingStudent;
