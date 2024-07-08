import React, { useEffect, useState } from 'react';
import { Button, Input, Layout, Modal, Table, Typography, notification } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { AlignType } from 'rc-table/lib/interface';
import { getCategories } from 'services/AdminsApi/getCategoriesApiService';
import { deleteCategory } from 'services/AdminsApi/deleteCategoryApiService';
import { getCategoryDetail } from 'services/AdminsApi/getCategoryDetailApiService';

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

interface DataType {
  _id: string;
  name: string;
  description?: string;
  user_id: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

const CategoryAdmin: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [filteredDataSource, setFilteredDataSource] = useState<DataType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState<DataType | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getCategories('', 1, 10);
      setDataSource(response.data.pageData);
      setFilteredDataSource(response.data.pageData);
    } catch (error) {
      console.error('Error fetching categories:', error);
      notification.error({
        message: 'Error',
        description: 'Failed to fetch categories.',
      });
    }
  };

  const handleAddNew = () => {
    setIsModalVisible(true);
    setModalData(null);
  };

  const handleSave = (record: DataType) => {
    setIsModalVisible(true);
    setModalData(record);
  };

  const handleUpdate = () => {
    // Implement update logic here
    setIsModalVisible(false);
  };

  const handleCreateCategory = async (values: { name: string; description: string }) => {
    // Implement create category logic here
    setIsModalVisible(false);
  };

  const handleDeleteCategory = (id: string) => {
    // Implement delete category logic here
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleViewDetails = async (id: string) => {
    try {
      const response = await getCategoryDetail(id);
      const categoryDetail = response.data;
      setModalData(categoryDetail); // Set category detail data to show in modal
      setIsModalVisible(true);
    } catch (error) {
      console.error('Error fetching category detail:', error);
      notification.error({
        message: 'Error',
        description: 'Failed to fetch category detail.',
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setModalData(null);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
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
            onClick={() => handleDeleteCategory(record._id)}
          ></Button>
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewDetails(record._id)}
          ></Button>
        </div>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
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
            rowKey="_id"
          />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Academic_Resources ©2024 Created by Group 4
      </Footer>
      {modalData && (
        <Modal
          title="Category Detail"
          visible={isModalVisible}
          onCancel={handleCloseModal}
          footer={[
            <Button key="close" onClick={handleCloseModal}>
              Close
            </Button>,
          ]}
        >
          <Typography.Text strong>ID: </Typography.Text>
          <Typography.Text>{modalData._id}</Typography.Text>
          <br />
          <Typography.Text strong>Name: </Typography.Text>
          <Typography.Text>{modalData.name}</Typography.Text>
          <br />
          <Typography.Text strong>Description: </Typography.Text>
          <Typography.Text>{modalData.description}</Typography.Text>
          <br />
          <Typography.Text strong>Created At: </Typography.Text>
          <Typography.Text>{modalData.created_at}</Typography.Text>
        </Modal>
      )}
    </Layout>
  );
};

export default CategoryAdmin;
