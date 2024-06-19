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
import { AlignType } from 'rc-table/lib/interface';
import React, { useEffect, useState } from 'react';

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

interface DataType {
  key: string;
  image: string;
  title: string;
  description?: string;
  instructor?: string;
  price?: number;
}

const getInitialDataSource = (): DataType[] => {
  const savedData = localStorage.getItem('categoryData');
  return savedData ? JSON.parse(savedData) : [
    { key: '1', image: 'https://via.placeholder.com/50', title: 'Item 1', description: 'abc' },
    { key: '2', image: 'https://via.placeholder.com/50', title: 'Item 2', description: 'def' },
    { key: '3', image: 'https://via.placeholder.com/50', title: 'Item 3', description: 'xyz' },
    { key: '4', image: 'https://via.placeholder.com/50', title: 'Item 4', description: 'kml' },
    { key: '5', image: 'https://via.placeholder.com/50', title: 'Item 5', description: 'iop' },
    { key: '6', image: 'https://via.placeholder.com/50', title: 'Item 6', description: 'ert' },
  ];
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

  const handleViewMore = (key: string) => {
    setExpandedKeys(prevKeys =>
      prevKeys.includes(key) ? prevKeys.filter(k => k !== key) : [...prevKeys, key]
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
            item.key === editingRecord.key ? { ...item, ...values } : item
          );
          setDataSource(updatedDataSource);
        } else {
          const newRecord: DataType = {
            key: (dataSource.length + 1).toString(),
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

  const handleDelete = (key: string) => {
    const updatedDataSource = dataSource.filter(item => item.key !== key);
    setDataSource(updatedDataSource);
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
            onClick={() => handleDelete(record.key)}
          ></Button>
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewMore(record.key)}
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
              className="w-full h-10 text-lg border-2 border-gray-300 border-solid rounded"
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
          initialValues={editingRecord || { image: '', title: '', description:'' }}
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
            name="Description"
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
