import {
  DeleteOutlined,
  DownCircleOutlined,
  PlusOutlined,
  ReadOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Button, Divider, Input, Layout, List, Table, Tabs, message } from "antd";
import { Session } from 'models/types';
import { AlignType } from 'rc-table/lib/interface';
import React, { useEffect, useState } from 'react';
import { getSessions } from 'services/Instructor/sessionApiService';

const { Header, Content, Footer } = Layout;
const { TabPane } = Tabs;

const ManagerCourseInstructor: React.FC = () => {
  const [dataSource, setDataSource] = useState<Session[]>([]);
  const [filteredDataSource, setFilteredDataSource] = useState<Session[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await getSessions('', 1, 10, '');
      console.log("reponse", response)
        setSessions(response.data.pageData);
    } catch (error) {
      message.error('Failed to fetch sessions');
      console.error('Error fetching sessions:', error);
    }
  };

  const handleViewMore = (key: string) => {
    setExpandedKeys(prevKeys =>
      prevKeys.includes(key) ? prevKeys.filter(k => k !== key) : [...prevKeys, key]
    );
  };

  const handleSearch = (value: string) => {
    const filteredData = dataSource.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDataSource(filteredData);
  };

  const sortedSessions = [...sessions].sort((a, b) => a.position_order - b.position_order);

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
          </div>
        </Header>
        <Content className="m-4 overflow-y-scroll">
          <Table
            pagination={{ pageSize: 5 }}
            dataSource={sessions}
            columns={[
              // {
              //   title: 'Course',
              //   dataIndex: 'image',
              //   key: 'image',
              //   render: (text: string) => <img src={text} alt="item" className="w-12 h-12" />,
              // },
              {
                title: 'Session Name',
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
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
              },
              {
                title: 'Created At',
                dataIndex: 'created_at',
                key: 'created_at',
                align: 'center' as AlignType,
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
                render: (text: string, record: Session) => (
                  <div style={{ textAlign: 'center' }}>
                    <Button size="small" icon={<DownCircleOutlined />} onClick={() => handleViewMore(record._id)}></Button>
                  </div>
                ),
              },
            ]}
            expandable={{
              expandedRowKeys: expandedKeys,
              onExpand: (expanded, record) => handleViewMore(record._id),
              expandedRowRender: (record: Session) => (
                <div style={{ paddingBottom: "10px", backgroundColor: 'white', borderRadius: '4px' }}>
                  <Tabs centered>
                    <TabPane tab={<span style={{ fontSize: '16px' }}>List of course sessions:</span>} key="1" className='w-full'>
                      <List
                        className='px-2'
                        size="small"
                        dataSource={sortedSessions.filter(session => session.course_id === record._id)}
                        renderItem={(session, index) => (
                          <List.Item actions={[
                            <Button icon={<PlusOutlined />} className="mr-2 text-white bg-green-600"></Button>,
                            <Button icon={<DeleteOutlined />} className="mr-2 text-white bg-red-600"></Button>,
                          ]}>
                            <List.Item.Meta
                              avatar={<ReadOutlined />}
                              title={session.name}
                              description={session.description}
                            />
                            <div>Position Order: {session.position_order}</div>
                          </List.Item>
                        )}
                      />
                      <Divider className='p-0 m-0' />
                      <div className='flex justify-center w-full pr-5 my-5'>
                        <Button type="dashed" className='text-base text-blue-700'> <PlusOutlined /> Add New Session</Button>
                      </div>
                    </TabPane>
                  </Tabs>
                </div>
              ),
              expandIcon: () => <></>,
            }}
          />
        </Content>
        <Footer className="text-center bg-white">
          Academic_Resources ©2023 Created by My Team
        </Footer>
      </Layout>
    </Layout>
  );
};

export default ManagerCourseInstructor;
