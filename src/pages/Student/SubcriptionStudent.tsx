import { DeleteOutlined, ExclamationCircleOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input, Layout, Modal, Table, message } from 'antd';
import { Subcription } from 'models/types';
import React, { useEffect, useState } from 'react';
import { getItemsbySubcriber } from 'services/Subcription/getItemsbySubcriberApiService';

const { Header, Content } = Layout;

const SubcriptionStudent: React.FC = () => {
  const [dataSource, setDataSource] = useState<Subcription[]>([]);
  const [filteredData, setFilteredData] = useState<Subcription[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pageNum = 1;
        const pageSize = 10;
        const response = await getItemsbySubcriber(pageNum, pageSize);

        if (response && response.data) {
          setDataSource(response.data);
          setFilteredData(response.data);
        }
      } catch (error) {
        message.error('Failed to fetch subscribers');
        console.error('Error fetching subscribers:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (value: string) => {
    const filtered = dataSource.filter((item) =>
      item.instructor_name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const getTotalSubcribers = (): number => {
    return filteredData.length;
  };

  const handleDeleteTab1 = (key: string) => {
    Modal.confirm({
      title: 'Bạn có muốn xóa người dùng này không?',
      icon: <ExclamationCircleOutlined />,
      content: 'Hành động này không thể hoàn tác',
      onOk() {
        const newDataSource = dataSource.filter(item => item._id !== key);
        setDataSource(newDataSource);
        setFilteredData(newDataSource);
        message.success('Người dùng đã được xóa thành công');
      },
      onCancel() {
        message.info('Đã hủy xóa người dùng');
      },
    });
  };

  const columns1 = [
    {
      title: 'STT',
      dataIndex: 'stt',
      width: 100,
      key: 'stt',
      render: (text: any, record: Subcription, index: number) => index + 1,
    },
    {
      title: 'Name User',
      dataIndex: 'subscriber_name',
      key: 'name',
    },
    {
      title: 'Detail Profile',
      key: 'detail',
      width: 200,
      render: (text: string) => (
        <div>
          <Button size="small" type="primary" className="text-xl text-white">
            <UserOutlined />
          </Button>
        </div>
      ),
    },
    {
      title: 'Delete Subscribers',
      key: 'delete',
      width: 200,
      render: (text: string, record: Subcription) => (
        <div>
          <Button
            size="small"
            type="primary"
            className="text-xl text-white"
            danger
            onClick={() => handleDeleteTab1(record._id)}
          >
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Layout style={{ height: 'fit-content', minHeight: '100vh' }}>
      <div className='px-5'>
        <div className='flex'>
          <div className='w-1/2'>
            <span className='text-lg font-semibold'>Total Subscribers: {getTotalSubcribers()}</span>
          </div>
          <div className='w-1/3'>
            <Input
              placeholder="Search..."
              prefix={<SearchOutlined />}
              style={{ width: '100%' }}
              className='mb-5'
              onChange={e => handleSearch(e.target.value)}
            />
          </div>
        </div>
        <Table
          className='custom-table'
          columns={columns1}
          dataSource={filteredData}
          rowKey="_id"
        />
      </div>
    </Layout>
  );
};

export default SubcriptionStudent;
