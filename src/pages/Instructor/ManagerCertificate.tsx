import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { Button, Form, Input, Layout, Modal, Table, Typography } from 'antd';
import { AlignType } from 'rc-table/lib/interface';
import React, { useState } from 'react';
  
  const { Header, Content, Footer } = Layout;
  const { Text } = Typography;
  
  interface DataType {
    key: string;
    image: string;
    name_certificate:string;
    name_course: string;
    created_at: string;
    // description?: string;
    // instructor?: string;
    // price?: number;
  }
  
  const initialDataSource: DataType[] = [
    {
      key: '1',
      image: 'https://via.placeholder.com/50',
      name_certificate:'certificate',
      name_course:'course1',
      created_at: '2024-01-01',
    },
    {
      key: '2',
      image: 'https://via.placeholder.com/50',
      name_certificate:'bé khỏe bé ngoan',
      name_course:'course2',
      created_at: '2024-01-02',
    },
    {
      key: '3',
      image: 'https://via.placeholder.com/50',
      name_certificate:'certificate',
      name_course:'course3',
      created_at: '2024-01-03',
    },
    {
      key: '4',
      image: 'https://via.placeholder.com/50',
      name_certificate:'certificate',
      name_course:'course4',
      created_at: '2024-01-04',
    },
    {
      key: '5',
      image: 'https://via.placeholder.com/50',
      name_certificate:'certificate 4',
      name_course:'course5',
      created_at: '2024-01-05',
    },
    {
      key: '6',
      image: 'https://via.placeholder.com/50',
      name_certificate:'certificate',
      name_course:'course6',
      created_at: '2024-01-06',
    },
  ];
  
  const ManagerCertificate: React.FC = () => {
    const [dataSource, setDataSource] = useState<DataType[]>(initialDataSource);
    const [filteredDataSource, setFilteredDataSource] = useState<DataType[]>(initialDataSource);
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
        item.name_certificate.toLowerCase().includes(value.toLowerCase()) ||
        item.name_course.toLowerCase().includes(value.toLowerCase())


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
            <Button icon={<EditOutlined />} className="mr-2 text-white bg-blue-500" onClick={() => handleEdit(record)}></Button>
            <Button icon={<DeleteOutlined />} className="mr-2 text-white bg-red-600" onClick={() => handleDelete(record)}></Button>
            
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
            {/* <Table
              dataSource={filteredDataSource}
              columns={columns}
              expandable={{
                expandedRowKeys: expandedKeys,
                expandedRowRender: (record: DataType) => (
                 
),
                expandIcon: () => null,
              }}
              rowKey="key"
            /> */}
                        <Table
              dataSource={filteredDataSource}
              columns={columns}
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
              rules={[
                { required: true, message: 'Please input the URL image' },
                { type: 'url', warningOnly: true },
                { type: 'string' },
              ]}
            >
              <Input />
            </Form.Item>
             
            <Form.Item
              name="name_certificate"
              label="Name Certificate"
              rules={[{ required: true, message: 'Please input the name course! '}]}
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
  