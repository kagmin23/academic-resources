import React, { useState } from 'react';
import { Button, Form, Input, Upload, message, Space } from 'antd';
import { UploadOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;

export default function AddCourse() {
  const [fileLists, setFileLists] = useState({});

  const handleSectionUpload = (info : any, sectionIndex : any) => {
    const newFileList = [...info.fileList];
   
   
  };

  const onFinish = (values : any) => {
    console.log('Received values of form: ', values);
    console.log('Uploaded files: ', fileLists);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-100 rounded-xl shadow-md space-y-4">
      <div className="flex justify-center items-center mb-4">
        <h1 className="text-2xl font-bold">Add New Course</h1>
      </div>
      <Form
        name="add_course"
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="courseName"
          label="Course Name"
          rules={[{ required: true, message: 'Please input the course name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="duration"
          label="Duration"
          rules={[{ required: true, message: 'Please input the course duration!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: 'Please input the course price!' }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="upload"
          label="Upload Course Video"
          valuePropName="fileList"
          getValueFromEvent={(e) => e.fileList}
        >
          <Upload
            name="video"
            accept=".mp4"
            onChange={(info) => handleSectionUpload(info, 'course')}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.List name="content">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                <div key={key} className="flex flex-col md:flex-row md:items-end space-y-2 md:space-y-0 md:space-x-2 mb-4">
                  <Form.Item
                    {...restField}
                    name={[name, 'section']}
                    className="flex-1"
                    rules={[{ required: true, message: 'Please input the section name!' }]}
                  >
                    <Input placeholder="Section Name" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'details']}
                    className="flex-1"
                    rules={[{ required: true, message: 'Please input the section details!' }]}
                  >
                    <TextArea placeholder="Section Details" rows={3} style={{ resize: 'none' }} />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'upload']}
                    valuePropName="fileList"
                    getValueFromEvent={(e) => e.fileList}
                    className="flex-1"
                  >
                    <Upload
                      name="video"
                      accept=".mp4"
                      onChange={(info) => handleSectionUpload(info, index)}
                    >
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} className=" cursor-pointer text-red-600 text-2xl" />
                </div>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Section
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full md:w-auto p-5 text-xl">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
