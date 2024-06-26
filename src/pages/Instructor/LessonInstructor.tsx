import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  PlayCircleOutlined,
  UploadOutlined
} from '@ant-design/icons';

import { Button, Col, Form, Input, Layout, Modal, Row, Table, Tag, Upload  } from 'antd';
import Title from 'antd/lib/typography/Title';
import { AlignType } from 'rc-table/lib/interface';
import React, { useState } from 'react';
import type { SelectProps, UploadProps } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';

const { confirm } = Modal;
const { Header, Content } = Layout;

interface DataType {
  key: string;
  name_course: string;
  created_at: string;
  description: string;
  instructor: string;
  name_sessions: string;
  name_lessons: string;
  list_category: list_category[];
}

interface list_category {
  id: number;
  category: string;
}

const initialDataSource: DataType[] = [
  {
    key: '1',
    name_course: 'Cách học tập tốt',
    created_at: '2024-01-01',
    instructor: 'John Doe',
    name_lessons: 'lesson 1',
    list_category: [
      { id: 1, category: 'Programming' },
      { id: 2, category: 'Web Design' },
      { id: 3, category: 'Typescript' }
    ],
    name_sessions: "session 1",
    description: 'To have an overview of the IT industry - Web programming, you should watch the videos in this course first. What will you learn? -Basic knowledge, foundations of the IT industry Basic models and architecture when deploying applications. Core concepts and terms when deploying applications. Understand more about how the internet and computers work'
  },
  {
    key: '2',
    name_course: 'Item 2',
    created_at: '2024-01-02',
    instructor: 'Jane Smith',
    name_lessons: 'lesson 2',
    name_sessions: 'session 2',
    list_category: [
      { id: 4, category: 'HTML' },
      { id: 5, category: 'JavaScript' },
    ],
    description: 'This course focuses on HTML, JavaScript, and web design techniques to develop beautiful and professional websites.'
  },
  {
    key: '3',
    name_course: 'Item 3',
    created_at: '2024-01-03',
    instructor: 'Michael Brown',
    name_lessons: 'lesson 3',
    name_sessions: 'lesson 3',
    list_category: [
      { id: 6, category: 'Electrical Engineering' },
      { id: 7, category: 'Mechanical' },
      { id: 8, category: 'Construction Engineering' }
    ],
    description: 'Students will learn electrical and mechanical engineering, an important foundation for technical careers.',
  },
  {
    key: '4',
    name_course: 'Item 4',
    created_at: '2024-01-04',
    instructor: 'Chris Lee',
    name_lessons: 'lesson 4',
    list_category: [
      { id: 9, category: 'Communication skills' },
      { id: 10, category: 'Problem solving skills' },
      { id: 11, category: 'Presentation skills' }
    ],
    name_sessions: 'lesson 4',
    description: 'This course focuses on how to solve problems in daily work, helping you become an effective employee and solve challenges well.'
  },
  {
    key: '5',
    name_course: 'Item 5',
    created_at: '2024-01-05',
    instructor: 'Anna Johnson',
    name_lessons: 'lesson 5',
    list_category: [
      { id: 9, category: 'Communication skills' },
      { id: 10, category: 'Problem solving skills' },
      { id: 11, category: 'Presentation skills' }
    ],
    description: 'Learners will practice communication, problem solving and presentation skills, important skills in the modern work environment.',
    name_sessions: 'lesson 5',
  },
  {
    key: '6',
    name_course: 'Item 6',
    created_at: '2024-01-06',
    instructor: 'David Wilson',
    name_lessons: 'lesson 6',
    list_category: [
      { id: 9, category: 'Communication skills' },
      { id: 10, category: 'Problem solving skills' },
      { id: 11, category: 'Presentation skills' }
    ],
    name_sessions: 'lesson 6',
    description: 'This course provides basic knowledge of web programming and application architecture, helping you gain a deeper understanding of how the internet and computers work.'
  },
];

