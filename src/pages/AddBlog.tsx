import { UploadOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Upload } from 'antd';
import moment from 'moment';
import React from 'react';

const AddBlog: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="max-w-2xl p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Add Blog</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{
          createdAt: moment(),
        }}
      >
        <Form.Item
          label="Blog Title"
          name="title"
          rules={[{ required: true, message: 'Please input the blog title!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Upload Video or Images"
          name="upload"
          valuePropName="fileList"
          getValueFromEvent={(e) => Array.isArray(e) ? e : e && e.fileList}
        >
          <Upload name="media" listType="picture" beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Created At"
          name="createdAt"
        >
          <DatePicker defaultValue={moment()} disabled />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please input the description!' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddBlog;
