import { DeleteOutlined, ExclamationCircleOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input, Layout, Modal, Table, message } from 'antd';
import { useState } from 'react';

interface DataType {
  key: string;
  name: string;
}

const { Header, Content } = Layout;


const initialData: DataType[] = [
  { key: '1', name: 'Nguyễn Văn A' },
  { key: '2', name: 'Trần Thị B' },
  { key: '3', name: 'Lê Văn C' },
  { key: '4', name: 'Nguyễn Văn A' },
];

export default function SubcriptionStudent() {
    const [dataSource, setDataSource] = useState<DataType[]>(initialData);
  const [filteredData, setFilteredData] = useState<DataType[]>(initialData);
  
  const handleSearch = (value: string) => {
    const filtered = dataSource.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };
  const getTotalSubcribers = () => {
    return filteredData.length;
  };

  
  const handleDeleteTab1 = (key: string) => {
    Modal.confirm({
      title: 'Bạn có muốn xóa người dùng này không?',
      icon: <ExclamationCircleOutlined />,
      content: 'Hành động này không thể hoàn tác',
      onOk() {
        const newDataSource = dataSource.filter(item => item.key !== key);
        setDataSource(newDataSource);
        setFilteredData(newDataSource);
        message.success('Người dùng đã được xóa thành công');
      },
      onCancel() {
        message.info('Đã hủy xóa người dùng');
      },
    });
  };
  const columns1=[
    {
      title: 'STT',
      dataIndex: 'stt',
      width: 100,
      key: 'stt',
      render: (text: any, record: DataType, index: number) => index + 1,
    },
    {
      title: 'Name User',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Detail Profile',
      key: 'detail',
      width: 200,
      render: (text: string) => (
        <div className="">
          <Button size="small" type="primary" className="text-xl text-white">
            <UserOutlined />
          </Button>
        </div>
      ),
    },
    {
      title: 'Delete Subcribers',
      key: 'delete',
      width: 200,
      render: (text: string, record: DataType) => (
        <div className="">
          <Button
            size="small"
            type="primary"
            className="text-xl text-white"
            danger
            onClick={() => handleDeleteTab1(record.key)}
          >
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Layout style={{ height: 'fit-content', minHeight:'100vh'}}>
      <div className='px-5'>
      <div className='flex'>
        <div className='w-1/2'>
          <span className='text-lg font-semibold'>Total Subcribers: {getTotalSubcribers()}</span>
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
        rowKey="key"
      />
      </div>
    </Layout>
  )
}