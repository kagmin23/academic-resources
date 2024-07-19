import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  SearchOutlined
} from '@ant-design/icons';

import { Button, Col, Form, Image, Input, Layout, Modal, Row, Select, Table, Typography, message } from 'antd';
import { Lesson } from 'models/types';
import moment from 'moment';
import { AlignType } from 'rc-table/lib/interface';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { deleteLesson, getLessons, updateLesson } from 'services/Instructor/lessonApiService';

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
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const { sessionId, courseId } = useParams<{ sessionId: string, courseId: string }>();

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const response = await getLessons('', 1, 10, '');
      setLessons(response.data.pageData);
    } catch (error) {
      message.error('Failed to fetch lessons');
      console.error('Error fetching lessons:', error);
    }
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

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  const handleOnDeleteLesson = (lessonId: string) => {
    confirm({
      title: 'Do you want to delete this Lesson?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone',
      onOk() {
        deleteLesson(lessonId)
          .then(() => {
            const newDataSource = dataSource.filter((item) => item._id !== lessonId);
            setDataSource(newDataSource);
            setFilteredDataSource(newDataSource);
            message.success('Lesson deleted successfully');
          })
          .catch((error) => {
            console.error("Failed to Delete Lesson", error);
            message.error('Failed to Delete Lesson');
          });
      },
    });
  };

  const handleOnEditLesson = () => {
    form.validateFields()
      .then(async (values) => {
        form.resetFields();
        const newValues = {
          ...values,
          course_id: courseId,
          session_id: sessionId,
        };
        if (isEditMode && currentRecord) {
          try {
            const response = await updateLesson(currentRecord._id, newValues);
            const updatedLesson = response.data;

            const newDataSource = dataSource.map((item) =>
              item._id === updatedLesson._id ? updatedLesson : item
            );
            setDataSource(newDataSource);
            setFilteredDataSource(newDataSource);
            message.success('Lesson updated successfully');
          } catch (error) {
            console.error("Failed to Update Lesson", error);
            message.error('Failed to Update Lesson');
          }
        } else {
          message.error("Edit error");
        }
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
        message.error('Validation failed');
      });
  };

  const handleSearch = (value: string) => {
    const filteredData = dataSource.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDataSource(filteredData);
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
    },
    {
      title: 'Course Name',
      dataIndex: 'course_name',
      key: 'course_name',
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
      align: 'center' as AlignType,
      render: (created_at: string) => moment(created_at).format("YYYY-MM-DD"),
    },
    {
      title: 'Update At',
      dataIndex: 'updated_at',
      key: 'updated_at',
      align: 'center' as AlignType,
      render: (created_at: string) => moment(created_at).format("YYYY-MM-DD"),
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center' as AlignType,
      render: (text: string, lesson: Lesson) => (
        <div className="flex flex-row justify-center gap-1">
          <Button size="small" icon={<EditOutlined />} className="text-blue-500" onClick={() => handleEdit(lesson)}></Button>
          <Button size="small" icon={<DeleteOutlined />} className="text-red-500" onClick={() => handleOnDeleteLesson(lesson._id)}></Button>
          <Button size="small" icon={<EyeOutlined />} onClick={() => handleViewMore(lesson._id)}></Button>
        </div>
      ),
    },
  ];

  return (
    <Layout style={{ height: '100vh' }}>
      <Layout className="site-layout">
        <Header className="p-0 bg-white">
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#939fb1]">
          <div className="mx-4 my-auto text-lg font-bold text-white">
            Manager Lesson
          </div>
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined />}
              onChange={e => handleSearch(e.target.value)}
              style={{ width: 300 }}
            />
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
                  <Row gutter={16} className="mb-5" style={{ display: 'flex' }}>
              <Col span={22} className="mb-5">
              <Typography.Title level={5}>Description:</Typography.Title>
                       <p>{record.description || "-"}</p>
              </Col>

              <Col span={11} className="mb-5" style={{ height: '315px' }}>
              <Typography.Title level={5}>Video:</Typography.Title>
                    <iframe 
                      src={record.video_url} 
                      style={{ width: '400px', height: '300px' }} 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen>
                    </iframe>
              </Col>

            <Col span={11} offset={1} className="mb-5" style={{ height: '315px' }}>
            <Typography.Title level={5}>Image:</Typography.Title>
                <Image 
                    src={record.image_url} 
                    style={{ width: '400px', height: '300px', objectFit: 'cover' }} 
                />
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
        title={"Edit Lesson"}
        visible={isModalVisible}
        onOk={handleOnEditLesson}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Lesson Name" rules={[{ required: true, message: 'Please enter Lesson Name' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="lesson_type" label="Lesson Type"  rules={[{ required: true, message: 'Please select Lesson Type' }]}>
            <Select
                showSearch
                placeholder="Select a lesson type"
                optionFilterProp="label"
                onChange={onChange}
                onSearch={onSearch}
                options={[
                  { value: 'text', label: 'text' },
                  { value: 'video', label: 'video' },
                  { value: 'image', label: 'image' },
                ]}
              />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please enter Lesson Description' }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="video_url" label="Video" rules={[{ required: true, message: 'Please enter Lesson Video Url' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="image_url" label="Image" rules={[{ required: true, message: 'Please enter Lesson Image Url' }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="full_time" label="Full Time" rules={[{ required: true, message: 'Please enter Lesson Full Time' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="position_order" label="Position Order" rules={[{ required: true, message: 'Please enter Lesson Position Order' }]}>
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default ManagerLessonInstructor;
