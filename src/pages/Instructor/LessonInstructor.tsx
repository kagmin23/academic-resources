  import {
  DeleteOutlined,
  DownCircleOutlined,
  FileOutlined,
  LockOutlined,
  PlusOutlined,
  SearchOutlined,
  UploadOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';
import { Button, Form, Input, Layout, Menu, Modal, Table, Tabs, Typography, Upload } from 'antd';
import { AlignType } from 'rc-table/lib/interface';
import React, { useState } from 'react';

  const { Header, Content, Footer } = Layout;
  const { Text } = Typography;
  const { TabPane } = Tabs;
  const { SubMenu } = Menu;

  interface DataType {
    key: string;
    image: string;
    title: string;
    created_at: string;
    description?: string;
    instructor?: string;
  }

  interface LessonType {
    key: string;
    title: string;
    duration: string;
    preview?: boolean;
    videoUrl: string;
  }

  const initialLessons: LessonType[] = [
    { key: 'lesson1', title: 'Getting Started', duration: '30 minutes', preview: true, videoUrl: 'https://www.example.com/video1.mp4' },
    { key: 'lesson2', title: 'Content Management', duration: '30 minutes', videoUrl: 'https://www.example.com/video2.mp4' },
  ];

  const initialAssignments = [
    { key: 'assignment1', title: 'Certificate On Theme Development 01', duration: '10 minutes', preview: true },
    { key: 'assignment2', title: 'Certificate On Theme Development 02', duration: '30 minutes' },
  ];

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
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<DataType | null>(null);
    const [form] = Form.useForm();
    const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
    const [videoModalVisible, setVideoModalVisible] = useState(false);
    const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);
    const [lessons, setLessons] = useState<LessonType[]>(initialLessons);
    const [selectedLesson, setSelectedLesson] = useState<LessonType | null>(null);
    const [lessonModalVisible, setLessonModalVisible] = useState(false);
    const [fileList, setFileList] = useState<any[]>([]); // State to store selected files
    const [addModalVisible, setAddModalVisible] = useState(false); // New state to control the visibility of the Add modal

    const handleEdit = (record: DataType) => {
      setIsEditMode(true);
      setCurrentRecord(record);
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

    const handleClick = (lesson: LessonType) => {
        setSelectedVideoUrl(lesson.videoUrl);
        setVideoModalVisible(true);
      };

    const handleLessonSave = () => {
      form
        .validateFields()
        .then(values => {
          form.resetFields();
          if (selectedLesson) {
            const updatedLessons = lessons.map(lesson =>
              lesson.key === selectedLesson.key ? { ...lesson, ...values } : lesson
            );
            setLessons(updatedLessons);
          } else {
            const newLesson = {
              ...values,
              key: `lesson${lessons.length + 1}`,
              videoUrl: fileList.length > 0 ? URL.createObjectURL(fileList[0]) : 'https://www.example.com/video.mp4', // Change videoUrl to store or use the selected file
            };
            setLessons([...lessons, newLesson]);
          }
          setLessonModalVisible(false);
          setSelectedLesson(null);
          setFileList([]); // Clear fileList after saving
        })
        .catch(info => {
          console.log('Validate Failed:', info);
        });
    };

    const handleLessonDelete = (key: string) => {
      const updatedLessons = lessons.filter(lesson => lesson.key !== key);
      setLessons(updatedLessons);
    };

    const handleAddLesson = () => {
      setSelectedLesson(null);
      setVideoModalVisible(false);
      setLessonModalVisible(true);
      form.resetFields();
    };

    const handleEditLesson = (lesson: LessonType) => {
      setSelectedLesson(lesson);
      setVideoModalVisible(false);
      setLessonModalVisible(true);
      form.setFieldsValue(lesson);
    };

    const handleAddToLesson = (lessonKey: string) => {
      // Show the Add modal
      setAddModalVisible(true);
    };

    const handleAddLessonSubmit = () => {
      form
        .validateFields()
        .then(values => {
          form.resetFields();
          const newLesson = {
            ...values,
            key: `lesson${lessons.length + 1}`,
            videoUrl: fileList.length > 0 ? URL.createObjectURL(fileList[0]) : 'https://www.example.com/video.mp4',
          };
          setLessons([...lessons, newLesson]);
          setAddModalVisible(false);
          setFileList([]);
        })
        .catch(info => {
          console.log('Validate Failed:', info);
        });
      setVideoModalVisible(false);
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
            <Button icon={<DownCircleOutlined />} className="mr-2" onClick={() => handleViewMore(record.key)}></Button>
          </div>
        ),
      },
    ];

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Layout className="site-layout">
          <Header className
  ="p-0 bg-white">
  <div className="flex flex-wrap items-center justify-end gap-4 p-4 bg-[#939fb1]">
    <Input
      placeholder="Search..."
      prefix={<SearchOutlined />}
      onChange={e => handleSearch(e.target.value)}
      style={{ width: 300 }}
    />
  </div>
  </Header>
  <Content>
  <Table
    dataSource={filteredDataSource}
    columns={columns}
    expandable={{
      expandedRowKeys: expandedKeys,
      onExpand: (expanded, record) => handleViewMore(record.key),
      expandedRowRender: (record: DataType) => (
        <div style={{ paddingBottom: "30px", backgroundColor: '#f9f9f9', borderRadius: '4px', marginLeft: '25px' }}>
          <Tabs defaultActiveKey="1">
            <TabPane>
              <Menu
                mode="inline"
                defaultSelectedKeys={[lessons[0].key]}
                className="h-full"
              >
                <SubMenu key="sub1" title="Session 1" icon={<FileOutlined />}>
                  {lessons.map(lesson => (
                    <Menu.Item key={lesson.key} icon={lesson.preview ? <FileOutlined /> : <LockOutlined />} className="flex items-center justify-between h-24">
                      <div>
                        <div className="text-base">{lesson.title}</div>
                        <div className="text-sm text-gray-500">{lesson.duration}</div>
                      </div>
                      <div>
                        <Button icon={<VideoCameraOutlined />} className="mr-2 text-white bg-slate-400" onClick={() => handleClick(lesson)}></Button>
                        <Button icon={<PlusOutlined />} className="mr-2 text-white bg-green-600" onClick={() => handleAddToLesson(lesson.key)}></Button>
                        <Button icon={<UploadOutlined />} className="mr-2 text-white bg-blue-500" onClick={() => handleEditLesson(lesson)}></Button>
                        <Button icon={<DeleteOutlined />} className="text-white bg-red-600" onClick={() => handleLessonDelete(lesson.key)}></Button>
                      </div>
                    </Menu.Item>
                  ))}
                  <Menu.Item>
                    <Button type="dashed" icon={<PlusOutlined />} onClick={handleAddLesson}>Add Lesson</Button>
                  </Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title="Assignment" icon={<FileOutlined />}>
                  {initialAssignments.map(assignment => (
                    <Menu.Item key={assignment.key} icon={assignment.preview ? <FileOutlined /> : <LockOutlined />} className="flex items-center h-24">
                      <div className="w-full">
                        <div className="text-base">{assignment.title}</div>
                        <div className="text-sm text-gray-500">{assignment.duration}</div>
                      </div>
                    </Menu.Item>
                  ))}
                </SubMenu>
              </Menu>
            </TabPane>
          </Tabs>
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
          title="Video Lesson"
          visible={videoModalVisible}
          onCancel={() => setVideoModalVisible(false)}
          footer={null}
        >
          {selectedVideoUrl && (
            <video controls className="w-full" style={{ maxHeight: '70vh' }}>
              <source src={selectedVideoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
    </Modal>


        <Modal
        title={selectedLesson ? "Edit Lesson" : "Add Lesson"}
        visible={lessonModalVisible}
        onCancel={() => {
        setLessonModalVisible(false);
        setFileList([]); // Clear selected files if cancelled
        }}
        onOk={handleLessonSave}
        >
        <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please input the title of the lesson!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="duration"
          label="Duration"
          rules={[{ required: true, message: 'Please input the duration of the lesson!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="preview"
          label="Preview"
          valuePropName="checked"
        >
          <Input type="checkbox" />
        </Form.Item>
        <Form.Item
          name="upload"
          label="Upload Video"
          valuePropName="fileList"
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e && e.fileList;
          }}
        >
          <Upload
            accept="video/*"
            beforeUpload={(file) => {
              setFileList([file]); // Save the selected file to fileList state
              return false; // Prevent Ant Design Upload from automatically uploading
            }}
            fileList={fileList}
            onRemove={() => setFileList([])} // Clear fileList when the remove button is clicked in Upload
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        </Form>
  </Modal>

  <Modal
      title="Add Lesson"
      visible={addModalVisible}
      onCancel={() => setAddModalVisible(false)}
      onOk={handleAddLessonSubmit}
      >
      <Form form={form} layout="vertical" name="form_in_modal">
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: 'Please input the title of the lesson!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="duration"
        label="Duration"
        rules={[{ required: true, message: 'Please input the duration of the lesson!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="preview"
        label="Preview"
        valuePropName="checked"
      >
        <Input type="checkbox" />
      </Form.Item>
      <Form.Item
        name="upload"
        label="Upload Video"
        valuePropName="fileList"
        getValueFromEvent={(e) => {
          if (Array.isArray(e)) {
            return e;
          }
          return e && e.fileList;
        }}
      >
        <Upload
          accept="video/*"
          beforeUpload={(file) => {
            setFileList([file]); // Save the selected file to fileList state
            return false; // Prevent Ant Design Upload from automatically uploading
          }}
          fileList={fileList}
          onRemove={() => setFileList([])} // Clear fileList when the remove button is clicked in Upload
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>
      </Form>
  </Modal>
  </Layout>
  );
  };

  export default ManagerCourseInstructor;
