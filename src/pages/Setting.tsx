import React, { useState } from 'react';
import { Button, Form, Input, Typography, Modal } from 'antd';

const { Text } = Typography;

interface FormValues {
  name: string;
  email: string;
  password: string;
  facebook: string;
  linkedin: string;
}

const Setting: React.FC = () => {
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

  const [editingItem, setEditingItem] = useState<string | null>(null);
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
    setEditingItem(label);
    setItemStates({ ...itemStates, [label]: true });
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setItemStates({ ...itemStates, [editingItem!]: false });
  };

  const handleEmailSave = (values: any) => {
    setEmail(values.newEmail);
    handleCancelEdit();
  };

  const handleUserNameSave = (values: any) => {
    setUserName(values.newUserName);
    handleCancelEdit();
  };

  const handleBioSave = (values: any) => {
    setBio(values.newBio);
    handleCancelEdit();
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
    handleCancelEdit();
  };

  const handleSocialLinkSave = (values: any) => {
    setSocialLinks({ ...socialLinks, [editingItem!]: values.newSocialLink });
    handleCancelEdit();
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
              <ProfileItem
                label="Email"
                value={email}
                isOpen={itemStates['Email']}
                onItemClick={handleItemClick}
                onSave={handleEmailSave}
              />
              <ProfileItem
                label="User Name"
                value={userName}
                isOpen={itemStates['User Name']}
                onItemClick={handleItemClick}
                onSave={handleUserNameSave}
              />
              <ProfileItem
                label="Giới thiệu"
                value={bio}
                isOpen={itemStates['Giới thiệu']}
                onItemClick={handleItemClick}
                onSave={handleBioSave}
              />
              <ProfileItem
                label="Avatar"
                value={<img className="h-16 w-16 rounded-full" src={avatar} alt="avatar" />}
                isOpen={itemStates['Avatar']}
                onItemClick={handleItemClick}
                onSave={handleAvatarChange}
                isFileUpload
              />
            </div>
          </section>
          <section>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Social network information</h2>
              <p className="text-gray-600">Manage links to your social media sites.</p>
            </div>
            <div className="space-y-4">
              {Object.keys(socialLinks).map((social) => (
                <ProfileItem
                  key={social}
                  label={social}
                  value={socialLinks[social]}
                  isOpen={itemStates[social]}
                  onItemClick={handleItemClick}
                  onSave={handleSocialLinkSave}
                />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Modal
        title={`Edit ${editingItem}`}
        visible={editingItem !== null}
        onCancel={handleCancelEdit}
        footer={[
          <Button key="cancel" onClick={handleCancelEdit}>
            Cancel
          </Button>,
          <Button
            key="save"
            type="primary"
            htmlType="submit"
            form={`${editingItem?.toLowerCase().replace(' ', '')}Form`}
          >
            Save
          </Button>,
        ]}
      >
        <Form
          id={`${editingItem?.toLowerCase().replace(' ', '')}Form`}
          onFinish={editingItem === 'Email' ? handleEmailSave : editingItem === 'User Name' ? handleUserNameSave : editingItem === 'Giới thiệu' ? handleBioSave : handleSocialLinkSave}
        >
          {editingItem !== 'Avatar' && (
            <Form.Item
              name={`new${editingItem?.replace(' ', '')}`}
              label={`New ${editingItem}`}
              rules={[{ required: true, message: `Please input your new ${editingItem?.toLowerCase()}!` }]}
            >
              <Input />
            </Form.Item>
          )}
          {editingItem === 'Avatar' && (
            <Form.Item
              name={`newAvatar`}
              label={` Avatar`}
              rules={[{ required: true, message: 'Please select an avatar!' }]}
            >
              <Input type="file" accept="image/*" onChange={handleAvatarChange} />
            </Form.Item>
          )}
        </Form>
      </Modal>
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
  const handleSave = (values: any) => {
    onSave(values);
  };

  return (
    <div>
      <div className="flex justify-between items-center cursor-pointer" onClick={() => onItemClick(label)}>
        <div>
          <h4 className="text-lg font-medium">{label}</h4>
          <Text className="text-gray-800">{value}</Text>
        </div>
        <button className="text-gray-500">
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
        </button>
      </div>
      {isOpen && (
        <div className="mt-4 space-y-4">
          <Form onFinish={handleSave}>
            {isFileUpload ? (
              <Form.Item
                name="newFile"
                label={`New ${label}`}
                rules={[{ required: true, message: `Please select a new ${label.toLowerCase()}!` }]}
              >
                <Input type="file" accept="image/*" />
              </Form.Item>
            ) : (
              <Form.Item
                name={`new${label.replace(' ', '')}`}
                label={`New ${label}`}
                rules={[{ required: true, message: `Please input your new ${label.toLowerCase()}!` }]}
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

export default Setting;
