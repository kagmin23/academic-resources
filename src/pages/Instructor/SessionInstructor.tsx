import {
    DeleteOutlined,
    DownCircleOutlined,
    EditOutlined,
    FileOutlined,
    LockOutlined,
    SearchOutlined
} from '@ant-design/icons';
import { Button, Form, Input, Layout, Menu, Modal, Table, Tabs, Typography } from 'antd';
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
  
  const lessons = [
    { key: 'lesson1', title: 'Getting Started', duration: '30 minutes', preview: true, videoUrl: 'https://www.example.com/video1.mp4' },
    { key: 'lesson2', title: 'Content Management', duration: '30 minutes', videoUrl: 'https://www.example.com/video2.mp4' },
    { key: 'lesson3', title: 'Course Download', duration: '30 minutes', videoUrl: 'https://www.example.com/video3.mp4' },
    { key: 'lesson4', title: 'Course Download 02', duration: '30 minutes', videoUrl: 'https://www.example.com/video4.mp4' },
    { key: 'lesson5', title: 'Contextualising Sustainability for a Changing World', duration: '10 minutes', videoUrl: 'https://www.example.com/video5.mp4' },
  ];
  
  const assignments = [
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
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<DataType | null>(null);
    const [form] = Form.useForm();
    const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
    const [videoModalVisible, setVideoModalVisible] = useState(false);
    const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);
  
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
        item.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredDataSource(filteredData);
    };
  
    const handleClick = (e: any) => {
      const lesson = lessons.find(lesson => lesson.key === e.key);
      if (lesson) {
        setSelectedVideoUrl(lesson.videoUrl);
        setVideoModalVisible(true);
      }
    };
  
    const columns = [
      {
        title: 'Course',
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
            <Button icon={<DownCircleOutlined />} onClick={() => handleViewMore(record.key)}></Button>
          </div>
        ),
      },
    ];
  
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Layout className="site-layout">
          <Header className="p-0 bg-white">
            <div className="flex flex-wrap items-center justify-center gap-4 p-4 bg-[#939fb1]">
              <Input
                placeholder="Search..."
                prefix={<SearchOutlined />}
                onChange={e => handleSearch(e.target.value)}
                style={{ width: 200 }}
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
                          onClick={handleClick}
                          className="h-full"
                        >
                          <SubMenu key="sub1" title="Lesson" icon={<FileOutlined />}>
                            {lessons.map(lesson => (
                          <Menu.Item key={lesson.key} icon={lesson.preview ? <FileOutlined /> : <LockOutlined />} className="flex items-center h-24">
                          <div className="w-full">
                            <div className="text-base">{lesson.title}</div>
                            <div className="text-sm text-gray-500">{lesson.duration}</div>
                          </div>
                        </Menu.Item>
                      ))}
                    </SubMenu>

                    <SubMenu key="sub2" title="Assignment" icon={<FileOutlined />}>
                      {assignments.map(assignment => (
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
                </Layout>
);

};

export default ManagerCourseInstructor;
