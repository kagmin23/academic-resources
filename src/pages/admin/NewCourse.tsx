import {
  ReconciliationOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { Button, Col, Input, Layout, Modal, Row, Table, Typography } from 'antd';
import { Course } from 'models/types';
import { AlignType } from 'rc-table/lib/interface';
import React, { useState } from 'react';
// import debounce from 'lodash/debounce';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

const NewCourseAdmin: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [dataSource, setDataSource] = useState<Course[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refusedKey, setRefusedKey] = useState<string | null>(null);

  const handleViewMore = (key: string) => {
    setExpandedKeys(prevKeys =>
      prevKeys.includes(key) ? prevKeys.filter(k => k !== key) : [...prevKeys, key]
    );
  };

  const showModal = (key: string) => {
    setRefusedKey(key);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    if (refusedKey) {
      setDataSource(prevDataSource =>
        prevDataSource.map(item =>
          item._id === refusedKey ? { ...item, refused: true } : item
        )
      );
    }
    setIsModalOpen(false);
    setRefusedKey(null);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setRefusedKey(null);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredDataSource = dataSource.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
    // item.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: 'Course',
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
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date: Date) => new Date(date).toLocaleDateString(), // Convert date to string
    },
    {
      title: 'Detail Course',
      key: 'detail',
      align: 'center' as AlignType,
      render: (text: string, record: Course) => (
        <div style={{ textAlign: 'center' }}>
          <Button icon={<ReconciliationOutlined />} onClick={() => handleViewMore(record._id)}></Button>
        </div>
      ),
    },
    {
      title: 'Course Approval',
      dataIndex: 'created_at',
      key: 'action',
      // render: (text: string, record: Course) => (
      //   record.refused ? (
      //     <div>
      //       <button className="px-4 py-2 font-bold text-white bg-gray-500 rounded" disabled>
      //         Refused approval
      //       </button>
      //     </div>
      //   ) : (
      //     <div>
      //       <Button className="px-4 py-2 mr-2 font-bold text-white bg-green-500 rounded hover:bg-green-700">
      //         <CheckOutlined />
      //       </Button>
      //       <Button onClick={() => showModal(record._id)} className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700">
      //         <CloseOutlined />
      //       </Button>
      //     </div>
      //   )
      // ),
    },
  ];
  

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout className="site-layout">
      <Header className="p-0 bg-white">
        <div className="flex flex-col items-start justify-between mb-4 space-y-4 md:flex-row md:items-center md:space-y-0 bg-[#939fb1] pl-4">
          <div className="w-full md:w-1/3">
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              onChange={handleSearchChange}
              className="items-center w-full h-8 text-sm border-2 border-gray-300 border-solid rounded"
              value={searchTerm}
            />
          </div>
          </div>
        </Header>
        <Content className="m-4">
          <div className="p-4 bg-white">
            <Table
              dataSource={filteredDataSource}
              columns={columns}
              expandable={{
                expandedRowKeys: expandedKeys,
                onExpand: (expanded, record) => handleViewMore(record._id),
                expandedRowRender: (record: Course) => (
                  <div style={{ padding: '10px 20px', backgroundColor: '#f9f9f9', borderRadius: '4px', marginLeft: '25px' }}>
                    <Row gutter={16}>
                      <Col span={24}>
                        <Title level={5} className='text-2xl'>Course Details</Title>
                        <div className='w-20 h-0.5 bg-blue-700 mb-7'></div>
                      </Col>
                    </Row>
                    <Row gutter={16} align="middle" style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Col span={13}>
                        <Text strong>Description:</Text>
                        <p>{record.description}</p>
                      </Col>
                      <Col span={1}></Col>
                      <Col span={10}>
                        <Text strong>Category:</Text>
                        <p>{record.category_id}</p>
                      </Col>
                    </Row>
                    <Row gutter={16} align="middle" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                      {/* <Col span={5}>
                        <Text strong>Instructor:</Text>
                        <p>{record.instructor}</p>
                      </Col> */}
                      <Col span={5}>
                        <Text strong>Number of Lessons:</Text>
                        <p>{record.lesson_count} lessons</p>
                      </Col>
                      <Col span={4}>
                        <Text strong>Price:</Text>
                        <p>{record.price},000,00VNĐ</p>
                      </Col>
                      
                      {/* <Col span={5}>
                        <Text strong>Create Date:</Text>
                        <p>{record.created_at}</p>
                      </Col> */}
                      <Col span={5}>
                        <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                          Preview Course
                        </button>
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
        <Footer style={{ textAlign: 'center' }}>Academic_Resources ©2024 Created by Group 4</Footer>
      </Layout>
      <Modal title="Unapprove Course" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

        <p>Are you sure you refuse to approve this course?</p>
      </Modal>
    </Layout>
  );
};

export default NewCourseAdmin;
