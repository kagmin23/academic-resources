import React from 'react';
import { Button, Form, Input, Typography } from 'antd';
// import axios from 'axios';

const { Title, Text } = Typography;


interface FormValues {
  name: string;
  email: string;
  password: string;
  facebook: string;
  linkedin: string;
}

const Setting: React.FC = () => {
//   const handleFormSubmit = async (values: FormValues) => {
//     try {
//       // Gửi dữ liệu đến backend
//       const response = await axios.post('/api/updateSettings', values);
//       console.log('Response:', response.data);
//       // Hiển thị thông báo cho người dùng
//       alert('Update successful!');
//     } catch (error) {
//       // Xử lý lỗi
//       console.error('Error updating settings:', error);
//       alert('An error occurred while updating settings. Please try again later.');
//     }
//   };

  return (
    <div className="flex h-screen">
                <main className="flex-1 p-6 overflow-auto">
                  <h1 className="text-2xl font-bold">Thông tin cá nhân</h1>
                  <p className="text-gray-600">Quản lý thông tin cá nhân của bạn.</p>
                  <div className="mt-4">
                    <section className="mb-6">
                      <div className="mb-4">
                        <h2 className="text-xl font-semibold">Thông tin cơ bản</h2>
                        <p className="text-gray-600">Quản lý tên hiển thị, tên người dùng, bio và avatar của bạn.</p>
                      </div>
                      <div className="space-y-4">
                        <ProfileItem label="Họ và tên" value="Nhu Ngoc (K17 HCM) Le" />
                        <ProfileItem label="Tên người dùng" value="lenhungock17hcm" />
                        <ProfileItem label="Giới thiệu" value="Chưa cập nhật" />
                        <ProfileItem label="Ảnh đại diện" value={<img className="h-16 w-16 rounded-full" src="https://files.fullstack.edu.vn/f8-prod/user_photos/379503/65826d8841a16.jpg" alt="avatar" />} />
                      </div>
                    </section>
                    <section>
                      <div className="mb-4">
                        <h2 className="text-xl font-semibold">Thông tin mạng xã hội</h2>
                        <p className="text-gray-600">Quản lý liên kết tới các trang mạng xã hội của bạn.</p>
                      </div>
                      <div className="space-y-4">
                        <ProfileItem label="Trang web cá nhân" value="Chưa cập nhật" />
                        <ProfileItem label="GitHub" value="Chưa cập nhật" />
                        <ProfileItem label="LinkedIn" value="Chưa cập nhật" />
                        <ProfileItem label="Facebook" value="Chưa cập nhật" />
                        <ProfileItem label="YouTube" value="Chưa cập nhật" />
                        <ProfileItem label="TikTok" value="Chưa cập nhật" />
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
};

const ProfileItem: React.FC<ProfileItemProps> = ({ label, value }) => (
  <div className="flex justify-between items-center p-4 border rounded-lg">
    <Text strong>{label}:</Text>
    <Text>{value}</Text>
  </div>
);

export default Setting;