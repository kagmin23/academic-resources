import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, Layout, Modal, Table, Typography, Upload } from 'antd';
import { AlignType } from 'rc-table/lib/interface';
import React, { useState } from 'react';

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

interface DataType {
  key: string;
  image: string;
  name_certificate: string;
  name_course: string;
  created_at: string;
}

const initialDataSource: DataType[] = [
  {
    key: '1',
    image: 'https://via.placeholder.com/50',
    name_certificate: 'certificate',
    name_course: 'course1',
    created_at: '2024-01-01',
  },
  {
    key: '2',
    image: 'https://via.placeholder.com/50',
    name_certificate: 'bé khỏe bé ngoan',
    name_course: 'course2',
    created_at: '2024-01-02',
  },
  {
    key: '3',
    image: 'https://via.placeholder.com/50',
    name_certificate: 'certificate',
    name_course: 'course3',
    created_at: '2024-01-03',
  },
  {
    key: '4',
    image: 'https://via.placeholder.com/50',
    name_certificate: 'certificate',
    name_course: 'course4',
    created_at: '2024-01-04',
  },
  {
    key: '5',
    image: 'https://via.placeholder.com/50',
    name_certificate: 'certificate 4',
    name_course: 'course5',
    created_at: '2024-01-05',
  },
  {
    key: '6',
    image: 'https://via.placeholder.com/50',
    name_certificate: 'certificate',
    name_course: 'course6',
    created_at: '2024-01-06',
  },
];

const ManagerCertificate: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>(initialDataSource);
  const [filteredDataSource, setFilteredDataSource] = useState<DataType[]>(initialDataSource);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<DataType | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [form] = Form.useForm();

  const handleAddNewCourse = () => {
    setIsEditMode(false);
    setIsModalVisible(true);
    form.resetFields();
    setImageUrl('');
  };

  const handleEdit = (record: DataType) => {
    setIsEditMode(true);
    setCurrentRecord(record);
    setIsModalVisible(true);
    form.setFieldsValue(record);
    setImageUrl(record.image);
  };

  const handleDelete = (record: DataType) => {
    const newDataSource = dataSource.filter(item => item.key !== record.key);
    setDataSource(newDataSource);
    setFilteredDataSource(newDataSource);
  };

  const handleSave = () => {
    form
      .validateFields()
      .then(values => {
        form.resetFields();
        const newRecord = {
          ...values,
          image: imageUrl || 'https://via.placeholder.com/50',
          key: isEditMode && currentRecord ? currentRecord.key : (dataSource.length + 1).toString(),
          created_at: isEditMode && currentRecord ? currentRecord.created_at : new Date().toISOString().split('T')[0],
        };

        const newDataSource = isEditMode
          ? dataSource.map(item => (item.key === currentRecord?.key ? newRecord : item))
          : [...dataSource, newRecord];

        setDataSource(newDataSource);
        setFilteredDataSource(newDataSource);
        setIsModalVisible(false);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleSearch = (value: string) => {
    const filteredData = dataSource.filter(item =>
      item.name_certificate.toLowerCase().includes(value.toLowerCase()) ||
      item.name_course.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDataSource(filteredData);
  };

  const handleUploadChange = (info: any) => {
    if (info.file.status === 'done') {
      setImageUrl(info.file.response.url); // Assuming the server returns the uploaded image URL in the response
    }
  };

  const columns = [
    {
      title: 'Course',
      dataIndex: 'image',
      key: 'image',
      render: (text: string) => <img src={text} alt="item" className="w-12 h-12" />,
    },
    {
      title: 'Certificate Name',
      dataIndex: 'name_certificate',
      key: 'name_certificate',
    },
    {
      title: 'Course Name',
      dataIndex: 'name_course',
      key: 'name_course',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center' as AlignType,
      render: (text: string, record: DataType) => (
        <div style={{ textAlign: 'center' }}>
          <Button
            icon={<EditOutlined />}
            className="mr-2 text-white bg-blue-500"
            onClick={() => handleEdit(record)}
          ></Button>
          <Button
            icon={<DeleteOutlined />}
            className="mr-2 text-white bg-red-600"
            onClick={() => handleDelete(record)}
          ></Button>
        </div>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout className="site-layout">
        <Header className="p-0 bg-white">
          <div className="flex flex-wrap items-center justify-end gap-4 p-4 bg-[#939fb1]">
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined />}
              onChange={e => handleSearch(e.target.value)}
              style={{ width: 300 }}
            />
            <div className="h-6 mx-4 border-r"></div>
            <Button className="font-bold text-white bg-red-500" onClick={handleAddNewCourse}>
              <PlusCircleOutlined />
              Add New Certificate
            </Button>
          </div>
        </Header>
        <Content className="m-4">
          <Table dataSource={filteredDataSource} columns={columns} rowKey="key" />
        </Content>
        <Footer style={{ textAlign: 'center' }}>Academic_Resources ©2024 Created by My Team</Footer>
      </Layout>

      <Modal
        title={isEditMode ? 'Edit Course' : 'Add New Course'}
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Image">
            <Upload
              name="image"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="/upload" // Your upload URL
              onChange={handleUploadChange}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
              ) : (
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
          <Form.Item
            name="name_certificate"
            label="Name Certificate"
            rules={[{ required: true, message: 'Please input the name certificate!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name_course"
            label="Name Course"
            rules={[{ required: true, message: 'Please input the name course!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default ManagerCertificate;
