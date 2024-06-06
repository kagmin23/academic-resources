import React from 'react';
import { Button, Form, Input, Typography } from 'antd';
import axios from 'axios';

const { Title } = Typography;

interface FormValues {
  name: string;
  email: string;
  password: string;
  facebook: string;
  linkedin: string;
}

const Setting: React.FC = () => {
  const handleFormSubmit = async (values: FormValues) => {
    try {
      // Gửi dữ liệu đến backend
      const response = await axios.post('/api/updateSettings', values);
      console.log('Response:', response.data);
      // Hiển thị thông báo cho người dùng
      alert('Update successful!');
    } catch (error) {
      // Xử lý lỗi
      console.error('Error updating settings:', error);
      alert('An error occurred while updating settings. Please try again later.');
    }
  };

  return (
    <div style={{ padding: 10 }}>
      <Title level={4}>Settings</Title>
      <Form<FormValues>
        layout="vertical"
        onFinish={handleFormSubmit}
        initialValues={{
          name: '',
          email: '',
          password: '',
          facebook: '',
          linkedin: '',
        }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Facebook"
          name="facebook"
          rules={[{ required: true, message: 'Please input your Facebook profile link!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="LinkedIn"
          name="linkedin"
          rules={[{ required: true, message: 'Please input your LinkedIn profile link!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Setting;
