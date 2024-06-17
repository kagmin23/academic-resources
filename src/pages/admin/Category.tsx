import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, Layout, Modal, Table } from 'antd';
// import { debounce } from 'lodash';
import { AlignType } from 'rc-table/lib/interface';
import React, { useEffect, useState } from 'react';

const { Header, Content, Footer } = Layout;

interface DataType {
  key: string;
  image: string;
  title: string;
}

const getInitialDataSource = (): DataType[] => {
  const savedData = localStorage.getItem('categoryData');
  return savedData ? JSON.parse(savedData) : [
    { key: '1', image: 'https://via.placeholder.com/50', title: 'Item 1' },
    { key: '2', image: 'https://via.placeholder.com/50', title: 'Item 2' },
    { key: '3', image: 'https://via.placeholder.com/50', title: 'Item 3' },
    { key: '4', image: 'https://via.placeholder.com/50', title: 'Item 4' },
    { key: '5', image: 'https://via.placeholder.com/50', title: 'Item 5' },
    { key: '6', image: 'https://via.placeholder.com/50', title: 'Item 6' },
  ];
};

const CategoryAdmin: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>(getInitialDataSource);
  const [filteredDataSource, setFilteredDataSource] = useState<DataType[]>(dataSource);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<DataType | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [form] = Form.useForm();

  useEffect(() => {
    const filteredData = dataSource.filter(
      item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
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

  // const debouncedSearch = debounce((value: string) => {
  //   setSearchTerm(value);
  // }, 300);

  // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   debouncedSearch(event.target.value);
  // };

  const columns = [
    {
      title: 'Category',
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
            onClick={() => console.log('View more:', record)}
          ></Button>
        </div>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout className="site-layout">
        <Header className="p-0 bg-white border-2 border-gray-300">
          <div className="flex items-center justify-between p-4 bg-[#939fb1]">
            <div>
              <Button
                className="font-bold text-white bg-red-500"
                onClick={handleAddNew}
              >
                <PlusCircleOutlined />
                Add New Category
              </Button>
            </div>
            <div className="flex flex-1 ml-4">
              <Input
                placeholder="Search"
                // onChange={handleSearchChange}
                className="w-full h-12 text-lg border-2 border-gray-300 border-solid rounded"
                value={searchTerm}
              />
            </div>
          </div>
        </Header>
        <Content className="m-4">
          <div className="p-4 bg-white">
            <Table dataSource={filteredDataSource} columns={columns} />
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
          initialValues={editingRecord || { image: '', title: '' }}
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
        </Form>
      </Modal>
    </Layout>
  );
};

export default CategoryAdmin;