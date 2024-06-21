import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Col, Form, Input, Layout, Modal, Row, Table, Typography } from 'antd';
import Title from 'antd/lib/typography/Title';
import { AlignType } from 'rc-table/lib/interface';
import React, { useState } from 'react';

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

interface DataType {
  key: string;
  image: string;
  title: string;
  created_at: string;
  description?: string;
  instructor?: string;
  price?: number;
}

const initialDataSource: DataType[] = [
  {
    key: '1',
    image: 'https://via.placeholder.com/50',
    title: 'Item 1',
    created_at: '2024-01-01',
  },
  {
    key: '2',
    image: 'https://via.placeholder.com/50',
    title: 'Item 2',
    created_at: '2024-01-02',
  },
  {
    key: '3',
    image: 'https://via.placeholder.com/50',
    title: 'Item 3',
    created_at: '2024-01-03',
  },
  {
    key: '4',
    image: 'https://via.placeholder.com/50',
    title: 'Item 4',
    created_at: '2024-01-04',
  },
  {
    key: '5',
    image: 'https://via.placeholder.com/50',
    title: 'Item 5',
    created_at: '2024-01-05',
  },
  {
    key: '6',
    image: 'https://via.placeholder.com/50',
    title: 'Item 6',
    created_at: '2024-01-06',
  },
];

const ManagerCourseInstructor: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>(initialDataSource);
  const [filteredDataSource, setFilteredDataSource] = useState<DataType[]>(initialDataSource);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<DataType | null>(null);
  const [form] = Form.useForm();
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

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

  const handleViewMore = (key: string) => {
    setExpandedKeys(prevKeys =>
      prevKeys.includes(key) ? prevKeys.filter(k => k !== key) : [...prevKeys, key]
    );
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
        if (isEditMode && currentRecord) {
          const newDataSource = dataSource.map(item =>
            item.key === currentRecord.key ? { ...item, ...values } : item
          );
          setDataSource(newDataSource);
          setFilteredDataSource(newDataSource);
        } else {
          const newRecord = {
            ...values,
            key: (dataSource.length + 1).toString(),
            created_at: new Date().toISOString().split('T')[0],
          };
          setDataSource([...dataSource, newRecord]);
          setFilteredDataSource([...dataSource, newRecord]);
        }
        setIsModalVisible(false);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  const handleSearch = (value: string) => {
    const filteredData = dataSource.filter(item =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDataSource(filteredData);
  };

  const columns = [
    {
      title: 'Course',
      dataIndex: 'image',
      key: 'image',
      render: (text: string) => <img src={text} alt="item" className="w-12 h-12" />,
    },
    {
      title: 'Course Name',
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
          <Button icon={<EyeOutlined />} onClick={() => handleViewMore(record.key)}></Button>
        </div>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout className="site-layout">
        <Header className="p-0 bg-white">
          <div className="flex flex-wrap items-center justify-center gap-4 p-4 bg-[#939fb1]">
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined />}
              onChange={e => handleSearch(e.target.value)}
              style={{ width: 200 }}
            />
            <div className="h-6 mx-4 border-r"></div>
            <Button className="font-bold text-white bg-red-500" onClick={handleAddNewCourse}>
              <PlusCircleOutlined />
              Add New Course
            </Button>
          </div>
        </Header>
        <Content className="m-4">
          <Table
            dataSource={filteredDataSource}
            columns={columns}
            expandable={{
              expandedRowKeys: expandedKeys,
              onExpand: (expanded, record) => handleViewMore(record.key),
              expandedRowRender: (record: DataType) => (
                <div style={{ padding: '10px 20px', backgroundColor: '#f9f9f9', borderRadius: '4px', marginLeft: '25px' }}>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Title level={5} className='text-2xl'>Category Details</Title>
                    </Col>
                  </Row>
                  <Row gutter={16} align="middle" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Col span={8}>
                      <Text strong>Description:</Text>
                      <p>{record.description || '-'}</p>
                    </Col>
                    <Col span={8} style={{ textAlign: 'center' }}>
                      <Text strong>Instructor:</Text>
                      <p>{record.instructor || '-'}</p>
                    </Col>
                    <Col span={7} style={{ textAlign: 'center' }}>
                      <Text strong>Price:</Text>
                      <p>${record.price || '-'}</p>
                    </Col>
                  </Row>
                </div>
              ),
              expandIcon: () => null,
            }}
            rowKey="key"
          />
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

export default ManagerCourseInstructor;