const ManagerLessonInstructor: React.FC = () => {
  const [dataSource, setDataSource] = useState<DataType[]>(initialDataSource);
  const [filteredDataSource, setFilteredDataSource] = useState<DataType[]>(initialDataSource);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<DataType | null>(null);
  const [form] = Form.useForm();
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [isVideoModalVisible, setIsVideoModalVisible] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string>('');

  const categoryOptions = [
    { id: 1, category: 'Programming' },
    { id: 2, category: 'Web Design' },
    { id: 3, category: 'Typescript' },
    { id: 4, category: 'HTML' },
    { id: 5, category: 'JavaScript' },
    { id: 6, category: 'Electrical Engineering' },
    { id: 7, category: 'Mechanical' },
    { id: 8, category: 'Construction Engineering' },
    { id: 9, category: 'Communication skills' },
    { id: 10, category: 'Problem solving skills' },
    { id: 11, category: 'Presentation skills' },
  ];

  const options: SelectProps['options'] = categoryOptions.map(category => ({
    value: category.id.toString(),
    label: category.category,
  }));

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const handleAddNewLesson = () => {
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
      item.name_course.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDataSource(filteredData);
  };

  const showConfirm = (record: DataType) => {
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
    setVideoUrl(videoUrl);
    setIsVideoModalVisible(true);
  };

  const uploadProps: UploadProps = {
    beforeUpload: file => {
      const reader = new FileReader();
      reader.onload = e => {
        const url = e.target?.result as string;
        form.setFieldsValue({ video_url: url });
      };
      reader.readAsDataURL(file);
      return false;
    }
  };


  const columns = [

    {
      title: 'Lesson Name',
      dataIndex: 'name_lessons',
      key: 'name_lessons',
    },
    {
      title: 'Session Name',
      dataIndex: 'name_sessions',
      key: 'name_sessions',
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
          <Button icon={<DeleteOutlined />} className="mr-2 text-white bg-red-600" onClick={() => showConfirm(record)}></Button>
          <Button icon={<EyeOutlined />} onClick={() => handleViewMore(record.key)}></Button>
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
            <div className="h-6 lg:mx-4 border-r"></div>
            <Button className="font-bold text-white bg-red-500" onClick={handleAddNewLesson}>
              <PlusCircleOutlined />
              Add New Lesson
            </Button>
          </div>
        </Header>
        <Content className="my-4 mx-4 xl:mx-6 overflow-y-auto">
          <Table
            pagination={{ pageSize: 6 }}
            dataSource={filteredDataSource}
            columns={columns}
            expandable={{
              expandedRowKeys: expandedKeys,
              onExpand: (expanded, record) => handleViewMore(record.key),
              expandedRowRender: (record: DataType) => (
                <div style={{ padding: '10px 20px', backgroundColor: '#f9f9f9', borderRadius: '4px', marginLeft: '25px' }}>
                  <Row gutter={16}>
                    <Col span={8}>
                      <div className="relative">
                        <a onClick={() => handlePreviewCourse('your-video-url.mp4')} className="block">
                          <img src="https://img.youtube.com/vi/hqBjda_bf3I/maxresdefault.jpg" alt="" className="w-full p-2" />
                          <div className="absolute inset-0 flex flex-col items-center justify-center ">
                            <PlayCircleOutlined className="text-4xl text-white" />
                          </div>
                        </a>
                      </div>
                    </Col>
                    <Col span={16}>
                      <Row gutter={16} className='mb-5'>
                        <Col span={24}>
                          <Title level={5}>Category:</Title>
                          <p>{record.list_category?.map(category => <Tag color="geekblue" key={category.id}>{category.category}</Tag>) || '-'}</p>
                        </Col>
                      </Row>
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
            rowKey="key"
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
        <Form.Item
            name="upload"
            label="Upload Video"
            valuePropName="fileList"
            getValueFromEvent={e => e.fileList}
          >
            <Upload {...uploadProps} maxCount={1}>
              <Button><UploadOutlined />Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input the description!' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          
        </Form>
      </Modal>

      <Modal
        title="Lesson Preview"
        visible={isVideoModalVisible}
        onCancel={() => setIsVideoModalVisible(false)}
        footer={null}
      >
        <video width="100%" controls>
          <source src={videoUrl} type="video/mp4" />
        </video>
      </Modal>
    </Layout>
  );
};

export default ManagerLessonInstructor;
