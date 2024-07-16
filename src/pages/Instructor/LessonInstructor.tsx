import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  SearchOutlined
} from '@ant-design/icons';

import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Col, Form, Input, Layout, Modal, Row, Table, message } from 'antd';
import Title from 'antd/lib/typography/Title';
import { Lesson } from 'models/types';
import { AlignType } from 'rc-table/lib/interface';
import React, { useEffect, useState } from 'react';
import { getLessons } from 'services/Instructor/lessonApiService';

const { confirm } = Modal;
const { Header, Content } = Layout;

const ManagerLessonInstructor: React.FC = () => {
  const [dataSource, setDataSource] = useState<Lesson[]>([]);
  const [filteredDataSource, setFilteredDataSource] = useState<Lesson[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<Lesson | null>(null);
  const [form] = Form.useForm();
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [typeLesson, setTypeLesson] = useState<Lesson[]>([]);


  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const response = await getLessons('', 1, 10, '');
      console.log("reponse", response)
      setLessons(response.data.pageData);
    } catch (error) {
      message.error('Failed to fetch sessions');
      console.error('Error fetching sessions:', error);
    }
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const handleAddNewLesson = () => {
    setIsEditMode(false);
    setIsModalVisible(true);
    form.resetFields();
  };

  const handleEdit = (record: Lesson) => {
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

  const handleDelete = (record: Lesson) => {
    const newDataSource = dataSource.filter(item => item._id !== record._id);
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
            item._id === currentRecord._id ? { ...item, ...values } : item
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
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDataSource(filteredData);
  };

  const showConfirm = (record: Lesson) => {
    confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleFilled />,
      content: 'Some descriptions',
      onOk() {
        console.log('OK');
        handleDelete(record);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handlePreviewCourse = (videoUrl: string) => {
    setIsVideoModalVisible(true);
  };

  const columns = [
    {
      title: 'Lesson Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Position Order',
      dataIndex: 'position_order',
      key: 'position_order',
      align: "center" as AlignType,
    },
    {
      title: 'Session Name',
      dataIndex: 'session_name',
      key: 'session_name',
      // align: "center" as AlignType,
    },
    {
      title: 'Course Name',
      dataIndex: 'course_name',
      key: 'course_name',
      // align: "center" as AlignType,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Full Time',
      dataIndex: 'full_time',
      key: 'full_time',
      align: 'center' as AlignType,
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Update At',
      dataIndex: 'updated_at',
      key: 'updated_at',
      align: 'center' as AlignType,
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center' as AlignType,
      render: (text: string, record: Lesson) => (
        <div className="flex flex-row justify-center gap-1">
          <Button size="small" icon={<EditOutlined />} className="text-blue-500" onClick={() => handleEdit(record)}></Button>
          <Button size="small" icon={<DeleteOutlined />} className="text-red-500" onClick={() => showConfirm(record)}></Button>
          <Button size="small" icon={<EyeOutlined />} onClick={() => handleViewMore(record._id)}></Button>
        </div>
      ),
    },
  ];

  return (
    <Layout style={{ height: '100vh' }}>
      <Layout className="site-layout">
        <Header className="p-0 bg-white">
          <div className="flex flex-wrap items-center justify-end gap-4 p-4 bg-[#939fb1]">
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined />}
              onChange={e => handleSearch(e.target.value)}
              style={{ width: 300 }}
            />
            <div className="h-6 border-r lg:mx-4"></div>
            <Button className="font-bold text-white bg-red-500" onClick={handleAddNewLesson}>
              <PlusCircleOutlined />
              Add New Lesson
            </Button>
          </div>
        </Header>
        <Content className="mx-4 my-4 overflow-y-auto xl:mx-6">
          <Table
            pagination={{ pageSize: 6 }}
            dataSource={lessons}
            columns={columns}
            expandable={{
              expandedRowKeys: expandedKeys,
              onExpand: (expanded, record) => handleViewMore(record._id),
              expandedRowRender: (record: Lesson) => (
                <div style={{ padding: '10px 20px', backgroundColor: '#f9f9f9', borderRadius: '4px', marginLeft: '25px' }}>
                  <Row gutter={16}>
                    <Col span={16}>
                      <Row gutter={16} className='mb-5'>
                        <Col span={24}>
                          <Title level={5}>Description:</Title>
                          <p>{record.description || '-'}</p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              ),
              expandIcon: () => null,
            }}
            rowKey="_id"
          />
        </Content>
      </Layout>

      <Modal
        width={'50%'}
        title={isEditMode ? "Edit Lesson" : "Add New Lesson"}
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Lesson Name" rules={[{ required: true, message: 'Please enter lesson name' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default ManagerLessonInstructor;
