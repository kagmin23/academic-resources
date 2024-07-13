import { DeleteOutlined, EditOutlined, EyeOutlined, PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, Layout, Modal, Table, Typography, notification } from 'antd';
import { AlignType } from 'rc-table/lib/interface';
import React, { useEffect, useState } from 'react';
import { createCategory, deleteCategory, getCategories, getCategoryDetail, updateCategory } from 'services/AdminsApi/categoryApiService';

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
  const [isAddEditModalVisible, setIsAddEditModalVisible] = useState(false);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [modalData, setModalData] = useState<DataType | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [form] = Form.useForm();

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
    setIsAddEditModalVisible(true);
    setModalData(null);
    form.resetFields();
  };

  const handleEdit = (record: DataType) => {
    setIsAddEditModalVisible(true);
    setModalData(record);
    form.setFieldsValue({
      name: record.name,
      description: record.description,
    });
  };

  const handleCreateOrUpdateCategory = async (values: { name: string; description: string }) => {
    try {
      if (modalData) {
        // Đây là logic cập nhật danh mục
        await updateCategory(modalData._id, values.name, values.description);
      } else {
        // Đây là logic tạo mới danh mục
        await createCategory(values.name, values.description);
      }
      fetchData();
      notification.success({
        message: 'Success',
        description: `Category ${modalData ? 'updated' : 'created'} successfully.`,
      });
      setIsAddEditModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error(`Error ${modalData ? 'updating' : 'creating'} category:`, error);
      notification.error({
        message: 'Error',
        description: `Failed to ${modalData ? 'update' : 'create'} category.`,
      });
    }
  };
  

  const handleDeleteCategory = async () => {
    try {
      if (deleteId) {
        await deleteCategory(deleteId);
        fetchData();
        notification.success({
          message: 'Success',
          description: 'Category deleted successfully.',
        });
        setIsDeleteConfirmVisible(false);
        setDeleteId(null);
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      notification.error({
        message: 'Error',
        description: 'Failed to delete category.',
      });
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    const filtered = dataSource.filter(item =>
      item.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredDataSource(filtered);
  };

  const handleViewDetails = async (id: string) => {
    try {
      const response = await getCategoryDetail(id);
      const categoryDetail = response.data;
      setModalData(categoryDetail);
      setIsDetailModalVisible(true);
    } catch (error) {
      console.error('Error fetching category detail:', error);
      notification.error({
        message: 'Error',
        description: 'Failed to fetch category detail.',
      });
    }
  };

  const handleCloseAddEditModal = () => {
    setIsAddEditModalVisible(false);
    setModalData(null);
    form.resetFields();
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalVisible(false);
    setModalData(null);
  };

  const handleOpenDeleteConfirm = (id: string) => {
    setIsDeleteConfirmVisible(true);
    setDeleteId(id);
  };

  const handleCloseDeleteConfirm = () => {
    setIsDeleteConfirmVisible(false);
    setDeleteId(null);
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
            onClick={() => handleEdit(record)}
          ></Button>
          <Button
            icon={<DeleteOutlined />}
            className="mr-2 text-white bg-red-600"
            onClick={() => handleOpenDeleteConfirm(record._id)}
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
      <Modal
          title={modalData ? "Edit Category" : "Add New Category"}
          visible={isAddEditModalVisible}
          onCancel={handleCloseAddEditModal}
          footer={[
            <Button key="close" onClick={handleCloseAddEditModal}>
              Close
            </Button>,
            <Button key="save" type="primary" onClick={() => form.submit()}>
              {modalData ? 'Save' : 'Add'}
            </Button>,
          ]}
        >
          <Form form={form} layout="vertical" onFinish={handleCreateOrUpdateCategory}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please input the category name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea />
            </Form.Item>
          </Form>
        </Modal>

      <Modal
        title="Delete Confirmation"
        visible={isDeleteConfirmVisible}
        onOk={handleDeleteCategory}
        onCancel={handleCloseDeleteConfirm}
        okText="Yes"
        cancelText="No"
      >
        <Text>Are you sure you want to delete this category?</Text>
      </Modal>
      {modalData && (
        <Modal
          title="Category Detail"
          visible={isDetailModalVisible}
          onCancel={handleCloseDetailModal}
          footer={[
            <Button key="close" onClick={handleCloseDetailModal}>
              Close
            </Button>,
          ]}
        >
          <Text strong>ID: </Text>
          <Text>{modalData._id}</Text>
          <br />
          <Text strong>Name: </Text>
          <Text>{modalData.name}</Text>
          <br />
          <Text strong>Description: </Text>
          <Text>{modalData.description}</Text>
          <br />
          <Text strong>Created At: </Text>
          <Text>{modalData.created_at}</Text>
        </Modal>
      )}
    </Layout>
  );
};

export default CategoryAdmin;
