import {
  CameraOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FunnelPlotOutlined,
  LaptopOutlined,
  PieChartOutlined,
  PlusCircleOutlined,
  UserOutlined,
  UsergroupAddOutlined
} from '@ant-design/icons';
import { Button, Form, Input, Layout, Modal, Table } from 'antd';
import { AlignType } from 'rc-table/lib/interface';
import React, { useState } from 'react';

const { Header, Content, Footer } = Layout;

interface DataType {
  key: string;
  image: string;
  title: string;
  created_at: string;
}

const initialDataSource: DataType[] = [
  {
    key: '1',
    image: 'https://via.placeholder.com/50',
    title: 'Item 1',
    created_at: '2024-01-01'
  },
  {
    key: '2',
    image: 'https://via.placeholder.com/50',
    title: 'Item 2',
    created_at: '2024-01-02'
  },
  {
    key: '3',
    image: 'https://via.placeholder.com/50',
    title: 'Item 3',
    created_at: '2024-01-03'
  },
  {
    key: '4',
    image: 'https://via.placeholder.com/50',
    title: 'Item 4',
    created_at: '2024-01-04'
  },
  {
    key: '5',
    image: 'https://via.placeholder.com/50',
    title: 'Item 5',
    created_at: '2024-01-05'
  },
  {
    key: '6',
    image: 'https://via.placeholder.com/50',
    title: 'Item 6',
    created_at: '2024-01-06'
  },
];

const CourseAdmin: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>(initialDataSource);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<DataType | null>(null);
  const [form] = Form.useForm();

  const handleAddNewCourse = () => {
    setIsEditMode(false);
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleEdit = (record: DataType) => {
    setIsEditMode(true);
    setCurrentRecord(record);
    setIsModalVisible(true);
    form.setFieldsValue(record);
  };

  const handleDelete = (record: DataType) => {
    const newDataSource = dataSource.filter(item => item.key !== record.key);
    setDataSource(newDataSource);
  };

  const handleSave = () => {
    form
      .validateFields()
      .then(values => {
        form.resetFields();
        if (isEditMode && currentRecord) {
          const newDataSource = dataSource.map(item =>
            item.key === currentRecord.key ? { ...item, ...values } : item
          );
          setDataSource(newDataSource);
        } else {
          const newRecord = {
            ...values,
            key: (dataSource.length + 1).toString(),
            created_at: new Date().toISOString().split('T')[0],
          };
          setDataSource([...dataSource, newRecord]);
        }
        setIsModalVisible(false);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const columns = [
    {
      title: 'Course',
      dataIndex: 'image',
      key: 'image',
      render: (text: string) => <img src={text} alt="item" className="w-12 h-12" />,
    },
    {
      title: 'Description',
      dataIndex: 'title',
      key: 'title',
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
          <Button icon={<EditOutlined />} className="mr-2 text-white bg-blue-500" onClick={() => handleEdit(record)}></Button>
          <Button icon={<DeleteOutlined />} className="mr-2 text-white bg-red-600" onClick={() => handleDelete(record)}></Button>
          <Button icon={<EyeOutlined />} onClick={() => handleEdit(record)}></Button>
        </div>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout className="site-layout">
        <Header className="p-0 bg-white">
          <div className="flex flex-wrap items-center justify-center gap-4 p-4 bg-[#939fb1]">
            <Button icon={<FunnelPlotOutlined />} className="flex items-center">
              All
            </Button>
            <Button icon={<PieChartOutlined />} className="flex items-center">
              Development
            </Button>
            <Button icon={<UserOutlined />} className="flex items-center">
              Business
            </Button>
            <Button icon={<LaptopOutlined />} className="flex items-center">
              IT & Software
            </Button>
            <Button icon={<UsergroupAddOutlined />} className="flex items-center">
              Marketing
            </Button>
            <Button icon={<CameraOutlined />} className="flex items-center">
              Photography
            </Button>
            <div className="h-6 mx-4 border-r"></div>
            <Button className="font-bold text-white bg-red-500" onClick={handleAddNewCourse}>
              <PlusCircleOutlined />
              Add New Course
            </Button>
          </div>
        </Header>
        <Content className="m-4">
          <div className="p-4 bg-white">
            <Table dataSource={dataSource} columns={columns} />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Academic_Resources ©2024 Created by Group 4</Footer>
      </Layout>

      <Modal
        title={isEditMode ? "Edit Course" : "Add New Course"}
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="image"
            label="Image URL"
            rules={[{ required: true, message: 'Please input the image URL!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please input the title!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default CourseAdmin;
