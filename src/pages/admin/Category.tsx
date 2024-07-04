import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Col, Form, Input, Layout, Modal, Row, Table, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Title from 'antd/lib/typography/Title';
import axios from 'axios';
import { AlignType } from 'rc-table/lib/interface';
import React, { useEffect, useState } from 'react';
import { HOST_MAIN } from 'services/apiService';


const { Header, Content, Footer } = Layout;
const { Text } = Typography;
const { confirm } = Modal;

interface DataType {
  id: number;
  image: string;
  title: string;
  description?: string;
  instructor?: string;
  price?: number;
}

const getInitialDataSource = (): DataType[] => {
  const savedData = localStorage.getItem('categoryData');
  return savedData ? JSON.parse(savedData) : [];
};

const CategoryAdmin: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>(getInitialDataSource);
  const [filteredDataSource, setFilteredDataSource] = useState<DataType[]>(dataSource);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<DataType | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [form] = Form.useForm();
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  useEffect(() => {
    const filteredData = dataSource.filter(
      item => item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDataSource(filteredData);
  }, [searchTerm, dataSource]);

  useEffect(() => {
    localStorage.setItem('categoryData', JSON.stringify(dataSource));
  }, [dataSource]);

  const handleAddNew = () => {
    setEditingRecord(null);
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleViewMore = (id: number) => {
    setExpandedKeys(prevKeys =>
      prevKeys.includes(id.toString()) ? prevKeys.filter(k => k !== id.toString()) : [...prevKeys, id.toString()]
    );
  };

  const handleSave = (record: DataType) => {
    setEditingRecord(record);
    setIsModalVisible(true);
    form.setFieldsValue(record);
  };

  const handleUpdate = () => {
    form
      .validateFields()
      .then(values => {
        if (editingRecord) {
          const updatedDataSource = dataSource.map(item =>
            item.id === editingRecord.id ? { ...item, ...values } : item
          );
          setDataSource(updatedDataSource);
        } else {
          const newRecord: DataType = {
            id: dataSource.length + 1, // Tạo id mới khi thêm mới bản ghi
            ...values,
          };
          setDataSource([...dataSource, newRecord]);
        }
        setIsModalVisible(false);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };
  
  
  const showDeleteConfirm = (id: number) => {
    confirm({
      title: 'Are you sure you want to delete this category?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        axios.delete(`${HOST_MAIN}/api/category/${id}`)
          .then(() => {
            const updatedDataSource = dataSource.filter(item => item.id !== id);
            setDataSource(updatedDataSource);
          })
          .catch(error => {
            console.error('There was an error deleting the category!', error);
          });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  
  
  

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const columns = [
    {
      title: 'Category',
      dataIndex: 'image',
      key: 'image',
      render: (text: string) => <img src={text} alt="item" className="w-12 h-12" />,
    },
    {

      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
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
            onClick={() => handleSave(record)}
          ></Button>
          <Button
            icon={<DeleteOutlined />}
            className="mr-2 text-white bg-red-600"
            onClick={() => showDeleteConfirm(record.id)}
          ></Button>
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewMore(record.id)}
          ></Button>
        </div>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout className="site-layout">
        <Header className="p-0 bg-white">
          <div className="flex flex-col items-start justify-between mb-4 space-y-4 md:flex-row md:items-center md:space-y-0 bg-[#939fb1] pr-4 pl-4">
            <div className="w-full md:w-1/3">
              <Input
                placeholder="Search"
                prefix={<SearchOutlined />}
                onChange={handleSearchChange}
                className="items-center w-full h-8 text-sm border-2 border-gray-300 border-solid rounded"
                value={searchTerm}
              />
            </div>
            <Button
              className="font-bold text-white bg-red-500"
              onClick={handleAddNew}
            >
              <PlusCircleOutlined />
              Add New Category
            </Button>
          </div>
        </Header>
        <Content className="m-4">
          <div className="p-4 bg-white">
            <Table
              dataSource={filteredDataSource}
              columns={columns}
              expandable={{
                expandedRowKeys: expandedKeys,
                onExpand: (expanded, record) => handleViewMore(record.id),
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
              rowKey="id"
            />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Academic_Resources ©2024 Created by Group 4
        </Footer>
      </Layout>
      <Modal
        title={editingRecord ? 'Edit Category' : 'Add New Category'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleUpdate}
      >
        <Form
          form={form}
          initialValues={editingRecord || { image: '', title: '', description: '' }}
        >
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
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input the description!' }]}
          >
            <TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default CategoryAdmin;
